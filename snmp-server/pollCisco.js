import snmp from 'net-snmp';
import getCiscoEntityTable from './getCiscoEntityTable.js';

function getOidValue(session, oid) {
  return new Promise((resolve, reject) => {
    session.get([oid], (error, varbinds) => {
      if (error) {
        resolve("Error1");
      } else if (snmp.isVarbindError(varbinds[0])) {
        resolve("Error2")
      } else {
        if (Buffer.isBuffer(varbinds[0].value)){
          resolve(varbinds[0].value.toString("utf-8"))
        }
        resolve(varbinds[0].value);
      }
    });
  });
}

async function getIfStats(session, interfaceNumber, ciscoEntityTable){
  const paddedIndex = `${(interfaceNumber + 10100).toString()}`
  const ifOIDs = [
    { oid: `1.3.6.1.2.1.31.1.1.1.1.${paddedIndex}`, desc: "ifName" },
    { oid: `1.3.6.1.2.1.2.2.1.2.${paddedIndex}`, desc: "ifDescr" },
    { oid: `1.3.6.1.2.1.2.2.1.5.${paddedIndex}`, desc: "ifSpeed" },
    { oid: `1.3.6.1.2.1.2.2.1.7.${paddedIndex}`, desc: "ifAdminStatus" },
    { oid: `1.3.6.1.2.1.2.2.1.8.${paddedIndex}`, desc: "ifOperStatus" },
    { oid: `1.3.6.1.2.1.2.2.1.9.${paddedIndex}`, desc: "ifLastChange" },
    { oid: `1.3.6.1.2.1.31.1.1.1.18.${paddedIndex}`, desc: "ifAlias" },
    { oid: `1.3.6.1.4.1.9.9.68.1.2.2.1.2.${paddedIndex}`, desc: "vmVlan" },

  ];

  const initialResults = await Promise.all(
    ifOIDs.map(({ oid, desc }) => getOidValue(session, oid).then(value => ({
      desc,
      value,
    })))
  )

  const ifName = initialResults.find(item => item.desc === "ifName").value

  const entitySensorOIDs = ciscoEntityTable.filter(item => {
    return item.physicalName.includes(ifName) && item.desc !== "error";
  });

  const entitySensorResults = await Promise.all(
    entitySensorOIDs.map(({ oid, desc }) => getOidValue(session, oid).then(value => ({
      desc,
      value,
    })))
  )

  return [...initialResults, ...entitySensorResults]
}

export default async function pollCisco(address, community) {
  const singles = [
    { oid: "1.3.6.1.2.1.2.1.0", desc: "ifNumber" },
    { oid: "1.3.6.1.2.1.1.3.0", desc: "sysUpTime" },
    { oid: "1.3.6.1.2.1.1.5.0", desc: "sysName" },
  ];
  
  const session = snmp.createSession(address, community);
  
  const singleResults = await Promise.all(
    singles.map(({ oid, desc }) => getOidValue(session, oid).then(value => ({
      desc,
      value,
    })))
  );

  const ciscoEntityTable = await getCiscoEntityTable(session, 50);

  const numInterfaces = singleResults.find(obj => obj.desc === "ifNumber")?.value

  if (numInterfaces == undefined) {
    console.error("uhoh... numinterfaces undefined")
    return 
  }

  let allPortStats = []
  for (let i = 1; i <= numInterfaces; i++){
    const ifStats = await getIfStats(session, i, ciscoEntityTable);
    ifStats.push({ desc: "port_number", value: i})
    const output = Object.fromEntries(ifStats.map(({ desc, value }) => [desc, value]));
    allPortStats.push(output)
  }

  session.close();

  const ciscoPollResult = {
    address,
    singles: singleResults,
    ifTable: allPortStats,
  };

  return ciscoPollResult;
}
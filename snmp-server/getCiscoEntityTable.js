import snmp from 'net-snmp'

function parseDesc(physicalName) {
  if (physicalName.includes("Transmit")) return "txPower";
  if (physicalName.includes("Receive")) return "rxPower";
  if (physicalName.includes("Voltage")) return "sfpVoltage";
  if (physicalName.includes("Current")) return "sfpBiasCurrent";
  if (physicalName.includes("Temperature")) return "sfpTemp";
  return "error";
}

export default async function getCiscoEntityTable(session, maxRepetitions){
  const result = [];
  var oid = "1.3.6.1.2.1.47.1.1.1.1.7";
  
  return new Promise((resolve, reject) => {
    function doneCb(error) {
      if (error) {
        reject(error.toString());
      } else {
        resolve(result)
      }
    }

    function feedCb(varbinds) {
      for (var i = 0; i < varbinds.length; i++) {
        if (snmp.isVarbindError(varbinds[i])) {
          console.error(snmp.varbindError(varbinds[i]));
        } else {
          const physicalName = varbinds[i].value.toString();
          result.push({
            physicalName: physicalName,
            oid: varbinds[i].oid,
            desc: parseDesc(physicalName)
          })
        }
      }
    }

    session.subtree(oid, maxRepetitions, feedCb, doneCb);
  })
}

// const session = snmp.createSession("10.49.69.206", "public");
// const out = await getCiscoEntityTable(session, 50)

// console.log(out)
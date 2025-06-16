import snmp from 'net-snmp';
import { execSync } from 'child_process'
import chalk from 'chalk';

const options = {
  port: 7778,
  disableAuthorization: false,
  includeAuthentication: false,
  accessControlModelType: snmp.AccessControlModelType.None,
  address: null,
  transport: "udp4",
  communities: ["public"]
};

const callback = function (error, notification) {
  if ( error ) {
      console.error (error);
  } else {
      const translation = translateTrap(notification);
      console.log (JSON.stringify(translation, null, 2));
  }
};

const receiver = snmp.createReceiver (options, callback);

const authorizer = receiver.getAuthorizer();

authorizer.addCommunity("public")



function snmpTranslate(oid) {
  try {
    const output = execSync(`snmptranslate -M +/Users/nathan/mib -m ALL ${oid} 2>/dev/null`, { encoding: 'utf8' }).trim();
    return output || oid;
  } catch (error) {
    console.log(error);
  }
}

function translateTrap(trap) {
  return {
    ...trap,
    pdu: {
      ...trap.pdu,
      varbinds: trap.pdu.varbinds.map(vb => ({
        ...vb,
        translatedOid: snmpTranslate(vb.oid),
        translatedValue: translateAscii(vb.value)
      }))
    }
  };
}

function translateAscii(data){
  try {
    const buffer = Buffer.from(data);
    const text = buffer.toString();
    console.log(chalk.greenBright(text))
    return text
  } catch (err) {
    // console.error(err)
    return "No translation"
  }
}

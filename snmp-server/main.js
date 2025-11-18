import snmp from 'net-snmp';
import chalk from 'chalk';
import pollCisco from './pollCisco.js';
import writeToDB, { setSwitchDown, setSwitchUp } from './writeToDB.js';
import dotenv from 'dotenv';
import PocketBase from "pocketbase";

dotenv.config()

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

const options = {
  port: 7779,
  disableAuthorization: true,
  includeAuthentication: false,
  accessControlModelType: snmp.AccessControlModelType.None,
  address: "0.0.0.0",
  transport: "udp4",
  communities: ["public"]
};

const callback = function (error, notification) {
  if (error) {
    console.error(error);
  } else {
    let deviceAddress = notification.rinfo.address
    if (isCiscoLinkTrap(notification)) {
      console.log(chalk.yellowBright(`${deviceAddress} - Link State Changed!`))
      pollDeviceAndWriteToDB(notification.rinfo.address)

    } else if (isCiscoConfigWriteTrap(notification)){
      console.log(chalk.greenBright(`${deviceAddress} - Config Written`))
      pollDeviceAndWriteToDB(notification.rinfo.address)

    } else {
      console.log(`${deviceAddress} - Received something else`)
    }
    setSwitchUp(notification.rinfo.address)
  }
};

const receiver = snmp.createReceiver(options, callback);

const authorizer = receiver.getAuthorizer();

authorizer.addCommunity("public")

console.log("Listening for traps... ")

function isCiscoLinkTrap(notification){
  if (notification.pdu.type !== 167) return false;
  for (let varbind of notification.pdu.varbinds){
    if ( varbind.oid === "1.3.6.1.6.3.1.1.4.1.0" && 
      ( varbind.value === "1.3.6.1.6.3.1.1.5.3" || 
        varbind.value === "1.3.6.1.6.3.1.1.5.4"
      )){
        return true;
      }
  }
}

function isCiscoConfigWriteTrap(notification){
  if (notification.pdu.type !== 167) return false;
  for (let varbind of notification.pdu.varbinds){
    if ( varbind.oid === "1.3.6.1.6.3.1.1.4.1.0" && 
      ( varbind.value === "1.3.6.1.4.1.9.9.43.2.0.1")){
        return true;
      }
  }
}

async function pollDeviceAndWriteToDB(deviceAddress){
  console.log(`Polling ${deviceAddress}... `)
  const ciscoPollResult = await pollCisco(deviceAddress, "public")
  writeToDB(ciscoPollResult)
}

async function checkForDownSwitches(){
  console.log('Polling all switches...')
  const pb = new PocketBase(process.env.PB_URL);
  const all_switches = await pb.collection('external_switches').getList();
  for (let item of all_switches.items){
    try {
      pollDeviceAndWriteToDB(item.ip_address)
    } catch {
      setSwitchDown(item.ip_address)
    }
  }
}

setInterval(checkForDownSwitches, process.env.POLL_INTERVAL ?? 60000)


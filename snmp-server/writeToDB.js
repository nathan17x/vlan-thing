import chalk from "chalk";
import PocketBase from "pocketbase";

export default async function writeToDB(ciscoPollResult){
  console.log(`Successful SNMP poll from ${ciscoPollResult.address}. Writing result to pocketbase at ${process.env.PB_URL}`)
  const pb = new PocketBase(process.env.PB_URL);
  
  const searchResult = await pb.collection('external_switches')
    .getFirstListItem(`ip_address="${ciscoPollResult.address}"`).catch(()=>{return null})

  if (searchResult){
    try {
      const edge_port_update = ciscoPollResult
        .ifTable
        .filter(item =>
          searchResult.edge_port_assignment.includes(item.port_number)
        )
  
      const uplink_port_update = ciscoPollResult
        .ifTable
        .filter(item =>
          searchResult.uplink_port_assignment.includes(item.port_number)
        )
  
      pb.collection('external_switches').update(searchResult.id, {
        edge_ports: edge_port_update,
        uplink_ports: uplink_port_update,
        switch_up: true,
      })
    } catch (error) {
      console.error(error)
      setSwitchDown(searchResult.ip_address)
    }

  } else {
    pb.collection('external_switches').create({
      name: `unknown_switch@${ciscoPollResult.address}`,
      ip_address: `${ciscoPollResult.address}`,
      edge_ports: ciscoPollResult.ifTable,
      switch_up: true,
    })
  }
}

export async function setSwitchDown(switch_address){
  try {   
    const pb = new PocketBase(process.env.PB_URL);
    const searchResult = await pb.collection('external_switches')
      .getFirstListItem(`ip_address="${switch_address}"`).catch()
    pb.collection('external_switches').update(searchResult.id, {
        switch_up: false,
      })
    console.log(`Set switch ${switch_address} down`)
  } catch (err) {
    console.log(chalk.red(`error while changing switch ${switch_address} status to down`))
    console.error(err)
  }
}

export async function setSwitchUp(switch_address){
  try {   
    const pb = new PocketBase(process.env.PB_URL);
    const searchResult = await pb.collection('external_switches')
      .getFirstListItem(`ip_address="${switch_address}"`).catch()
    pb.collection('external_switches').update(searchResult.id, {
        switch_up: true,
      })
  } catch (err) {
    console.log(chalk.red(`error while changing switch ${switch_address} status to up`))
    console.error(err)
  }
}
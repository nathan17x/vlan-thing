import chalk from "chalk";
import PocketBase from "pocketbase";

export default async function writeToDB(ciscoPollResult){
  console.log(`Writing to pocketbase at ${process.env.PB_URL}`)
  const pb = new PocketBase(process.env.PB_URL);
  
  try {
    const searchResult = await pb.collection('external_switches')
      .getFirstListItem(`ip_address="${ciscoPollResult.address}"`)

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

  } catch (err) {
    console.log(chalk.red("Ayo wtf"))
    console.error(err)
  }
}

export async function setSwitchDown(switch_address){
  try {   
    const pb = new PocketBase(process.env.PB_URL);
    const searchResult = await pb.collection('external_switches')
      .getFirstListItem(`ip_address="${switch_address}"`)
    pb.collection('external_switches').update(searchResult.id, {
        switch_up: false,
      })
  } catch (err) {
    console.log(chalk.red("Ayo wtffff"))
    console.error(err)
  }
}

export async function setSwitchUp(switch_address){
  try {   
    const pb = new PocketBase(process.env.PB_URL);
    const searchResult = await pb.collection('external_switches')
      .getFirstListItem(`ip_address="${switch_address}"`)
    pb.collection('external_switches').update(searchResult.id, {
        switch_up: true,
      })
  } catch (err) {
    console.log(chalk.red("Ayo wtffff"))
    console.error(err)
  }
}
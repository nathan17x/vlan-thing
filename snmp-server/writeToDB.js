import chalk from "chalk";
import PocketBase from "pocketbase";

export default async function writeToDB(ciscoPollResult, address){
  console.log(`Writing to pocketbase at ${address}`)
  const pb = new PocketBase(address);
  
  try {
    const searchResult = await pb.collection('external_switches')
      .getFirstListItem(`ip_address="${ciscoPollResult.address}"`)

    const edge_port_update = ciscoPollResult.ifTable.filter(item => searchResult.edge_port_assignment.includes(item.port_number))

    pb.collection('external_switches').update(searchResult.id, {
      edge_ports: edge_port_update
    })
  } catch (err) {
    console.log(chalk.red("Ayo wtf"))
    console.error(err)
  }
}


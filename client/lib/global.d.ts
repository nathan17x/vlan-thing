import { RecordModel } from "pocketbase"

export interface ExternalSwitch extends RecordModel {
  name: string;
  description: string;
  ip_address: string;
  edge_port_assignment: number[];
  uplink_port_assignment: number[];
  edge_ports: SwitchPort[];
  uplink_ports: SwitchPort[];
}

export interface SwitchPort {
  ifName: string,
  ifDescr: string,
  ifSpeed: number,
  ifAdminStatus: number,
  ifOperStatus: number,
  ifLastChange: number,
  ifAlias: string,
  vmVlan: number,
  port_number: number
  transceiver_temperature: number | null;
  transceiver_voltage: number | null;
  transceiver_tx_power: number | null;
  transceiver_rx_power: number | null;
}

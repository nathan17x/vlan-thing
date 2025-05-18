import { RecordModel } from "pocketbase"

export interface ExternalSwitch extends RecordModel {
  name: string;
  description: string;
  ip_address: string;
  edge_port_assignment: number[];
  uplink_port_assignment: number[];
  edge_ports: SwitchPort[];
  uplink_ports: SwitchPort[];
  switch_up: boolean;
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
  sfpTemp: number | null;
  sfpVoltage: number | null;
  sfpBiasCurrent: number | null;
  txPower: number | null;
  rxPower: number | null;
}

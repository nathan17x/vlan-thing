# vlan-thing-v3
Realtime VLAN assignment and port status webpage for Cisco switches using SNMP link status traps, PocketBase realtime API and Next JS.

## Requirements
- Docker
- Node JS (if Windows/Mac)

## Quickstart
1. Make a new folder where you want this to run
2. Open in terminal
3. clone the repo
`git clone github.com/nathan17x/vlan-thing`

4. Open compose.template.yml and edit to match your setup
5. save as compose.yml
6. Compose up
`docker compose up --build -d`

## Notes
- The SNMP server will only work correctly in Docker for Linux.
- If you need to use Docker for Windows, you will have to run the SNMP server in Node outside the container
`node ./snmp-server/main.js`

- You would need to start that every time or schedule a Node process. Usually better to install this on linux but that has pitfalls too. 

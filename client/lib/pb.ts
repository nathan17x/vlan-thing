import PocketBase from "pocketbase";
export const pb = new PocketBase(process.env.PB_URL);
pb.autoCancellation(false)


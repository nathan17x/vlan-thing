import PocketBase from "pocketbase";
export const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
pb.autoCancellation(false)


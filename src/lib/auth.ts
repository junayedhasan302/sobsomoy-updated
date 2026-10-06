import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// 500 error
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);


const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("all-time-updated");

export const auth = betterAuth({
    emailAndPassword:{
        enabled: true,
    },
  database: mongodbAdapter(db, {
    client,
  }),
});
"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiToken = process.env.STREAM_TOKEN;

export const tokenProvider = async () => {
    const user = await currentUser();

    if(!user) throw new Error("User is not logged in");
    if(!apiKey) throw new Error("No API key");
    if(!apiToken) throw new Error("No token");

    const client = new StreamClient(apiKey, apiToken);
    const validity = 24 * 60 * 60;
    const token = client.generateUserToken({ user_id: user.id, validity_in_seconds: validity });

    return token;
}
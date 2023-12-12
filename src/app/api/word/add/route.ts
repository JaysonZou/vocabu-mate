import { fetchRedis } from "@/helpers/redis";
// import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
// import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const word = body.word;

    // const session = await getServerSession(authOptions);

    // if (!session) {
    //   return new Response("Unauthorized", { status: 401 });
    // }

    // check if user is already added
    // const isAlreadyAdded = (await fetchRedis(
    //   "sismember",
    //   `user:${idToAdd}:incoming_friend_requests`,
    //   session.user.id
    // )) as 0 | 1;

    // if (isAlreadyAdded) {
    //   return new Response("Already added this user", { status: 400 });
    // }

    await db.hset(`word${word}`, body);

    return new Response("OK");
  } catch (error) {
    console.log(error, "error");
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("Invalid request", { status: 400 });
  }
}

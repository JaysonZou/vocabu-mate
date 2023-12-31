import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const word = body.word;
    const flag = body.flag;

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    // check if word exist
    const isExistWord = await fetchRedis("hget", "word", word);

    if (isExistWord) {
      await db.hset(`word`, {
        [word]: {
          ...JSON.parse(isExistWord),
          flag,
        },
      });
    }

    return new Response("OK");
  } catch (error) {
    console.log(error, "error");
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("Invalid request", { status: 400 });
  }
}

import { fetchRedis } from "@/helpers/redis";
// import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
// import { getServerSession } from "next-auth";
import { z } from "zod";
import { md5 } from "js-md5";

const appid = process.env.BAIDU_APPID as string;
const appsecrect = process.env.BAIDU_SECRET as string;

const genSalt = (q: string) => {
  const salt = "1234567";
  //appid+q+salt+密钥的MD5值
  return {
    sign: md5(`${appid}+${encodeURIComponent(q)}+${salt}+${appsecrect}`),
    salt,
  };
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { q } = body;

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

    const { salt, sign } = genSalt(q);

    const formData = new URLSearchParams();
    const payload = {
      ...body,
      appid,
      salt,
      sign,
    };
    for (let key in payload) {
      formData.append(key, payload[key]);
    }
    console.log(formData, "=======> body");

    const qRes = await fetch(
      "https://fanyi-api.baidu.com/api/trans/vip/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );

    return qRes;
  } catch (error) {
    console.log(error, "error");
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("Invalid request", { status: 400 });
  }
}

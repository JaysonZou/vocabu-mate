import { notFound, redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { fetchRedis } from "@/helpers/redis";
import { MilkEditor } from "../../../../component/Editor";

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await fetchRedis("get", `post:${postId}:authorId:${userId}`);
}

interface EditorPageProps {
  params: { postId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  // const post = await getPostForUser(params.postId, user.id);

  // if (!post) {
  //   notFound();
  // }

  return (
    <div className="">
      <MilkEditor />
    </div>
  );
}

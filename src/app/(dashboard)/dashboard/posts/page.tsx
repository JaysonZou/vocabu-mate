import { DashboardHeader } from "@/component/DashboardHeader";
import { EmptyPlaceholder } from "@/component/EmptyPlaceholder";
import { PostCreateButton } from "@/component/PostCreateBtn";
import { DashboardShell } from "@/component/Shell";
import PostArea from "@/component/PostArea";
import { getCurrentUser } from "@/lib/session";
import { fetchRedis } from "@/helpers/redis";

export default async function Posts() {
  // const posts: any = fetchRedis("get", `post:${12}`);
  const user = await getCurrentUser();

  const posts = await fetchRedis("smembers", `posts:${user!.id}`);
  const postsData = posts.map((p: any) => ({
    id: p.split("&&")[0],
    title: p.split("&&")[1],
  }));
  return (
    <div>
      <DashboardShell>
        <DashboardHeader heading="Posts" text="Create and manage posts." />
        <div className="grid gap-8">
          {posts?.length ? (
            <PostArea data={postsData} />
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any posts yet. Start creating content.
              </EmptyPlaceholder.Description>
              <PostCreateButton variant="outline" />
            </EmptyPlaceholder>
          )}
        </div>
      </DashboardShell>
    </div>
  );
}

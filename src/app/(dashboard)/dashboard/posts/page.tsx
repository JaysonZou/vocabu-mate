import { DashboardHeader } from "@/component/DashboardHeader";
import { EmptyPlaceholder } from "@/component/EmptyPlaceholder";
import { PostCreateButton } from "@/component/PostCreateBtn";
import { DashboardShell } from "@/component/Shell";
import PostArea from "@/component/PostArea";

export default function Posts() {
  // const posts: any = fetchRedis("get", `post:${12}`);

  const posts = [
    {
      title: "nihao",
      id: "asdf",
      authorId: "asdfasfd",
      content: "asdfasdf",
      published: false,
    },
  ];
  return (
    <div>
      <DashboardShell>
        <DashboardHeader heading="Posts" text="Create and manage posts." />
        <div className="grid gap-8">
          {posts?.length ? (
            <PostArea data={posts} />
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

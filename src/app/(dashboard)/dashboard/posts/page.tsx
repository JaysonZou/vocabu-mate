import { EmptyPlaceholder } from "@/component/EmptyPlaceholder";
import { PostCreateButton } from "@/component/PostCreateBtn";

export default function Posts() {
  // const posts: any = fetchRedis("get", `post:${12}`);

  const posts = [];
  return (
    <div>
      {posts?.length ? (
        <div className="divide-y divide-border rounded-md border">
          {posts.map((post) => (
            // <PostItem key={post.id} post={post} />
            <div>'asdfasdf'</div>
          ))}
        </div>
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
  );
}

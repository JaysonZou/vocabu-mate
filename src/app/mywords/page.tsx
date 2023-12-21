import { WordData } from "@/component/DisplayedWord";
import { fetchRedis } from "@/helpers/redis";
import { List } from "../../component/List";
import Translate from "@/component/Translate";

export default async function WordList() {
  const redisWords = await fetchRedis("hgetall", "word");
  const words: WordData[] = redisWords
    .filter((w: any) => w.startsWith("{"))
    .map((w: any) => JSON.parse(w));
  return (
    <main className="flex justify-around h-screen pt-20">
      <Translate />
      {words && <List listData={words} />}
    </main>
  );
}

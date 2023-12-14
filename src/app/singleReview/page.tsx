import { fetchRedis } from "@/helpers/redis";
import { WordData, DisaplayWord } from "@/component/DisplayedWord";

export default async function pageMemo() {
  const redisWords = await fetchRedis("hgetall", "word");
  const words: WordData[] = redisWords
    .filter((w: any) => w.startsWith("{"))
    .map((w: any) => JSON.parse(w));
  return (
    <div className="h-full carousel carousel-vertical rounded-boxx">
      {words ? (
        words.map((word, index) => (
          <div
            key={word.word}
            id={word.word + index}
            className="carousel-item h-full"
          >
            <DisaplayWord wordData={word} />
          </div>
        ))
      ) : (
        <div>EMPTY</div>
      )}
    </div>
  );
}

import { DisaplayWord, WordData } from "./DisplayWord/page";
import { fetchRedis } from "@/helpers/redis";

export default async function Home() {
  // const words = await fetchRedis("hget", "word");
  const words: WordData[] = require("../../public/fake.json");

  return (
    <main className="h-screen flex justify-center bg-white">
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
    </main>
  );
}

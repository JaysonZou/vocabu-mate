import { DisaplayWord } from "./DisplayWord/page";

export default function Home() {
  const data = {
    word: "Hello",
    sentence: "Say hello to you",
    comment: "你好",
  };
  const words = [
    {
      word: "Hello",
      sentence: "Say hello to you",
      comment: "你好",
    },
    {
      word: "Bees",
      sentence: "Say Bees to you",
      comment: "蜜蜂",
    },
    {
      word: "transaction",
      sentence: "Say Bees to you",
      comment: "事物",
    },
  ];
  return (
    <main className="h-screen flex justify-center bg-white">
      {/* <div className="h-full carousel carousel-vertical rounded-boxx">
        {words.map((word, index) => (
          <div
            key={word.word}
            id={word.word + index}
            className="carousel-item h-full"
          >
            <DisaplayWord wordData={word} />
          </div>
        ))}
      </div> */}
    </main>
  );
}

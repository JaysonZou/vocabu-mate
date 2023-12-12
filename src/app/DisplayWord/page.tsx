export interface WordData {
  word: string;
  sentence: string;
  comment: string;
}

interface DisaplayWordProps {
  wordData: WordData;
}
export const DisaplayWord: React.FC<DisaplayWordProps> = ({ wordData }) => {
  const { word, sentence, comment } = wordData;
  return (
    <div className="flex flex-col align-middle justify-center">
      <h1 className="text-8xl font-serif mb-8">{word}</h1>
      <div className="text-sm opacity-50 mb-5">{comment}</div>
      <div className="font-serif text-lg opacity-50">{sentence}</div>
    </div>
  );
};

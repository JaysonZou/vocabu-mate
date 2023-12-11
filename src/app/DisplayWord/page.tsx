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
      <h1 className="text-8xl font-serif">{word}</h1>
      <div>{sentence}</div>
      <div>{comment}</div>
    </div>
  );
};

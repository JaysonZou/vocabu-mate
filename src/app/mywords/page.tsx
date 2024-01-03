import { WordData } from "@/component/DisplayedWord";
import { fetchRedis } from "@/helpers/redis";
import { ChooseFlag, List } from "../../component/List";
import toast from "react-hot-toast";

export default async function WordList() {
  const getList = async () => {
    try {
      const res = await fetchRedis("hgetall", "word");
      const filteredRes = res
        .filter((w: any) => w.startsWith("{"))
        .map((w: any) => JSON.parse(w));

      return filteredRes as WordData[];
    } catch (e) {
      toast.error("something went worng");
    }
  };

  const listData = await getList();

  return (
    <main className="flex justify-around pt-20">
      {listData?.length ? <List listData={listData} /> : <Empty />}
    </main>
  );
}

function Empty() {
  return (
    <div className="border text-lg font-bold pt-20">There is no word yet</div>
  );
}

import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/component/DashboardHeader";
import { PostCreateButton } from "@/component/PostCreateBtn";
import { DashboardShell } from "@/component/Shell";
import { fetchRedis } from "@/helpers/redis";
import { List } from "@/component/List";
import { WordData } from "@/component/DisplayedWord";
import toast from "react-hot-toast";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

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
    <DashboardShell>
      <DashboardHeader
        heading="Words"
        text="Create and manage words."
      ></DashboardHeader>
      {listData?.length ? <List listData={listData} /> : <></>}
    </DashboardShell>
  );
}

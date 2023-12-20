import Login from "@/component/Login";

export default async function Home() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex flex-grow w-full pb-8 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 flex">
          <div className="flex flex-col justify-center items-center space-y-4 text-center">
            <div className="space-y-2 mb-16">
              <h1 className="font-extrabold tracking-tight text-7xl mb-8">
                An Easier Way to <br />{" "}
                <span className="xixi">Manage Your Words</span>
                <br />
                effectively
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                We provide efficient and effective word management for language
                learners and enthusiasts.
              </p>
            </div>
          </div>
          <div className="divider divider-horizontal"></div>
          <Login />
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 justify-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-serif">
          Copyright © 2014-2023 Jayson Zou
        </p>
      </footer>
    </div>
  );
}

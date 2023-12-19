import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex flex-grow w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2 mb-16">
              <h1 className="font-extrabold tracking-tight text-7xl mb-8">
                Manage Your Words
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                We provide efficient and effective word management for language
                learners and enthusiasts.
              </p>
            </div>
            <div className="w-full max-w-md">
              <input
                className="input w-full"
                placeholder="Search for a word..."
                type="text"
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © Word Management Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

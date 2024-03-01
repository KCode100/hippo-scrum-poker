'use client'

import ShareRoomDialog from "@/components/ui/share-room-dialog";

export default function Home({ params }: { params: { id: string } }) {
  return (
    <>
      <header>
        <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <img src="/hippo-logo.png" className="mr-3 h-16 sm:h-20" alt="Hippo Logo" />
            </a>
            <div className="flex items-center">
              <ShareRoomDialog />
            </div>
          </div>
        </nav>
      </header>
      <main>
      </main>
    </>
  );
}

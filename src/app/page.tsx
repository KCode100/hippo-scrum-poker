import { CardsSection } from "@/components/ui/cards-section";
import CreateRoomDialog from "@/components/ui/create-room-dialog";
import { TextRevealCardSection } from "@/components/ui/text-reveal-card-section";

export default function Home() {
  return (
    <>
      <header>
        <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <img src="/hippo-logo-grey.svg" className="mr-3 h-16 sm:h-20" alt="Hippo Logo" />
            </a>
            <div className="flex items-center">
              <a href="https://github.com/KCode100/hippo-scrum-poker" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                <img src="/github-white.svg" className="h-8" alt="Github Logo" />
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section>
          <div className="grid max-w-screen-xl px-4 py-14 mx-auto lg:gap-8 xl:gap-0 lg:py-20 lg:pb-26 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-hippo-brand-navy">Hippo scrum poker</h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Easy-to-use story point estimations.</p>
              <CreateRoomDialog />
            </div>
            <img src="/team-art.svg" alt="Illustration of team" className="hidden lg:mt-0 lg:col-span-5 lg:flex" />
          </div>
        </section>
        <section>
          <CardsSection />
        </section>
        <section className="bg-hippo-brand-navy">
          <TextRevealCardSection />
        </section>
      </main>
    </>
  );
}

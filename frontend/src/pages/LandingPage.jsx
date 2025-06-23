import Navbar from "../components/Navbar";
import gradientBackground from "../assets/gradientBackground.svg";
import PublicationListItem from "../components/PublicationListItem";
import NewsListItem from "../components/NewsListItem";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";

function LandingPage() {
  return (
    <>
      <div class="border-4 border-blue-400  xl:flex xl:flex-col xl:justify-between xl:items-center">
        {/* img container */}
        <div class="w-screen h-50 flex">
          {/* intro container */}

          <img
            src="/HeroImage.png"
            alt="Hero"
            class="xl:w-full h-full object-cover block"
          ></img>
          <div class="absolute xl:left-6 mx-1.5 xl:top-27.5 top-16 max-w-37 min-w-20.45 z-10 flex flex-col justify-center items-start px-1.5 py-3 xl:p-5  bg-background-white gap-1.5  ">
            <p class="body">Hi, welcome to Inclusive Reality Lab 👋</p>
            <p class="heading3">
              We envision a future where technology seamlessly bridges social
              and ability gaps, fostering an inclusive and prosocial world.
            </p>
          </div>
        </div>

        <div class="w-screen h-auto bg-[url(/gradientImage.png)] bg-cover bg-no-repeat border-2">
          {/* for the gradient background */}

          <div class="flex flex-col justify-between items-center xl:my-8 xl:py-0 py-8 px-1.5 gap-1.5 xl:max-w-64.5 mx-auto border-2 ">
            <p class="heading3">Our work centers on three key themes</p>

            <div class="flex flex-col xl:flex-row items-center justify-between gap-1.5 ">
              <div class="flex flex-col justify-center items-center gap-1 ">
                <p class="heading2">Understand</p>
                <p class="body text-center">
                  Exploring ways to sense and interpret cognitive, behavioral,
                  and emotions states.
                </p>
              </div>

              <div class="flex  flex-col justify-center items-center gap-1">
                <p class="heading2">Assist</p>
                <p class="body text-center">
                  Designing technologies that support individuals and foster
                  better collaboration.
                </p>
              </div>

              <div class="flex flex-col justify-center items-center gap-1">
                <p class="heading2">Augment</p>
                <p class="body text-center">
                  Exploring ways to sense and interpret cognitive, behavioral,
                  and emotions states.
                </p>
              </div>
            </div>
          </div>

          <section class="ml-8 border-2 bg-baseBlack ">
            <div className="flex flex-col justify-start xl:py-5 py-5  xl:ml-8 gap-1.5 xl:max-w-64.5 mx-auto border-2 border-white border-dashed  ">
               <h1 class="heading1 text-baseWhite ">Our latest works</h1>
            <div class="flex flex-row justify-start  gap-1.5 overflow-x-scroll">
              {/* until backend is ready! */}
              <ProjectCard className="xl:w-30 flex-shrink-0"/>
              <ProjectCard className="xl:w-30 flex-shrink-0"/>
              <ProjectCard className="xl:w-30 flex-shrink-0"/>
            </div>
            <div class="flex flex-row justify-between xl:items-center items-end gap-1.5">
              <div class="hidden xl:flex flex-row justify-start xl:items-center items-end gap-1.5">
                <p class="label text-baseWhite">move left</p>
                <p class="label text-baseWhite">move right</p>
              </div>

              <p class="label text-baseWhite xl:self-end">view all projects</p>
            </div>
            </div>
           
          </section>

          <p class="heading3 xl:max-w-64.5 my-8 px-1.5 mx-auto border-2">
            Our research explores how reality itself - both physical and digital
            - can be leveraged to understand cognitive, behavioral, and
            emotional states, assist individuals in their daily lives, and
            augment human abilities. <br />
            By designing adaptive and empowering technologies, we aim to create
            a world where diverse individuals can thrive, connect, and reach
            their full potential.
          </p>

          <section class="flex flex-col bg-background-white xl:justify-items-start items-start w-screen ">
            <div class="flex flex-col justify-between items-start xl:items-center py-5 gap-4 xl:w-64.5 mx-auto border-2 bg-basewhite">
              <h1 class="heading1 self-start ">Recent Publications </h1>

              <div class="flex xl:flex-col flex-row flex-wrap  xl:justify-between  items-start xl:items-center xl:gap-2 gap-x-1.5 gap-y-2.5 ">
                {/* will use a mapping function to return the latest publications once backend is ready! */}
                <PublicationListItem />
                <PublicationListItem />
                <PublicationListItem />
                <PublicationListItem />
                <PublicationListItem />
              </div>
              {/* this needs to changed to a Link component */}
              <p className="labelBold">view all publications</p>
            </div>
          </section>

          <section className="flex flex-col mx-auto py-5 px-1.5 xl:max-w-64.5 gap-4">
            <h1 className="heading1">News</h1>
            {/* news list items container */}
            <div className="flex flex-col h-12.5 gap-1.5 overflow-y-scroll border-3 ">
              {/* news list item */}
              {/* will use a mapping function to return the latest news once backend is ready! */}

              <NewsListItem />
              <NewsListItem />
              <NewsListItem />
              <NewsListItem />
              <NewsListItem />
              <NewsListItem />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default LandingPage;

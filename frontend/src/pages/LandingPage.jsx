import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <>
      <div class="border-4 border-blue-400 flex flex-col">
        {/* img container */}
        <div class="w-full h-44 flex">
          {/* intro container */}

          <img src="/HeroImage.png" alt="Hero" class="xl:w-full"></img>
        </div>

        <div class="absolute xl:left-6 mx-1.5 xl:top-20 top-16 max-w-37 min-w-20.45  z-10 flex flex-col justify-center items-start px-1.5 py-3 xl:p-5  bg-background-white border-2 border-black ">
          <p class="body">Hi, welcome to Inclusive Reality Lab 👋</p>
          <p class="heading3">
            We envision a future where technology seamlessly bridges social and
            ability gaps, fostering an inclusive and prosocial world.
          </p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;

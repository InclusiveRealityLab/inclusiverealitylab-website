import Navbar from "../components/Navbar";
import gradientBackground from "../assets/gradientBackground.svg";

function LandingPage() {
  return (
    <>
      <div class="border-4 border-blue-400 xl:flex xl:flex-col xl:max-w-64.5 xl:justify-center xl:items-center">
        {/* img container */}
        <div class="w-screen h-44 flex">
          {/* intro container */} 

          <img src="/HeroImage.png" alt="Hero" class="xl:w-full h-full object-cover block"></img>
        </div>

        <div class="absolute xl:left-6 mx-1.5 xl:top-20 top-16 max-w-37 min-w-20.45 z-10 flex flex-col justify-center items-start px-1.5 py-3 xl:p-5  bg-background-white border-2 border-black ">
          <p class="body">Hi, welcome to Inclusive Reality Lab 👋</p>
          <p class="heading3">
            We envision a future where technology seamlessly bridges social and
            ability gaps, fostering an inclusive and prosocial world.
          </p>
        </div>
        

         <div class="w-screen h-44 flex">
          {/* intro container */} 

          <img src="gradientImage.png" alt="background" class="xl:w-full h-full object-cover block"></img>
        </div>

         <div class="w-screen h-45 bg-[url(/HeroImage.png)]">

          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ducimus eos ut perspiciatis, culpa et iure nisi numquam dolor consequatur esse fugit, rem fugiat dicta accusantium ipsam. Magnam, totam id.</p>
        </div>

       
      </div>
    </>
  );
}

export default LandingPage;

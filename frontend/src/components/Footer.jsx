import SocialMediaHandleContainer from "./SocialMediaHandleContainer";

function Footer() {
  return (
    <div className="flex w-screen bg-background-black z-10">
      <footer className="flex flex-col xl:flex-row py-4 px-1.5 gap-2.5 xl:max-w-75.5 w-full  mx-auto justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="heading4 text-baseWhite">Inclusive Reality Lab</p>
          <p className="bodySmall text-baseWhite">
            School of Computer Science <br />
            University of Auckland
          </p>
          {/* Created a container for handling social media icons which accepts a property named iconColor needs to be either 'wht' for white or 'blk' for black */}
          <SocialMediaHandleContainer iconColor="wht"/>
        </div>
        <p className="bodySmall text-text-invalid text-right xl:self-end ">
          © 2025 Inclusive Reality Lab. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;

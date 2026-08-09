import SocialMediaHandleContainer from "./SocialMediaHandleContainer";

function Footer() {
  return (
    <footer className="flex w-screen bg-transparent z-10">
      {/* Mobile stacks everything 24px apart, then drops 40px before the
          copyright. Desktop splits into two columns and lets the right one
          stretch to the left column's height so the social row and copyright
          sit at its top and bottom edges. */}
      <div className="flex flex-col xl:flex-row justify-between gap-1.5 xl:gap-0 py-5 px-1.5 xl:px-0 w-full xl:max-w-content mx-auto">
        {/* lab name + affiliation */}
        <div className="flex flex-col gap-1.5">
          <p className="heading4">Inclusive Reality Lab</p>
          <p className="bodySmall">
            School of Computer Science <br />
            University of Auckland
          </p>
        </div>

        {/* social row + copyright */}
        <div className="flex flex-col gap-2.5 xl:gap-0 xl:justify-between items-start xl:items-end">
          <SocialMediaHandleContainer />
          <p className="bodySmall w-full text-right">
            © {new Date().getFullYear()} Inclusive Reality Lab. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

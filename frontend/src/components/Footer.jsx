function Footer() {
  return (
    <div className="flex w-screen bg-background-black">
      <footer className="flex flex-col xl:flex-row py-4 px-1.5 gap-2.5 xl:max-w-75.5 w-full  mx-auto justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="label text-baseWhite">Inclusive Reality Lab</p>
          <p className="bodySmall text-baseWhite">
            School of Computer Science <br />
            University of Auckland
          </p>

          <p className="bodySmall text-baseWhite">
            inclusiverealitylab@gmail.com
          </p>
        </div>
        <p className="bodySmall text-text-invalid text-right xl:self-end ">
          © 2025 Inclusive Reality Lab. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;

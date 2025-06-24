import ProjectCard from "../components/ProjectCard";
import useCustomCentering from "../hooks/useCustomCentering";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

import validRightArrow from "../assets/icons/validRightArrow.svg";
import invalidLeftArrow from "../assets/icons/invalidLeftArrow.svg";
import invalidRightArrow from "../assets/icons/invalidRightArrow.svg";
import validLeftArrow from "../assets/icons/validLeftArrow.svg";

function Carousel({ movementAmount }) {
  const marginRef = useRef();
  useCustomCentering(marginRef);

  const projects = [
    { id: 1, title: "Project one sample name" },
    { id: 2, title: "Project two sample name" },
    { id: 3, title: "Project three sample name" },
    { id: 4, title: "Project four sample name" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleMoveRight = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handleMoveLeft = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div
      ref={marginRef}
      className="flex flex-col justify-start  xl:py-5 py-5  gap-1.5 xl:max-w-64.5  border-2 border-white border-dashed  "
    >
      <h1 className="heading1 text-baseWhite ">Our latest works</h1>
      <div className="relative xl:w-screen overflow-hidden overflow-x-scroll ">
        {/* until backend is ready! */}
        {/* <ProjectCard className="xl:w-30 flex-shrink-0" />
                <ProjectCard className="xl:w-30 flex-shrink-0" />
                <ProjectCard className="xl:w-30 flex-shrink-0" /> */}
        <motion.div
          className="flex gap-1.5"
          initial={{ x: 0 }}
          animate={{ x: -currentIndex * movementAmount }}
          transition={{ type: "tween", duration: 0.6 }}
        >
          {projects.map((project) => (
            <motion.div className="xl:w-30" key={project.id}>
              <ProjectCard
                project={project}
                className="xl:w-30 flex-shrink-0"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="flex flex-row justify-between xl:items-center items-end gap-1.5 ">
        <div className="hidden xl:flex flex-row justify-start xl:items-center items-end gap-1.5">
          <button onClick={handleMoveLeft} className="label text-baseWhite">
            <img src={currentIndex == 0 ? invalidLeftArrow : validLeftArrow} alt="Left arrow" className="w-2.5 h-2.5" />
          </button>

          <button onClick={handleMoveRight} className="label text-baseWhite">
            <img src={currentIndex == (projects.length)-1 ? invalidRightArrow : validRightArrow} alt="Right arrow" className="w-2.5 h-2.5" />
          </button>
        </div>

        <p className="label text-baseWhite">view all projects</p>
      </div>
    </div>
  );
}

export default Carousel;

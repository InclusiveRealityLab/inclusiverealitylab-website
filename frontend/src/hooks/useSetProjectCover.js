import { useEffect,useState } from "react";
import projectImagePlaceholder from "../assets/images/projectImagePlaceholder.png";

function useSetProjectCover(project) {
    const [bgImage, setBgImage] = useState(projectImagePlaceholder);

    useEffect(() => {
        if (project["Cover"]) {
          const img = new window.Image();
          img.src = `${import.meta.env.BASE_URL}images/works/${project["Cover"]}`;
          img.onload = () => setBgImage(img.src);
          img.onerror = () => setBgImage(projectImagePlaceholder);
        } else {
          setBgImage(projectImagePlaceholder);
        }
      }, [project["Cover"]]);

      // The permanent 25% dark wash is gone: covers now sit under black text
      // on the card, and the only dimming in the design is ProjectCard's
      // hover state, which owns its own overlay.
      const projectCoverStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

      return [projectCoverStyle];
}

export default useSetProjectCover;
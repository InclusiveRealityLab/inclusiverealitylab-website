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
    
      const projectCoverStyle = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

      return [projectCoverStyle];
}

export default useSetProjectCover;
import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain-image.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        glareEnable={true}
        scale={1.2}
        className="br2 shadow-2 logo-size logo-background"
      >
        <div className="pa3">
          <img src={brain} alt="brain_image" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;

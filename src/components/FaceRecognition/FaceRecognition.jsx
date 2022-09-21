import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className="center z-1">
      <div className="absolute mt2">
        <img
          id="inputimage"
          className="z-inherit"
          src={imageUrl}
          alt=""
          width={"500px"}
          height={"auto"}
        />
        {box.map((image, i) => (
          <div
            key={i}
            className="bounding-box"
            style={{
              zIndex: 3,
              top: image.topRow,
              right: image.rightCol,
              bottom: image.bottomRow,
              left: image.leftCol,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;

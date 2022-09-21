import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="p3">
        <strong>
          {`This Magic Brain will detect faces in your pictures. Give it a try!`}
        </strong>
      </p>
      <div className="center z-1">
        <div className="pa3 ma4 w-50 br3 shadow-2 form-background z-inherit">
          <input
            className="f4 pa2 w-70 text-decoration z-inherit"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-15 grow f4 link ph3 pv2 white"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;

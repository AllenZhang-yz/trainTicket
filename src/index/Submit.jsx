import React, { memo } from "react";
import "./Submit.css";

const Submit = memo(() => {
  return (
      <div className="submit">
          <button type="submit" className="submit-button">
        Search
          </button>
      </div>
  );
});

export default Submit;

import React, { useState } from "react";

const Btn = () => {
  const [condition, setCondition] = useState(false);

  const handleClick = () => {
    setCondition((prevCondition) => !prevCondition);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {condition ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </div>
  );
};

export default Btn;

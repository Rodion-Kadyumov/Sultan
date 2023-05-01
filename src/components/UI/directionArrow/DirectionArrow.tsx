import React from "react";

export const DirectionArrow = ({direction}: {direction: 'desc' | 'asc'}) => {
  const directions = {
    asc: <polygon points="0,100 100,100 50,0 0,100" />,
    desc: <polygon points="0,0 100,0 50,100 0,0" />,
  };

  return (
    <svg
      width="7px"
      height="7px"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {directions[direction]}
    </svg>
  );
};
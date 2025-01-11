import React from "react";

type Props = {
  rating: number;
};

const Stars = ({ rating }: Props) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          style={index < rating ? { color: "#F8B319" } : {}}
          className="mr-1 text-xl"
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Stars;

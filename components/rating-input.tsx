"use client";

import {
  RatingChange,
  Rating as ReactRating,
  Star,
} from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

interface Props {
  value: number;
  readonly?: boolean;
  size?: number;
  onChange?: RatingChange | undefined;
}

const myStyles = {
  itemShapes: Star,
  activeFillColor: "var(--brand-color)",
  inactiveFillColor: "#eee",
  itemStrokeWidth: 0,
};

const RatingInput = (props: Props) => {
  return (
    <ReactRating
      style={{ maxWidth: props.size || 80 }}
      itemStyles={myStyles}
      readOnly={props.readonly}
      {...props}
    />
  );
};

export default RatingInput;

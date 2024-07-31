"use client";

import Lottie from "lottie-react";

import React from "react";

interface Props {
  style?: React.CSSProperties | undefined;
  animationData: any;
  loop?: boolean;
}

const LottieAnimation = ({ style, animationData, loop = true }: Props) => {
  return <Lottie style={style} animationData={animationData} loop={loop} />;
};

export default LottieAnimation;

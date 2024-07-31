import { useEffect, useState } from "react";

export const useSticky = (topOffset = 10) => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleSetSticky = () => {
      if (window.scrollY > topOffset) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleSetSticky);

    return () => {
      window.removeEventListener("scroll", handleSetSticky);
    };
  }, [topOffset]);

  return {
    isSticky,
  };
};

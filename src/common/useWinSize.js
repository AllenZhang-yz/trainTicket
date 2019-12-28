import { useState, useEffect } from "react";

export const useWinSize = () => {
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [height, setHight] = useState(document.documentElement.clientHeight);
  useEffect(() => {
    const onResize = () => {
      setWidth(document.documentElement.clientWidth);
      setHight(document.documentElement.clientHeight);
    };

    window.addEventListener("resize", onResize, false);

    return () => {
      window.removeEventListener("resize", onResize, false);
    };
  }, []);

  return { width, height };
};

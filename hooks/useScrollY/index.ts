import { useState, useEffect } from "react";

export const useScrollY = (): number => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset + window.innerHeight);
    };
  }, []);

  return offset;
};

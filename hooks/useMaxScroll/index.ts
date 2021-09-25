import { useState, useEffect } from "react";
import { useScrollY } from "../useScrollY";

export const useMaxScroll = () => {
  const [isMaxScroll, setIsMaxScroll] = useState(false);
  const offset = useScrollY();

  const getBodyOffsetHeight = (): number => (process.browser ? document.body.offsetHeight : 0);

  const maxScroll = (): boolean => offset >= getBodyOffsetHeight();

  useEffect(() => {
    setIsMaxScroll(maxScroll());
  });

  return isMaxScroll;
};

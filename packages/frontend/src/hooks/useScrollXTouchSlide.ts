import { RefObject, useCallback, useEffect, useState } from "react";

type IReturnType = [number, number, boolean];
type IScrollXSlide = <T extends HTMLElement>(ref: RefObject<T>) => IReturnType;

const useScrollXTouchSlide: IScrollXSlide = (ref) => {
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);

  const onDragStart = useCallback((e: MouseEvent) => {
    e.preventDefault();
    if (!ref.current) return;
    const date = new Date();

    setIsDrag(true);
    setDragStart(date.getTime());
    setStartX(e.pageX + ref.current.scrollLeft);
  }, []);

  const onDragEnd = useCallback(() => {
    const date = new Date();

    setDragEnd(date.getTime());
    setIsDrag(false);
  }, []);

  const onDragMove = useCallback(
    (e: MouseEvent) => {
      if (!isDrag || !ref.current) return;
      const { scrollWidth, clientWidth, scrollLeft } = ref.current;

      ref.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    },
    [isDrag],
  );

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener("mousedown", onDragStart);
    ref.current.addEventListener("mouseleave", onDragEnd);
    ref.current.addEventListener("mouseup", onDragEnd);
    if (isDrag) {
      ref.current.addEventListener("mousemove", onDragMove);
    }

    return () => {
      if (!ref.current) return;

      ref.current.removeEventListener("mousedown", onDragStart);
      ref.current.removeEventListener("mouseup", onDragEnd);
      ref.current.removeEventListener("mouseleave", onDragEnd);
      ref.current.removeEventListener("mousemove", onDragMove);
    };
  }, [isDrag]);

  return [dragStart, dragEnd, isDrag];
};

export default useScrollXTouchSlide;

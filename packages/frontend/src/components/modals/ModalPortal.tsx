import { FC, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactChild;
}

const ModalPortal: FC<Props> = ({ children }) => {
  const modalRef = useRef<HTMLElement | null>(null);
  const bodyRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    modalRef.current = document.getElementById("modal");
    bodyRef.current = document.body;

    bodyRef.current.style.overflow = "hidden";

    return () => {
      if (bodyRef.current) bodyRef.current.removeAttribute("style");
    };
  }, []);

  return mounted ? createPortal(children, modalRef.current as HTMLElement) : null;
};

export default ModalPortal;

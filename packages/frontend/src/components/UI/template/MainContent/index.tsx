import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef } from "react";
import RowFrame from "../RowFrame";

interface Props {
  children: React.ReactNode;
  pageAction: string | null;
}

const MainContent: React.FC<Props> = ({ children, pageAction }) => {
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onAnimationStart();
  }, [children]);

  const onAnimationStart = useCallback(() => {
    if (!currentRef.current) return;

    if (pageAction === "next") {
      currentRef.current.style.animation = "prevPage 0.5s forwards";
    } else if (pageAction === "prev") {
      currentRef.current.style.animation = "nextPage 0.5s forwards";
    }
  }, [pageAction]);

  const onAnimationEnd = useCallback(() => {
    if (!currentRef.current) return;
    currentRef.current.style.animation = "";
  }, []);

  return (
    <Container ref={currentRef} onAnimationEnd={onAnimationEnd}>
      {children}
    </Container>
  );
};

const Container = styled(RowFrame)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;

  @keyframes nextPage {
    0% {
      opacity: 0;
      transform: translate(10em, 0);
    }

    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes prevPage {
    0% {
      opacity: 0;
      transform: translate(-10em, 0);
    }

    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
`;

export default MainContent;

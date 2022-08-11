import styled from "@emotion/styled";
import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

const Image = ({ width = "100%", height = "70%", ...props }: Props) => {
  return (
    <StyledImage width={width} height={height}>
      <img {...props} />
    </StyledImage>
  );
};

const StyledImage = styled.div<Pick<Props, "width" | "height">>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: relative;

  display: flex;
  justify-content: center;

  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: contain;
  }
`;

export default Image;

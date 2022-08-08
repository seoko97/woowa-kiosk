import styled from "@emotion/styled";

export default styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;

  @media (min-width: ${({ theme }) => theme.BP.KIOSK}) {
    width: ${({ theme }) => theme.BP.KIOSK};
  }
`;

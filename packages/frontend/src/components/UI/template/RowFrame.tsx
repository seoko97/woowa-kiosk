import styled from "@emotion/styled";

export default styled.div`
  width: 980px;
  margin: 0 auto;
  position: relative;

  @media (max-width: ${({ theme }) => theme.BP.KIOSK}) {
    width: 100%;
  }
`;

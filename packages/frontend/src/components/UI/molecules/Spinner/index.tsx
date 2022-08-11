import styled from "@emotion/styled";

const Spinner = () => {
  return (
    <StyledSpinner className="loading">
      <div className="loading_spinner"></div>
    </StyledSpinner>
  );
};

const StyledSpinner = styled.div`
  &.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  & > .loading_spinner {
    box-sizing: border-box;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: ${({ theme }) => theme.PRIMARY1};
    border-bottom-color: ${({ theme }) => theme.PRIMARY1};
    animation: spinner 0.8s ease infinite;
  }
`;

export default Spinner;

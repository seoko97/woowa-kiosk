import styled from "@emotion/styled";
import useModal from "src/hooks/useModal";

interface Props {
  children: React.ReactNode;
}

const DetailContent = ({ children }: Props) => {
  const [isShowOptions, , , handleShowOptions] = useModal();

  return (
    <>
      <DetailContentHeader onClick={handleShowOptions} isShowOptions={isShowOptions}>
        옵션 {isShowOptions ? "닫기" : "열기"}
      </DetailContentHeader>
      <Container isShowOptions={isShowOptions}>{children}</Container>
    </>
  );
};

const Container = styled.div<{ isShowOptions: boolean }>`
  width: 100%;
  top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  flex-wrap: nowrap;
  overflow: auto;
  background-color: ${({ theme }) => theme.WHITE};

  flex: ${({ isShowOptions }) => (isShowOptions ? 2 : 0)};
  transition: flex 0.5s;

  & > form {
    transition: opacity 0.5s;
    opacity: ${({ isShowOptions }) => (isShowOptions ? 1 : 0)};
  }
`;

const DetailContentHeader = styled.div<{ isShowOptions: boolean }>`
  width: 100%;
  transition: padding 0.5s;
  padding: ${({ isShowOptions }) => (isShowOptions ? "1rem" : "3rem")};
  cursor: pointer;

  border-radius: 10px 10px 0 0;
  box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DetailContent;

import styled from "@emotion/styled";
import Image from "src/components/UI/atoms/Image";
import { useMenu, useMenuAction } from "src/contexts/MenuContext";
import { IMenuRes } from "src/types/menu";
import CountIndicator from "../CountIndicator";

interface Props {
  menuInfo: Pick<IMenuRes, "imgUrl" | "name">;
}

const DetailMenuInfo = ({ menuInfo }: Props) => {
  const { imgUrl, name } = menuInfo;
  const { count } = useMenu();
  const { countHandler } = useMenuAction();

  return (
    <Container>
      <Image src={imgUrl} />
      <h3>{name}</h3>
      <CountIndicator count={count} countHandler={countHandler} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  padding: 2rem 0;
  gap: 20px;
`;

export default DetailMenuInfo;

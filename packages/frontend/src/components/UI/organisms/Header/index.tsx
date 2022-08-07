import styled from "@emotion/styled";
import { memo, MouseEventHandler, useCallback, useRef } from "react";
import useScrollXTouchSlide from "src/hooks/useScrollXTouchSlide";
import { ICategory } from "src/types/category";
import NavItem from "../../atoms/NavItem";
import RowFrame from "../../template/RowFrame";
import Title from "../Title";

interface Props {
  selected: string;
  categories: ICategory[];
  getMenus: (category: ICategory) => void;
}

const Header = ({ categories, selected, getMenus }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dragStart] = useScrollXTouchSlide(ref);

  const onClickNavItem: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const dragEnd = new Date().getTime();

      if (dragEnd - dragStart >= 150) return;

      const text = e.currentTarget.innerText;
      const selectedCategory = categories.find((category) => category.name === text);

      if (!selectedCategory) return;

      e.currentTarget.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth",
      });

      getMenus(selectedCategory);
    },
    [dragStart],
  );

  return (
    <Container>
      <Title />
      <StyledHeader ref={ref}>
        {categories.map((category) => (
          <NavItem
            className={selected === category.name ? "selected" : ""}
            key={category.id}
            text={category.name}
            onClick={onClickNavItem}
          />
        ))}
      </StyledHeader>
    </Container>
  );
};

const Container = styled(RowFrame)`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeader = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  flex-wrap: nowrap;
  cursor: pointer;

  padding: 1rem;
`;

export default memo(Header, (prev, next) => prev.selected === next.selected);

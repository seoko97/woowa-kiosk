import styled from "@emotion/styled";
import { memo, MouseEventHandler, useCallback, useRef } from "react";
import useScrollXTouchSlide from "src/hooks/useScrollXTouchSlide";
import { ICategory } from "src/types/category";
import NavItem from "../../atoms/NavItem";
import RowFrame from "../../template/RowFrame";
import Logo from "../Logo";

interface Props {
  selectedCategory: ICategory | null;
  categories: ICategory[];
  onSelectCategory: (category: ICategory) => void;
}

const Header = ({ categories, selectedCategory, onSelectCategory }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dragStart, dragEnd] = useScrollXTouchSlide(ref);

  const onClickNavItem: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (dragEnd - dragStart >= 150) return;

      const text = e.currentTarget.innerText;
      const _selectedCategory = categories.find((category) => category.name === text);

      if (!_selectedCategory || _selectedCategory.name === selectedCategory?.name) return;

      e.currentTarget.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth",
      });

      onSelectCategory(_selectedCategory);
    },
    [dragStart, dragEnd, selectedCategory],
  );

  return (
    <Container>
      <Logo />
      <StyledHeader ref={ref}>
        {categories.map((category) => (
          <NavItem
            className={selectedCategory?.name === category.name ? "selected" : ""}
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
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.BACKGROUND};
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

export default memo(Header);

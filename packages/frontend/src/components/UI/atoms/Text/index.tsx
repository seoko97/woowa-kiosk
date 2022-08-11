import styled from "@emotion/styled";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  type?: "DEFAULT" | "DESCRIPTION";
}

const Text = ({ children, type = "DEFAULT", ...props }: Props) => (
  <StyledText type={type} {...props}>
    {children}
  </StyledText>
);

const StyledText = styled.p<{ type: "DEFAULT" | "DESCRIPTION" }>`
  color: ${({ theme, type }) => (type === "DEFAULT" ? "#000" : theme.LABEL)};
`;

export default Text;

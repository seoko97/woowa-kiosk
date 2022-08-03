import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import GlobalStyle from "./theme/GlobalStyles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">asd</div>
    </ThemeProvider>
  );
}

export default App;

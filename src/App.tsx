import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { TodoContextProvider } from "./contexts/TodoContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <TodoContextProvider>
          <Router />
        </TodoContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

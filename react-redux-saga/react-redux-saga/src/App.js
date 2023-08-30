import logo from "./logo.svg";
import "./App.css";
import UserComponent from "./components/UserComponent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserComponent />
      </ThemeProvider>
    </div>
  );
}

export default App;

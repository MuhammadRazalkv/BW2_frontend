import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <h1>
        lkfsd 
      </h1>
    </ThemeProvider>
  );
};

export default App;

import Layout from "./components/Layout";
import { ThemeProvider } from "./components/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

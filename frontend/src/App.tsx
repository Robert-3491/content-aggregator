import AppNavigation from "./components/AppNavigation/AppNavigation";
import Index from "./components/index/Index";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <>
      <AppProvider>
        <AppNavigation />
        <Index />
      </AppProvider>
    </>
  );
}

export default App;

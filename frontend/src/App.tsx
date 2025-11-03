import AppWrapper from "./components/AppWrapper/AppWrapper";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <>
      <AppProvider>
        <AppWrapper />
      </AppProvider>
    </>
  );
}

export default App;

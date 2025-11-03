import GenericResults from "./components/index/GenericResults/GenericResults";
import Header from "./components/index/Header/Header";
import YtsResults from "./components/index/YTSresults/YtsResults";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <div className="container">
      <AppProvider>
        <Header />
        <YtsResults />
        <GenericResults />
      </AppProvider>
    </div>
  );
}

export default App;

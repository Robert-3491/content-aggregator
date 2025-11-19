import { useLoading } from "@/context/LoadingContext";
import ResultsLoading from "../SharedComponets/ResultsLoading/ResultsLoading";
import GenericResults from "./GenericResults/GenericResults";
import Header from "./Header/Header";
import Watchlist from "./Watchlist/Watchlist";
import YtsResults from "./YTSresults/YtsResults";

export default function Index() {
  const { isLoading } = useLoading();
  return (
    <>
      <Header />
      {!isLoading ? (
        <>
          <YtsResults />
          <GenericResults />
        </>
      ) : (
        <ResultsLoading />
      )}
      <Watchlist />
    </>
  );
}

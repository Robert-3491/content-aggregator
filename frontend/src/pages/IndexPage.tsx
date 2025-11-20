import { useLoading } from "@/context/LoadingContext";
import ResultsLoading from "../components/SharedComponets/ResultsLoading/ResultsLoading";
import GenericResults from "../components/IndexComponents/GenericResults/GenericResults";
import Header from "../components/IndexComponents/Header/Header";
import Watchlist from "../components/IndexComponents/Watchlist/Watchlist";
import YtsResults from "../components/IndexComponents/YTSresults/YtsResults";

export default function IndexPage() {
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

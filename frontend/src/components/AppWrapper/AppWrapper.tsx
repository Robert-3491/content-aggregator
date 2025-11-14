import { useLoading } from "@/context/LoadingContext";
import GenericResults from "../index/GenericResults/GenericResults";
import Header from "../index/Header/Header";
import YtsResults from "../index/YTSresults/YtsResults";
import AppIsLoading from "./AppIsLoading/AppIsLoading";
import Watchlist from "../index/Watchlist/Watchlist";

export default function AppWrapper() {
  const { isLoading } = useLoading();
  return (
    <>
      <Header />
      {!isLoading ? (
        <>
          <YtsResults />
          <GenericResults />
          <Watchlist />
        </>
      ) : (
        <AppIsLoading />
      )}
    </>
  );
}

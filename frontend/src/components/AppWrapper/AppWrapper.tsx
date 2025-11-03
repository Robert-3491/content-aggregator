import { useLoading } from "@/context/LoadingContext";
import GenericResults from "../index/GenericResults/GenericResults";
import Header from "../index/Header/Header";
import YtsResults from "../index/YTSresults/YtsResults";
import AppIsLoading from "./AppIsLoading/AppIsLoading";

export default function AppWrapper() {
  const { isLoading } = useLoading();
  return (
    <>
      {!isLoading ? (
        <>
          <Header />
          <YtsResults />
          <GenericResults />
        </>
      ) : (
        <AppIsLoading />
      )}
    </>
  );
}

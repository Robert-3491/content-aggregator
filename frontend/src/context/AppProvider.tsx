import { YtsMoviesProvider } from "./YtsMoviesContext";
import { GenericMoviesProvider } from "./GenericMoviesContext";

const providers = [YtsMoviesProvider, GenericMoviesProvider];

export function AppProvider({ children }: any) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}

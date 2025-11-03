import { YtsMoviesProvider } from "./YtsMoviesContext";
import { GenericMoviesProvider } from "./GenericMoviesContext";
import { SearchModeProvider } from "./SearchModeContext";
import { LoadingProvider } from "./LoadingContext";
import { SearchQueryProvider } from "./SearchQueryContext";

const providers = [
  LoadingProvider,
  YtsMoviesProvider,
  GenericMoviesProvider,
  SearchModeProvider,
  SearchQueryProvider,
];

export function AppProvider({ children }: any) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}

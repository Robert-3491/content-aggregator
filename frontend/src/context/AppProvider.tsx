import { YtsMoviesProvider } from "./YtsMoviesContext";
import { GenericMoviesProvider } from "./GenericMoviesContext";
import { SearchModeProvider } from "./SearchModeContext";
import { LoadingProvider } from "./LoadingContext";
import { SearchQueryProvider } from "./SearchQueryContext";
import { AdressBookProvider } from "./AdressBookContext";
import { DownloadModalProvider } from "./DownloadModalContext";

const providers = [
  LoadingProvider,
  YtsMoviesProvider,
  GenericMoviesProvider,
  SearchModeProvider,
  SearchQueryProvider,
  AdressBookProvider,
  DownloadModalProvider,
];

export function AppProvider({ children }: any) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}

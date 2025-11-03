import { YtsMoviesProvider } from "./YtsMoviesContext";
import { GenericMoviesProvider } from "./GenericMoviesContext";
import { SearchModeProvider } from "./SearchModeContext";

const providers = [
  YtsMoviesProvider,
  GenericMoviesProvider,
  SearchModeProvider,
];

export function AppProvider({ children }: any) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}

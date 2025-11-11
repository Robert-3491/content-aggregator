using Backend.Drivers;
using Backend.Models;
using Backend.Models.Responses;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;
using Backend.Utilities;
using Backend.Models.Requests;

namespace Backend.Scrapers
{
    public class RarbgScraper : IDisposable
    {
        private ChromeDriver _driver;

        public RarbgScraper()
        {
            _driver = SeleniumDriver.GetRarbgDriver();
        }

        public GenericResponse RarbgtScraper(SearchConfig config)
        {
            var genericResponse = new GenericResponse();
            Console.WriteLine("Search start RARBG");

            string movieOrSeries = config.IsMovieSearch ? "movies" : "tv";
            string seedersOrSize = config.IsSeedersSearchMode ? "seeders" : "size";
            string initialUrl = $"https://en.rarbg.gg/search/?search={config.SearchQuery}&category[]={movieOrSeries}&order={seedersOrSize}&by=DESC";
            
            NavigateWithRetry(initialUrl);

            WebDriverWait wait = new(_driver, TimeSpan.FromSeconds(30));
            
            try
            {
                IWebElement element = wait.Until(ExpectedConditions.ElementIsVisible(By.ClassName("lista2t")));
                ProcessMoviesOnPage(config, genericResponse);

                if (!config.OnePageSearch)
                {
                    var secondPage = _driver.FindElements(By.CssSelector("#pager_links a"))
                        .FirstOrDefault(link => link.Text == "2");

                    if (secondPage != null)
                    {
                        var secondPageUrl = secondPage.GetAttribute("href");
                        NavigateWithRetry(secondPageUrl);
                        wait.Until(ExpectedConditions.ElementIsVisible(By.ClassName("lista2t")));
                        ProcessMoviesOnPage(config, genericResponse);
                    }
                }

                if (config.NoLowQuality)
                    genericResponse = MovieListCleaner.RemoveLowQualities(genericResponse);

                foreach (var rarbgMovie in genericResponse.GenericMovies)
                {
                    NavigateWithRetry(rarbgMovie.MoviePageUrl);
                    IWebElement magnetElement = wait.Until(ExpectedConditions.ElementIsVisible(By.CssSelector("a[href^='magnet:']")));
                    rarbgMovie.MagnetUrl = magnetElement.GetAttribute("href");
                }
            }
            catch (WebDriverTimeoutException)
            {
                genericResponse.GenericMovies.Add(new GenericMovie
                {
                    Title = "RARBG failed",
                    Size = "0",
                    Seeders = 0,
                    MagnetUrl = "",
                    MoviePageUrl =""
                });
            }

            Console.WriteLine($"Search end RARBG \nResult count RARBG: {genericResponse.GenericMovies.Count}");
            return genericResponse;
        }

        private void NavigateWithRetry(string url)
        {
            while (true)
            {
                try
                {
                    _driver.Navigate().GoToUrl(url);
                    if (!_driver.PageSource.Contains("Bad gateway"))
                        break;
                }
                catch { }
                System.Threading.Thread.Sleep(2000);
            }
        }

        private void ProcessMoviesOnPage(SearchConfig config, GenericResponse genericResponse)
        {
            var movies = _driver.FindElements(By.ClassName("lista2"));

            foreach (var movie in movies)
            {
                var rarbgMovie = new GenericMovie();
                var titleTd = movie.FindElement(By.CssSelector("a[title]"));
                rarbgMovie.Title = titleTd.GetAttribute("title");
                rarbgMovie.MoviePageUrl = titleTd.GetAttribute("href");
                var sizeTd = movie.FindElement(By.CssSelector("td.lista[width='100px']"));
                rarbgMovie.Size = sizeTd.Text.Trim();
                var seedersTd = movie.FindElement(By.CssSelector("td.lista[width='50px']"));
                rarbgMovie.Seeders = int.Parse(seedersTd.Text.Trim());

                if (config.RemoveNoSeeds && rarbgMovie.Seeders == 0)
                    continue;
                if (!config.IsMovieSearch && config.RemoveEpisodes && MovieListCleaner.IsEpisode(rarbgMovie.Title))
                    continue;

                genericResponse.GenericMovies.Add(rarbgMovie);
            }
        }

        public void Dispose()
        {
        }
    }
}
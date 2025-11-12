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

        public GenericResponse RarbgScraperFunc(SearchConfig config)
        {
            var genericResponse = new GenericResponse();
            int timeout = 10;
            Console.WriteLine("Search start RARBG");

            string movieOrSeries = config.IsMovieSearch ? "movies" : "tv";
            string seedersOrSize = config.IsSeedersSearchMode ? "seeders" : "size";
            string initialUrl = $"https://en.rarbg.gg/search/?search={config.SearchQuery}&category[]={movieOrSeries}&order={seedersOrSize}&by=DESC";
            
            // Account for bad gateway : reload page 
            NavigateWithRetry(initialUrl);
            WebDriverWait wait = new(_driver, TimeSpan.FromSeconds(timeout));
            
            try
            {
                IWebElement element = wait.Until(ExpectedConditions.ElementIsVisible(By.ClassName("lista2t")));
                // Get all the movie details from page 1 (except the magnet)
                ProcessMoviesOnPage(config, genericResponse);

                // If 2 pages search mode:
                if (!config.OnePageSearch)
                {
                    // Check if second page exists
                    var secondPage = _driver.FindElements(By.CssSelector("#pager_links a"))
                        .FirstOrDefault(link => link.Text == "2");

                    if (secondPage != null)
                    {
                        var secondPageUrl = secondPage.GetAttribute("href");
                        NavigateWithRetry(secondPageUrl);
                        wait.Until(ExpectedConditions.ElementIsVisible(By.ClassName("lista2t")));
                        // Get all the movie details from page 2 (except the magnet)
                        ProcessMoviesOnPage(config, genericResponse);
                    }
                }

                if (config.NoLowQuality)
                    genericResponse = MovieListCleaner.RemoveLowQualities(genericResponse);

                // Loop through all the movies pages and extract the magnet Url
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
                    Title = $"RARBG failed: triggered the {timeout} seconds timeout",
                    Size = "-",
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
                _driver.Navigate().GoToUrl(url);
                if (!_driver.PageSource.Contains("Bad gateway"))
                    break;
            }
        }

        private void ProcessMoviesOnPage(SearchConfig config, GenericResponse genericResponse)
        {
            var movies = _driver.FindElements(By.ClassName("lista2"));

            foreach (var movie in movies)
            {
                var rarbgMovie = new GenericMovie();
                // Title
                var titleTd = movie.FindElement(By.CssSelector("a[title]"));
                rarbgMovie.Title = titleTd.GetAttribute("title");

                // Movie page URL
                rarbgMovie.MoviePageUrl = titleTd.GetAttribute("href");

                // Size
                var sizeTd = movie.FindElement(By.CssSelector("td.lista[width='100px']"));
                rarbgMovie.Size = sizeTd.Text.Trim();

                // Seeders
                var seedersTd = movie.FindElement(By.CssSelector("td.lista[width='50px']"));
                rarbgMovie.Seeders = int.Parse(seedersTd.Text.Trim());

                // Omit results based on filters
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
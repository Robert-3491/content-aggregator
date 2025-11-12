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
    public class ThePirateBayScraper : IDisposable
    {
        private ChromeDriver _driver;

        public ThePirateBayScraper()
        {
            _driver = SeleniumDriver.GetThePirateBayDriver();
        }

        public GenericResponse ThePirateBayScraperFunc(SearchConfig config)
        {
            var genericResponse = new GenericResponse();
            int timeout = 10;
            Console.WriteLine("Search start ThePirateBay");

            string initialUrl = $"https://thepiratebay.org/search.php?q={config.SearchQuery}/";            
            NavigateWithRetry(initialUrl);

            WebDriverWait wait = new(_driver, TimeSpan.FromSeconds(timeout));
            try
            {
                IWebElement element = wait.Until(ExpectedConditions.ElementExists(By.Id("torrents")));
                ProcessMoviesOnPage(config, genericResponse);

                if (config.NoLowQuality)
                    genericResponse = MovieListCleaner.RemoveLowQualities(genericResponse);
            }
            catch (WebDriverTimeoutException)
            {
                genericResponse.GenericMovies.Add(new GenericMovie
                {
                    Title = $"ThePirateBay failed: triggered the {timeout} seconds timeout",
                    Size = "-",
                    Seeders = 0,
                    MagnetUrl = "",
                    MoviePageUrl =""
                });
            }

            Console.WriteLine($"Search end ThePirateBay \nResult count ThePirateBay: {genericResponse.GenericMovies.Count}");
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
            var movies = _driver.FindElements(By.ClassName("list-entry"));

            foreach (var movie in movies)
            {
                // Category - continue if unwanted category (or unwanted subcategory based on filter)
                var categoryLinks = movie.FindElements(By.CssSelector("span.item-type a"));
                if (!MovieListCleaner.IsCategoryAllowed(categoryLinks[0].Text))
                    continue;
                var subcategory = categoryLinks[1].Text;
                var expectedCategory = config.IsMovieSearch ? "Movie" : "TV";
                if (!subcategory.Contains(expectedCategory))
                {
                    continue;
                }

                var thePirateBayMovie = new GenericMovie();

                // Title
                var titleLink = movie.FindElement(By.CssSelector("span.item-title a"));
                thePirateBayMovie.Title = titleLink.Text;

                // Movie page URL
                thePirateBayMovie.MoviePageUrl = titleLink.GetAttribute("href");

                // Size
                var sizeSpan = movie.FindElement(By.CssSelector("span.item-size"));
                thePirateBayMovie.Size = sizeSpan.Text.Trim();

                // Seeders
                var seedersSpan = movie.FindElement(By.CssSelector("span.item-seed"));
                thePirateBayMovie.Seeders = int.Parse(seedersSpan.Text.Trim());

                // Magnet URL
                var magnetLink = movie.FindElement(By.CssSelector("span.item-icons a[href^='magnet:']"));
                thePirateBayMovie.MagnetUrl = magnetLink.GetAttribute("href");
                
                if (config.RemoveNoSeeds && thePirateBayMovie.Seeders == 0)
                    continue;
                if (!config.IsMovieSearch && config.RemoveEpisodes && MovieListCleaner.IsEpisode(thePirateBayMovie.Title))
                    continue;

                genericResponse.GenericMovies.Add(thePirateBayMovie);
            }
        }

        public void Dispose()
        {
        }
    }
}
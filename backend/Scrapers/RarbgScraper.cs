using System.Diagnostics;
using System.Net;
using Backend.Drivers;
using Backend.Models;
using Backend.Models.Responses;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Internal;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;
using Backend.Utilities;
using System.Text.RegularExpressions;
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
            _driver.Navigate().GoToUrl($"https://en.rarbg.gg/search/?search={config.SearchQuery}&category[]={movieOrSeries}&order={seedersOrSize}&by=DESC");

            WebDriverWait wait = new(_driver, TimeSpan.FromSeconds(25));
            IWebElement element = wait.Until(ExpectedConditions.ElementIsVisible(By.ClassName("lista2t")));

            // Process page 1
            ProcessMoviesOnPage(config, genericResponse, wait);

            // Process page 2 if enabled
            if (!config.OnePageSearch)
            {
                var secondPage = _driver.FindElements(By.CssSelector("#pager_links a"))
                    .FirstOrDefault(link => link.Text == "2");

                if (secondPage != null)
                {
                    var secondPageUrl = secondPage.GetAttribute("href");
                    _driver.Navigate().GoToUrl(secondPageUrl);
                    wait.Until(ExpectedConditions.ElementIsVisible(By.ClassName("lista2t")));

                    ProcessMoviesOnPage(config, genericResponse, wait);
                }
            }

            // Remove low qualities 480p & 720p
            if (config.NoLowQuality)
                genericResponse = MovieListCleaner.RemoveLowQualities(genericResponse);

            // Loop for MagnetURLs
            foreach (var rarbgMovie in genericResponse.GenericMovies)
            {
                _driver.Navigate().GoToUrl(rarbgMovie.MoviePageUrl);
                IWebElement magnetElement = wait.Until(ExpectedConditions.ElementIsVisible(By.CssSelector("a[href^='magnet:']")));
                rarbgMovie.MagnetUrl = magnetElement.GetAttribute("href");
            }

            Console.WriteLine($"Search end RARBG \nResult count RARBG: {genericResponse.GenericMovies.Count}");
            return genericResponse;
        }

        private void ProcessMoviesOnPage(SearchConfig config, GenericResponse genericResponse, WebDriverWait wait)
        {
            var movies = _driver.FindElements(By.ClassName("lista2"));

            foreach (var movie in movies)
            {
                var rarbgMovie = new GenericMovie();
                // Title + Url
                var titleTd = movie.FindElement(By.CssSelector("a[title]"));
                rarbgMovie.Title = titleTd.GetAttribute("title");
                rarbgMovie.MoviePageUrl = titleTd.GetAttribute("href");
                // Size
                var sizeTd = movie.FindElement(By.CssSelector("td.lista[width='100px']"));
                rarbgMovie.Size = sizeTd.Text.Trim();
                // Seeders
                var seedersTd = movie.FindElement(By.CssSelector("td.lista[width='50px']"));
                rarbgMovie.Seeders = int.Parse(seedersTd.Text.Trim());

                // if no Seeds, omit
                if (config.RemoveNoSeeds && rarbgMovie.Seeders == 0)
                    continue;
                // if Series search mode and is an individual episode, omit
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

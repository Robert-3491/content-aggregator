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

namespace Backend.Scrapers
{

   public class RarbgScraper : IDisposable
{
    private ChromeDriver _driver;

    public RarbgScraper()
    {
        _driver = SeleniumDriver.GetRarbgDriver();
    }
        public GenericResponse RarbgtScraper(string query, bool isMovieSearch, bool isSeedersSearchMode)
        {
            query= WebUtility.UrlEncode(query);
            var genericResponse = new GenericResponse();
            Console.WriteLine("Search start RARBG");
            string movieOrSeries = isMovieSearch ? "movies" : "tv";
            string seedersOrSize = isSeedersSearchMode ? "seeders" : "size";
            _driver.Navigate().GoToUrl($"https://en.rarbg.gg/search/?search={query}&category[]={movieOrSeries}&order={seedersOrSize}&by=DESC");

            WebDriverWait wait = new (_driver, TimeSpan.FromSeconds(25));
            IWebElement element = wait.Until(ExpectedConditions.ElementIsVisible(By.ClassName("lista2t")));

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
                if (rarbgMovie.Seeders == 0)
                    continue;
                // if Series search mode and is an individual episode, omit
                if (!isMovieSearch && MovieListCleaner.IsEpisode(rarbgMovie.Title))
                    continue;

                genericResponse.GenericMovies.Add(rarbgMovie);
            }
            // Remove low qualities 480p & 720p
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

        public void Dispose()
        {
        }
    }
}

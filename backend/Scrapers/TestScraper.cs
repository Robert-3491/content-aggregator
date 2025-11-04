using System.Net;
using Backend.Drivers;
using Backend.Models;
using Backend.Models.Responses;
using Backend.Models.YtsModels;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace Backend.Scrapers
{

    public class TestScraper : IDisposable
    {
        private readonly ChromeDriver? _driver;

        public TestScraper()
        {
            _driver = SeleniumDriver.GetYtsDriver();
        }


        public void TestScrape(string query)
        {
            var genericResponse = new GenericResponse();
            Console.WriteLine("Search start RARBG");
            var watch = System.Diagnostics.Stopwatch.StartNew();

            _driver.Navigate().GoToUrl("https://en.rarbg.gg/search/?search=open%20season&category[]=movies&category[]=tv&order=seeders&by=DESC");

            WebDriverWait wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(50));
            IWebElement element = wait.Until(ExpectedConditions.ElementIsVisible(By.ClassName("lista2t")));

            var movies = _driver.FindElements(By.ClassName("lista2"));
            foreach (var movie in movies)
            {
                var rarbgMovie = new GenericMovie();
                // Title + url
                var titleTd = movie.FindElement(By.CssSelector("a[title]"));
                rarbgMovie.Title = titleTd.GetAttribute("title");
                rarbgMovie.MoviePageUrl = titleTd.GetAttribute("href");
                // Size
                var sizeTd = movie.FindElement(By.CssSelector("td.lista[width='100px']"));
                rarbgMovie.Size = sizeTd.Text.Trim();
                // Seeders
                var seedersTd = movie.FindElement(By.CssSelector("td.lista[width='50px']"));
                rarbgMovie.Seeders = int.Parse(seedersTd.Text.Trim());


                Console.WriteLine("------------------");
                Console.WriteLine($"Title: {rarbgMovie.Title}");
                Console.WriteLine($"Link: {rarbgMovie.MoviePageUrl}");
                Console.WriteLine($"Seeds: {rarbgMovie.Seeders}");
                Console.WriteLine($"Size: {rarbgMovie.Size}");


            }

            System.Console.WriteLine("------------------------------------------------------------------------");
            watch.Stop();
            double elapsedSec = watch.ElapsedMilliseconds / 1000.0;
            System.Console.WriteLine($"Execution time: {elapsedSec}");
        }


        public void Dispose()
        {
        }
    }
}


// public void TestScrape(string query)
//         {
//             // Execution time: 13.287 (thepiratebay with selenium)
//             System.Console.WriteLine("Test start");
//             var watch = System.Diagnostics.Stopwatch.StartNew();

//            // _driver = SeleniumDriver.CreateNewFirefoxDriver();
//             _driver.Navigate().GoToUrl("https://thepiratebay.org/search.php?q=open+season&all=on&search=Pirate+Search&page=0&orderby=");
            
//             WebDriverWait wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(50));
//             IWebElement element = wait.Until(ExpectedConditions.ElementIsVisible(By.ClassName("browse")));

//             var movies = _driver.FindElements(By.ClassName("list-entry"));

//             foreach (var movie in movies)
//             {

//                 var Title = movie.FindElement(By.CssSelector(".list-item")).GetAttribute("textContent");
//                 System.Console.WriteLine("------------------");
//                 System.Console.WriteLine(Title);

//             }

//             System.Console.WriteLine("------------------------------------------------------------------------");
//             Dispose();
//             watch.Stop();
//             double elapsedSec = watch.ElapsedMilliseconds/1000.0;
//             System.Console.WriteLine($"Execution time: {elapsedSec}");
//         }
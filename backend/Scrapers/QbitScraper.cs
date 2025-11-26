using Backend.Drivers;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace Backend.Scrapers
{
    public class QbitScraper : IDisposable
    {
        private ChromeDriver _driver;

        public QbitScraper()
        {
            _driver = SeleniumDriver.GetQbitDriver();
        }

        public void AddTorrent(string magnetUrl, string path)
        {
            int timeout = 15;
            WebDriverWait wait = new(_driver, TimeSpan.FromSeconds(timeout));

            try
            {
                IWebElement addButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("downloadButton")));
                addButton.Click();

                var iframes = _driver.FindElements(By.TagName("iframe"));
                if (iframes.Count > 0)
                {
                    _driver.SwitchTo().Frame(iframes[0]);
                }

                IWebElement urlInput = wait.Until(ExpectedConditions.ElementExists(By.Id("urls")));
                urlInput.SendKeys(magnetUrl);

                var pathInput = _driver.FindElement(By.Id("savepath"));
                pathInput.Clear();
                pathInput.SendKeys(path);

                IWebElement submitButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("submitButton")));
                submitButton.Click();

                if (iframes.Count > 0)
                {
                    _driver.SwitchTo().DefaultContent();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding torrent: {ex.Message}");
                throw;
            }
        }

        public void Dispose()
        {

        }
    }
}
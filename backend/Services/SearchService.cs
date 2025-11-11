using Backend.Models.Requests;
using Backend.Models.Responses;
using Backend.Scrapers;

namespace Backend.Services
{
    public class SearchService(YtsScrapper ytsScraper , RarbgScraper rarbgScraper, TestScraper testScrape)
    {
        private readonly YtsScrapper _ytsScraper = ytsScraper;
        private readonly RarbgScraper _rarbgScraper = rarbgScraper;
        //private readonly TestScraper _testScrape = testScrape;

        public async Task<(YtsResponse?, GenericResponse)> ExecuteSearch(SearchConfig config)
        {

            var ytsTask = Task.Run(() => 
                config.IsMovieSearch ? _ytsScraper.ScrapeYTS(config) : null
            );

            var rarbgTask = Task.Run(() => 
                _rarbgScraper.RarbgtScraper(config)
            );

            // Wait for both to complete in parallel
            await Task.WhenAll(ytsTask, rarbgTask);

            var responseYTS = ytsTask.Result;
            var genericResponse = rarbgTask.Result;

            return (responseYTS, genericResponse);
        }

    }
}

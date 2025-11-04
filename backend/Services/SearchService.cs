using System.Net;
using System.Threading.Tasks;
using Backend.Models.Responses;
using Backend.Scrapers;

namespace Backend.Services
{
    public class SearchService(YtsScrapper ytsScraper , RarbgScraper rarbgScraper, TestScraper testScrape)
    {
        private readonly YtsScrapper _ytsScraper = ytsScraper;
        private readonly RarbgScraper _rarbgScraper = rarbgScraper;
        //private readonly TestScraper _testScrape = testScrape;

        public async Task<(YtsResponse?, GenericResponse)> ExecuteSearch(string query, bool isMovieSearch, bool isSeedersSearchMode)
        {
            var ytsTask = Task.Run(() => 
                isMovieSearch ? _ytsScraper.ScrapeYTS(query) : null
            );

            var rarbgTask = Task.Run(() => 
                _rarbgScraper.RarbgtScraper(query, isMovieSearch, isSeedersSearchMode)
            );

            // Wait for both to complete in parallel
            await Task.WhenAll(ytsTask, rarbgTask);

            var responseYTS = ytsTask.Result;
            var genericResponse = rarbgTask.Result;

            return (responseYTS, genericResponse);
        }

    }
}

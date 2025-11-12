using Backend.Models.Requests;
using Backend.Models.Responses;
using Backend.Scrapers;

namespace Backend.Services
{
    public class SearchService(YtsScrapper ytsScraper , RarbgScraper rarbgScraper, ThePirateBayScraper thePirateBayScrape)
    {
        private readonly YtsScrapper _ytsScraper = ytsScraper;
        private readonly RarbgScraper _rarbgScraper = rarbgScraper;
        private readonly ThePirateBayScraper _thePirateBayScrape = thePirateBayScrape;

        public async Task<(YtsResponse?, GenericResponse)> ExecuteSearch(SearchConfig config)
        {

            // var ytsTask = Task.Run(() =>
            //     config.IsMovieSearch ? _ytsScraper.ScrapeYTS(config) : null
            // );

            // var rarbgTask = Task.Run(() =>
            //     _rarbgScraper.RarbgScraperFunc(config)
            // );
            
            var pirateBayTask = Task.Run(() => 
            _thePirateBayScrape.ThePirateBayScraperFunc(config)
            );

            // Wait for all to complete in parallel
            //await Task.WhenAll(ytsTask, rarbgTask);
            await Task.WhenAll( pirateBayTask);

    
             //var responseYTS = ytsTask.Result;
            // var genericResponse = rarbgTask.Result;
             var genericResponse = pirateBayTask.Result;

            return (null, genericResponse);            
        }

    }
}

using Backend.Models.Requests;
using Backend.Models.Responses;
using Backend.Scrapers;
using Backend.Utilities;

namespace Backend.Services
{
    public class SearchService(YtsScrapper ytsScraper , RarbgScraper rarbgScraper, ThePirateBayScraper thePirateBayScrape)
    {
        private readonly YtsScrapper _ytsScraper = ytsScraper;
        private readonly RarbgScraper _rarbgScraper = rarbgScraper;
        private readonly ThePirateBayScraper _thePirateBayScrape = thePirateBayScrape;

        public async Task<(YtsResponse?, GenericResponse)> ExecuteSearch(SearchConfig config)
        {
            var ytsTask = Task.Run(() =>
                config.IsMovieSearch ? _ytsScraper.ScrapeYTS(config) : null
            );

            var rarbgTask = Task.Run(() =>
                _rarbgScraper.RarbgScraperFunc(config)
            );
            
            var pirateBayTask = Task.Run(() => 
                _thePirateBayScrape.ThePirateBayScraperFunc(config)
            );

            // Wait for all to complete in parallel
            await Task.WhenAll(ytsTask, rarbgTask, pirateBayTask);

            var responseYTS = await ytsTask;
            var rarbgResponse = await rarbgTask;
            var pirateBayResponse = await pirateBayTask;
            
            // Combine results
            var genericResponse = rarbgResponse;
            genericResponse.GenericMovies.AddRange(pirateBayResponse.GenericMovies);
            genericResponse = MovieListCleaner.RemoveDuplicates(genericResponse);

            return (responseYTS, genericResponse);            
        }

    }
}

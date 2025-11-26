using System.Text.Json;
using backend.Services;
using Backend.Scrapers;
namespace Backend.Services;

public class DownloadService
{
    private readonly QbitScraper _qbitScraper;
    private readonly AdressBookService _adressBookService;

    public DownloadService(QbitScraper qbitScraper, AdressBookService adressBookService)
    {
        _qbitScraper = qbitScraper;
        _adressBookService = adressBookService;
    }

    public async Task ExecuteDownload(string url, bool isMovieSearch)
    {
        string? path = "/Streaming/Movies";

        if (!isMovieSearch)
        {
            var adressBook = await _adressBookService.GetAsync();
            if (adressBook != null && !string.IsNullOrEmpty(adressBook.SeriesDirectories))
            {
                var directories = JsonSerializer.Deserialize<List<UrlEntry>>(adressBook.SeriesDirectories);
                var activePath = directories?.FirstOrDefault(d => d.active)?.url;
                path = $"/Streaming/Series/{activePath}";
            }
        }

        await Task.Run(() => _qbitScraper.AddTorrent(url, path));
    }
}
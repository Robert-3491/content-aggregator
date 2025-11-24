using backend.Data;
using backend.Services;
using Backend.Drivers;
using Backend.Scrapers;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<AdressBookService>();
builder.Services.AddScoped<WatchlistService>();
builder.Services.AddScoped<SearchService>();
builder.Services.AddScoped<YtsScrapper>();
builder.Services.AddScoped<RarbgScraper>();
builder.Services.AddScoped<ThePirateBayScraper>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors("AllowReact");

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureCreated();
}

// Get active URLs
string ytsUrl = "", rarbgUrl = "", pirateBayUrl = "";
using (var scope = app.Services.CreateScope())
{
    var adressBook = await scope.ServiceProvider.GetRequiredService<AdressBookService>().GetAsync();
    if (adressBook != null)
    {
        if (!string.IsNullOrEmpty(adressBook.YtsUrls))
            ytsUrl = JsonSerializer.Deserialize<List<UrlEntry>>(adressBook.YtsUrls)?.FirstOrDefault(u => u.active)?.url ?? ytsUrl;
        if (!string.IsNullOrEmpty(adressBook.RarbgUrls))
            rarbgUrl = JsonSerializer.Deserialize<List<UrlEntry>>(adressBook.RarbgUrls)?.FirstOrDefault(u => u.active)?.url ?? rarbgUrl;
        if (!string.IsNullOrEmpty(adressBook.PirateBayUrls))
            pirateBayUrl = JsonSerializer.Deserialize<List<UrlEntry>>(adressBook.PirateBayUrls)?.FirstOrDefault(u => u.active)?.url ?? pirateBayUrl;
    }
}

Console.WriteLine("Initializing drivers...");
await Task.WhenAll(
    Task.Run(() => SeleniumDriver.InitializeYtsDriver(ytsUrl)),
    Task.Run(() => SeleniumDriver.InitializeRarbgDriver(rarbgUrl)),
    Task.Run(() => SeleniumDriver.InitializeThePirateBayDriver(pirateBayUrl))
);
Console.WriteLine("All drivers ready!");

app.MapControllers();
app.MapGet("/api/status", () => new { message = true });

var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
lifetime.ApplicationStopping.Register(() => SeleniumDriver.CloseAllDrivers());

app.Run();

public class UrlEntry { public string url { get; set; } = ""; public bool active { get; set; } }
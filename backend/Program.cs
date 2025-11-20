using backend.Data;
using backend.Services;
using Backend.Drivers;
using Backend.Scrapers;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<AdressBookService>();
builder.Services.AddScoped<WatchlistService>();
builder.Services.AddScoped<SearchService>();

builder.Services.AddScoped<YtsScrapper>();
builder.Services.AddScoped<RarbgScraper>();
builder.Services.AddScoped<ThePirateBayScraper>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();
app.UseCors("AllowReact");
// Auto-create database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Initialize all drivers on startup
Console.WriteLine("Initializing drivers...");
var driverTasks = new[]
{
    Task.Run(() => SeleniumDriver.InitializeYtsDriver()),
    Task.Run(() => SeleniumDriver.InitializeRarbgDriver()),
    Task.Run(() => SeleniumDriver.InitializeThePirateBayDriver())
};
await Task.WhenAll(driverTasks);
Console.WriteLine("All drivers ready!");


// Map controllers
app.MapControllers();

// Status
app.MapGet("/api/status", () => new { message = true });

// Close drivers on shutdown
var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
lifetime.ApplicationStopping.Register(() => SeleniumDriver.CloseAllDrivers());

app.Run();
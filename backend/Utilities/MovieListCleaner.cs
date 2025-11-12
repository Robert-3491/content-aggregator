using System.Text.RegularExpressions;
using Backend.Models.Responses;

namespace Backend.Utilities
{
    public static class MovieListCleaner  
    {
        public static GenericResponse RemoveLowQualities(GenericResponse genericMovies)
        {
            genericMovies.GenericMovies.RemoveAll(movie =>
            movie.Title.Contains("720p") ||
            movie.Title.Contains("480p"));
            return genericMovies;
        }

        public static bool IsEpisode(string title)
        {
            return Regex.IsMatch(title.ToLower(), @"e(0[1-9]|[1-9][0-9])");
        }

        public static bool IsCategoryAllowed(string category)
        {
            string[] unwantedCategories = ["Audio", "Applications", "Games", "Porn", "Other"];
            return !unwantedCategories.Contains(category);
        }

        public static GenericResponse RemoveDuplicates(GenericResponse genericResponse)
        {
            // Group by title. Sort those groups by seeders. Keep the first one per group (highest seed nr). Sort by seed in the end.
            Console.WriteLine($"BEFORE Generics duplicates removal: {genericResponse.GenericMovies.Count}");
            genericResponse.GenericMovies = [.. genericResponse.GenericMovies
                .GroupBy(movie => movie.Title)
                .Select(group => group.OrderByDescending(movie => movie.Seeders).First())
                .OrderByDescending(movie => movie.Seeders)];
            Console.WriteLine($"AFTER Generics duplicates removal: {genericResponse.GenericMovies.Count}");
            return genericResponse;
        }
    }
}
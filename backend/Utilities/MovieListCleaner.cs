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
    }
}
namespace Backend.Models.Requests;

public class SearchConfig
{
    public string SearchQuery { get; set; }
    public bool IsMovieSearch { get; set; }
    public bool IsSeedersSearchMode { get; set; }
    public bool OnePageSearch { get; set; }
    public bool RemoveEpisodes { get; set; }
    public bool RemoveNoSeeds { get; set; }
    public bool NoLowQuality { get; set; }
    public bool IsFiltersVisible { get; set; }
}
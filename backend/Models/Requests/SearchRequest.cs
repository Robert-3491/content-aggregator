namespace Backend.Models.Requests;

public class SearchRequest
{
    public string Query { get; set; } = "";
    public bool IsMovieSearch { get; set; }
    public bool IsSeedersSearchMode { get; set; }

}
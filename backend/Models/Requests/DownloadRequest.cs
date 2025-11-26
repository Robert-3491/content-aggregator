namespace Backend.Models.Requests;

public class DownloadRequest
{
    public string Url { get; set; } = "";
    public bool IsMovieSearch { get; set; }
}


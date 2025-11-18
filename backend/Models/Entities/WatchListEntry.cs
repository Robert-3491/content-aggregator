namespace backend.Models.Entities;

public class WatchListEntry
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public bool IsMovie { get; set; }
    public DateTime LastSearch { get; set; }
}
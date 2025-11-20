using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities;
public class AdressBook
{
    public int Id { get; set; }
    
    [Column(TypeName = "TEXT")]
    public string? YtsUrls { get; set; }  
    
    [Column(TypeName = "TEXT")]
    public string? RarbgUrls { get; set; }
    
    [Column(TypeName = "TEXT")]
    public string? PirateBayUrls { get; set; }
    
    public string? QbitUrl { get; set; }
    
    [Column(TypeName = "TEXT")]
    public string? SeriesDirectories { get; set; }
}
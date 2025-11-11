namespace Backend.Models.Responses;

public class GenericResponse
{
    public List<GenericMovie> GenericMovies { get; set; }

    public GenericResponse()
    {
        GenericMovies = new List<GenericMovie>();
    }
} 

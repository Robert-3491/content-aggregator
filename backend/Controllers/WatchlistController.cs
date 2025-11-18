using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models.Entities;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WatchlistController : ControllerBase
{
    private readonly WatchlistService _watchlistService;

    public WatchlistController(WatchlistService watchlistService)
    {
        _watchlistService = watchlistService;
    }

    [HttpGet]
    public async Task<ActionResult<List<WatchListEntry>>> GetAll()
    {
        var watchlist = await _watchlistService.GetAllAsync();
        return Ok(watchlist);
    }

    [HttpPost]
    public async Task<ActionResult<WatchListEntry>> Add([FromBody] WatchListEntry entry)
    {
        var added = await _watchlistService.AddAsync(entry);
        return Ok(added);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Remove(int id)
    {
        var removed = await _watchlistService.RemoveAsync(id);
        if (!removed) return NotFound();
        return NoContent();
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<WatchListEntry>> UpdateEntry(int id, [FromBody] WatchListEntry obj)
    {
        var entry = await _watchlistService.UpdateEntryAsync(id, obj.Title, obj.IsMovie);
        if (entry == null)
            return NotFound();
        
        return Ok(entry);
    }
}
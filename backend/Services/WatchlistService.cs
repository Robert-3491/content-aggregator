using backend.Data;
using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class WatchlistService
{
    private readonly AppDbContext _context;

    public WatchlistService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<WatchListEntry>> GetAllAsync()
    {
        return await _context.WatchList.OrderByDescending(entry => entry.Id).ToListAsync();
    }

    public async Task<WatchListEntry> AddAsync(WatchListEntry entry)
    {
        entry.LastSearch = DateTime.UtcNow;
        _context.WatchList.Add(entry);
        await _context.SaveChangesAsync();
        return entry;
    }

    public async Task<bool> RemoveAsync(int id)
    {
        var entry = await _context.WatchList.FindAsync(id);
        if (entry == null) return false;

        _context.WatchList.Remove(entry);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<WatchListEntry> UpdateEntryAsync(int id, string title, bool isMovie)
    {
        var entry = await _context.WatchList.FindAsync(id);
        if (entry != null)
        {
            entry.Title = title;
            entry.IsMovie = isMovie;
            entry.LastSearch = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
        return entry;
    }

}
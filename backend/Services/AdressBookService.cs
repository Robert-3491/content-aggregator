using backend.Data;
using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class AdressBookService
{
    private readonly AppDbContext _context;

    public AdressBookService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<AdressBook?> GetAsync()
    {
        return await _context.AdressBook.FirstOrDefaultAsync();
    }

    public async Task<AdressBook> AddOrUpdateAsync(AdressBook adressBook)
    {
        var existing = await _context.AdressBook.FirstOrDefaultAsync();
        
        if (existing == null)
        {
            _context.AdressBook.Add(adressBook);
        }
        else
        {
            existing.YtsUrls = adressBook.YtsUrls;
            existing.RarbgUrls = adressBook.RarbgUrls;
            existing.PirateBayUrls = adressBook.PirateBayUrls;
            existing.QbitUrl = adressBook.QbitUrl;
            existing.SeriesDirectories = adressBook.SeriesDirectories;
        }

        await _context.SaveChangesAsync();
        return existing ?? adressBook;
    }
}
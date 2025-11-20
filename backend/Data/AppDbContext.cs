using Microsoft.EntityFrameworkCore;
using backend.Models.Entities;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<WatchListEntry> WatchList { get; set; }
    public DbSet<AdressBook> AdressBook { get; set; }
}
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

public class DataSeeder
{
    private readonly TankDbContext _context;

    public DataSeeder(TankDbContext context)
    {
        _context = context;
    }

    public void Seed()
    {
        if (!_context.Tanks.Any())
        {
            string json = File.ReadAllText("tank.json");
            var tanks = JsonSerializer.Deserialize<List<Tank>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (tanks != null)
            {
                _context.Tanks.AddRange(tanks);
                _context.SaveChanges();
            }
        }
    }
}

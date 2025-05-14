using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/")]
public class ListTankController : ControllerBase
{
    private readonly TankDbContext _context;

    public ListTankController(TankDbContext context)
    {
        _context = context;
    }

    [HttpGet("country/{country}")]
    public async Task<ActionResult<IEnumerable<object>>> GetTanksByCountry(string country)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        var lowerCountry = country.ToLower();

        var tanks = await _context.Tanks
            .Where(t => t.Country != null && t.Country.ToLower() == lowerCountry)
            .Select(t => new
            {
                TankId = t.TankId,
                Name = t.Name ?? string.Empty,
                JpgPath = $"{baseUrl}/images/{t.JpgPath ?? string.Empty}"
            })
            .ToListAsync();

        return tanks.Count > 0 
            ? Ok(tanks) 
            : NotFound($"No tanks found for country: {country}");
    }

    [HttpGet("type/{tankType}")]
    public async Task<ActionResult<IEnumerable<object>>> GetTanksByType(string tankType)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        var lowerTankType = tankType.ToLower();

        var tanks = await _context.Tanks
            .Where(t => t.TankType != null && t.TankType.ToLower() == lowerTankType)
            .Select(t => new
            {
                TankId = t.TankId,
                Name = t.Name ?? string.Empty,
                JpgPath = $"{baseUrl}/images/{t.JpgPath ?? string.Empty}"
            })
            .ToListAsync();

        return tanks.Count > 0 
            ? Ok(tanks) 
            : NotFound($"No tanks found for type: {tankType}");
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/")]
public class CountryTankController : ControllerBase
{
    private readonly TankDbContext _context;

    public CountryTankController(TankDbContext context)
    {
        _context = context;
    }

    [HttpGet("{country}")]
    public async Task<ActionResult<IEnumerable<object>>> GetTanksByCountry(string country)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";

        var tanks = await _context.Tanks
            .Where(t => t.Country != null && t.Country.ToLower() == country.ToLower())
            .Select(t => new
            {
                TankId = t.TankId,
                Name = t.Name ?? string.Empty,
                JpgPath = $"{baseUrl}/images/{t.JpgPath ?? string.Empty}"
            })
            .ToListAsync();

        if (!tanks.Any())
        {
            return NotFound($"No tanks found for country: {country}");
        }

        return Ok(tanks);
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/tanks")]
public class TankController : ControllerBase
{
    private readonly TankDbContext _context;

    public TankController(TankDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tank>>> GetAllTanks()
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";

        var tanks = await _context.Tanks
            .Include(t => t.Specifications)
                .ThenInclude(s => s!.Armor)
            .Include(t => t.Specifications)
                .ThenInclude(s => s!.Gun)
                    .ThenInclude(g => g!.VerticalGuidance)
            .Include(t => t.Specifications)
                .ThenInclude(s => s!.Gun)
                    .ThenInclude(g => g!.GunAmmunitions)
                        .ThenInclude(ga => ga!.Ammunition)
                            .ThenInclude(a => a!.ArmorPenetration)
            .ToListAsync();

        if (tanks == null || !tanks.Any())
        {
            return NotFound("No tanks found.");
        }

        var response = tanks.Select(t => new Tank
        {
            TankId = t.TankId,
            Name = t.Name ?? string.Empty,
            Country = t.Country ?? string.Empty,
            Description = t.Description ?? string.Empty,
            TankType = t.TankType ?? string.Empty,
            Model3DPath = $"{baseUrl}/models/{t.Model3DPath ?? string.Empty}",
            JpgPath = $"{baseUrl}/images/{t.JpgPath ?? string.Empty}",
            Specifications = t.Specifications == null ? null : new TankSpecification
            {
                SpecificationId = t.Specifications.SpecificationId,
                TankId = t.Specifications.TankId,
                GunId = t.Specifications.GunId,
                CrewCount = t.Specifications.CrewCount,
                MaxForwardSpeed = t.Specifications.MaxForwardSpeed,
                MaxBackwardSpeed = t.Specifications.MaxBackwardSpeed,
                PowerToWeightRatio = t.Specifications.PowerToWeightRatio,
                EnginePower = t.Specifications.EnginePower,
                Weight = t.Specifications.Weight,
                Armor = t.Specifications.Armor,
                Gun = t.Specifications.Gun
            }
        });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Tank>> GetTankById(int id)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";

        var tank = await _context.Tanks
            .Include(t => t.Specifications)
                .ThenInclude(s => s!.Armor)
            .Include(t => t.Specifications)
                .ThenInclude(s => s!.Gun)
                    .ThenInclude(g => g!.VerticalGuidance)
            .Include(t => t.Specifications)
                .ThenInclude(s => s!.Gun)
                    .ThenInclude(g => g!.GunAmmunitions)
                        .ThenInclude(ga => ga!.Ammunition)
                            .ThenInclude(a => a!.ArmorPenetration)
            .FirstOrDefaultAsync(t => t.TankId == id);

        if (tank == null)
        {
            return NotFound();
        }

        var tankResponse = new Tank
        {
            TankId = tank.TankId,
            Name = tank.Name ?? string.Empty,
            Country = tank.Country ?? string.Empty,
            Description = tank.Description ?? string.Empty,
            TankType = tank.TankType ?? string.Empty,
            Model3DPath = $"{baseUrl}/models/{tank.Model3DPath ?? string.Empty}",
            JpgPath = $"{baseUrl}/images/{tank.JpgPath ?? string.Empty}",
            Specifications = tank.Specifications == null ? null : new TankSpecification
            {
                SpecificationId = tank.Specifications.SpecificationId,
                TankId = tank.Specifications.TankId,
                GunId = tank.Specifications.GunId,
                CrewCount = tank.Specifications.CrewCount,
                MaxForwardSpeed = tank.Specifications.MaxForwardSpeed,
                MaxBackwardSpeed = tank.Specifications.MaxBackwardSpeed,
                PowerToWeightRatio = tank.Specifications.PowerToWeightRatio,
                EnginePower = tank.Specifications.EnginePower,
                Weight = tank.Specifications.Weight,
                Armor = tank.Specifications.Armor,
                Gun = tank.Specifications.Gun
            }
        };

        return Ok(tankResponse);
    }
}

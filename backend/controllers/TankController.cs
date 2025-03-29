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
            var tanks = await _context.Tanks.ToListAsync();

            if (tanks == null || !tanks.Any())
            {
                return NotFound("No tanks found.");
            }

            return Ok(tanks); 
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Tank>>> GetTank(int id)
        {
            var tank = await _context.Tanks.FindAsync(id);

            if (tank == null)
            {
                return NotFound();
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var model3DUrl = $"{baseUrl}/models/{tank.Model3DPath}";
            var imageUrl = $"{baseUrl}/images/{tank.JpgPath}";

            var tankDt = new Tank
            {
                TankId = tank.TankId,
                Name = tank.Name,
                Country = tank.Country,
                Description = tank.Description,
                TankType = tank.TankType,
                Model3DPath = model3DUrl,
                JpgPath = imageUrl
            };

            return Ok(tankDt);
        }

}


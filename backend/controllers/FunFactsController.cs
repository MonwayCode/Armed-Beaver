using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("/informations")]
public class InformationsController : ControllerBase
{
    private readonly TankDbContext _context;

    public InformationsController(TankDbContext context)
    {
        _context = context;
    }

    [HttpGet("random")]
    public async Task<ActionResult<Informations>> GetRandomFunFact()
    {
        var count = await _context.Informations.CountAsync();
        if (count == 0)
        {
            return NotFound("No fun facts available");
        }

        var random = new Random();
        var skip = random.Next(0, count);

        var randomFunFact = await _context.Informations
            .OrderBy(i => i.InformationId)
            .Skip(skip)
            .FirstOrDefaultAsync();

        return randomFunFact;
    }

    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<Informations>>> GetAllFunFacts()
    {
        return await _context.Informations.ToListAsync();
    }
}
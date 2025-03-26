using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/test")]
public class TestController : ControllerBase
{
    private readonly TankDbContext _context;

    public TestController(TankDbContext context)
    {
        _context = context;
    }

    [HttpGet("test-connection")]
    public async Task<IActionResult> TestConnection()
    {
        try
        {
            // Sprawdzenie, czy połączenie jest aktywne
            await _context.Database.CanConnectAsync();
            return Ok("Połączenie z bazą danych działa!");
        }
        catch (Exception ex)
        {
            return BadRequest($"Błąd połączenia: {ex.Message}");
        }
    }
}

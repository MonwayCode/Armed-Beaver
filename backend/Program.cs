using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Rejestracja DbContext
builder.Services.AddDbContext<TankDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), 
                      ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

// Rejestracja kontrolerów
builder.Services.AddControllers();

// Rejestracja Swaggera
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ustawienia Swaggera dla środowiska deweloperskiego
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Użycie kontrolerów
app.UseHttpsRedirection();
app.MapControllers();  // To doda routowanie kontrolerów

app.Run();

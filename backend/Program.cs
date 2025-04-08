using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Rejestracja usług - metoda odpowiedzialna za konfigurację
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod());
});

// Rejestracja DbContext
builder.Services.AddDbContext<TankDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
                      ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
    });


// Dodanie Swaggera do dokumentacji API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Konfiguracja ścieżek do zasobów
var imagePath = Path.Combine("F:\\GitHub\\Armed-Beaver\\backend\\TankImage");
var modelPath = Path.Combine(Directory.GetCurrentDirectory(), "tanks");

var app = builder.Build();

// Używanie CORS z polityką "AllowAll"
app.UseCors("AllowAll");

// Konfiguracja serwowania plików statycznych (np. modele 3D, obrazy)
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(modelPath),
    RequestPath = "/models",
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
    },
    ServeUnknownFileTypes = true
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(imagePath),
    RequestPath = "/images"
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

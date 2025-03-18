using Microsoft.EntityFrameworkCore;

public class TankDbContext : DbContext
{
    public TankDbContext(DbContextOptions<TankDbContext> options) : base(options) { }

    public DbSet<Tank> Tanks { get; set; }                
    public DbSet<TankSpecification> TankSpecifications { get; set; }  // Specyfikacje czołgów

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tank>()
            .ToTable("Tanks")
            .HasKey(t => t.tankId);  

        modelBuilder.Entity<TankSpecification>()
            .ToTable("TankSpecifications")
            .HasKey(ts => ts.specificationId);  

 modelBuilder.Entity<Tank>()
            .HasOne(t => t.Specifications)    
            .WithOne(ts => ts.Tank)             
            .HasForeignKey<TankSpecification>(ts => ts.tankId);
    }
}

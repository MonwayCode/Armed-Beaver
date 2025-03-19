using Microsoft.EntityFrameworkCore;    
public class TankDbContext : DbContext
{
    public TankDbContext(DbContextOptions<TankDbContext> options) : base(options) { }

    public DbSet<Tank> Tanks { get; set; }
    public DbSet<TankSpecification> TankSpecifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tank>()
            .ToTable("Tanks")
            .HasKey(t => t.TankId);  

        modelBuilder.Entity<TankSpecification>()
            .ToTable("TankSpecifications")
            .HasKey(ts => ts.SpecificationId);  

        modelBuilder.Entity<Tank>()
            .HasOne(t => t.Specifications)
            .WithOne(ts => ts.Tank)
            .HasForeignKey<TankSpecification>(ts => ts.TankId);  
    }
}

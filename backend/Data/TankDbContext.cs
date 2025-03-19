using Microsoft.EntityFrameworkCore;

public class TankDbContext : DbContext
{
    public TankDbContext(DbContextOptions<TankDbContext> options) : base(options) { }

    public DbSet<Tank> Tanks { get; set; }
    public DbSet<TankSpecification> TankSpecifications { get; set; }
    public DbSet<ArmorSpecification> ArmorSpecifications { get; set; }
    public DbSet<GunSpecification> GunSpecifications { get; set; }
    public DbSet<AmmunitionType> AmmunitionTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tank>()
            .ToTable("Tanks")
            .HasKey(t => t.TankId);

        modelBuilder.Entity<TankSpecification>()
            .ToTable("TankSpecifications")
            .HasKey(ts => ts.SpecificationId);
            
        modelBuilder.Entity<TankSpecification>()
            .HasOne(ts => ts.Tank)  
            .WithOne(t => t.Specifications) 
            .HasForeignKey<TankSpecification>(ts => ts.TankId);

        modelBuilder.Entity<ArmorSpecification>()
            .ToTable("ArmorSpecifications")
            .HasKey(ar => ar.ArmorId);

        modelBuilder.Entity<GunSpecification>()
            .ToTable("GunSpecifications")
            .HasKey(g => g.GunId);        

        modelBuilder.Entity<TankSpecification>()
            .HasOne(ts => ts.Armor)
            .WithOne(a => a.Specifications)
            .HasForeignKey<ArmorSpecification>(a => a.SpecificationId);

        modelBuilder.Entity<TankSpecification>()
            .HasOne(ts => ts.Gun)
            .WithOne(g => g.Specifications)
            .HasForeignKey<GunSpecification>(g => g.SpecificationId);

        modelBuilder.Entity<AmmunitionType>()
            .ToTable("AmmunitionTypes")
            .HasKey(a => a.AmmunitionId);

        modelBuilder.Entity<AmmunitionType>()
            .HasOne(a => a.Gun)
            .WithMany(g => g.AmmunitionTypes)
            .HasForeignKey(a => a.GunId);
    }
}

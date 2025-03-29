using Microsoft.EntityFrameworkCore;

public class TankDbContext : DbContext
{
    public TankDbContext(DbContextOptions<TankDbContext> options) : base(options) { }

    public DbSet<AmmunitionType> AmmunitionTypes { get; set; }
    public DbSet<ArmorPenetration> ArmorPenetration { get; set; }
    public DbSet<ArmorSpecification> ArmorSpecifications { get; set; }    
    public DbSet<GunAmmunition> GunAmmunition { get; set; }
    public DbSet<GunSpecification> GunSpecifications { get; set; }
    public DbSet<Informations> Informations { get; set; }
    public DbSet<Tank> Tanks { get; set; }
    public DbSet<TankSpecification> TankSpecifications { get; set; }
    public DbSet<VerticalGuidance> VerticalGuidance { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tank>()
            .ToTable("Tank")
            .HasKey(t => t.TankId);

        modelBuilder.Entity<TankSpecification>()
            .ToTable("TankSpecification")
            .HasKey(ts => ts.SpecificationId);
            
        modelBuilder.Entity<TankSpecification>()
            .HasOne(ts => ts.Tank)  
            .WithOne(t => t.Specifications) 
            .HasForeignKey<TankSpecification>(ts => ts.TankId);

        modelBuilder.Entity<ArmorSpecification>()
            .ToTable("ArmorSpecification")
            .HasKey(ar => ar.ArmorId);

        modelBuilder.Entity<GunSpecification>()
            .ToTable("GunSpecification")
            .HasKey(g => g.GunId);        

        modelBuilder.Entity<TankSpecification>()
            .HasOne(ts => ts.Armor)
            .WithOne(a => a.Specifications)
            .HasForeignKey<ArmorSpecification>(a => a.SpecificationId);

        modelBuilder.Entity<TankSpecification>()
            .HasOne(ts => ts.Gun)
            .WithMany(g => g.Specifications)
            .HasForeignKey(ts => ts.GunId);

        modelBuilder.Entity<AmmunitionType>()
            .ToTable("AmmunitionType")
            .HasKey(a => a.AmmunitionId);

        modelBuilder.Entity<GunAmmunition>()
            .HasKey(ga => new { ga.GunId, ga.AmmunitionId });

        modelBuilder.Entity<GunAmmunition>()
            .HasOne(ga => ga.Gun)
            .WithMany(g => g.GunAmmunitions)
            .HasForeignKey(ga => ga.GunId);

        modelBuilder.Entity<GunAmmunition>()
            .HasOne(ga => ga.Ammunition)
            .WithMany(a => a.GunAmmunitions)
            .HasForeignKey(ga => ga.AmmunitionId);

        modelBuilder.Entity<VerticalGuidance>()
            .ToTable("VerticalGuidance")
            .HasKey(vg => vg.VGId); 

        modelBuilder.Entity<GunSpecification>()
            .HasOne(gs => gs.VerticalGuidance)
            .WithOne(vg => vg.Gun)
            .HasForeignKey<VerticalGuidance>(vg => vg.GunId);  

        modelBuilder.Entity<ArmorPenetration>()
            .ToTable("ArmorPenetration")
            .HasKey(ap => ap.PenetrationId);  

        modelBuilder.Entity<AmmunitionType>()
            .HasOne(at => at.ArmorPenetration)
            .WithOne(ap => ap.Ammunition)
            .HasForeignKey<ArmorPenetration>(ap => ap.AmmunitionId); 

        modelBuilder.Entity<Informations>()
            .ToTable("Informations")
            .HasKey(i => i.InformationId);
    }

    
}

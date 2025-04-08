public class GunSpecification
{
    public int GunId { get; set; }
    public string? GunName { get; set; }
    public decimal Caliber { get; set; }
    public List<GunAmmunition> GunAmmunitions { get; set; }
     public GunSpecification()
    {
        GunAmmunitions = new List<GunAmmunition>();
    }
    public int AmmunitionCount { get; set; }
    public decimal ReloadTime { get; set; }
    public decimal TurretRotationSpeed { get; set; }
    public List<TankSpecification>? Specifications { get; set; }
    public VerticalGuidance? VerticalGuidance { get; set; }
}


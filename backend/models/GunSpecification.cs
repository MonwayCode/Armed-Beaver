public class GunSpecification
{
    public int GunId { get; set; }
    public int SpecificationId { get; set; }
    public string? GunName { get; set; }
    public decimal Caliber { get; set; }
    public List<AmmunitionType>? AmmunitionTypes { get; set; }
    public int AmmunitionCount { get; set; }
    public decimal ReloadTime { get; set; }
    public decimal VerticalGuidance { get; set; }
    public decimal TurretRotationSpeed { get; set; }
    public TankSpecification? Specifications { get; set; }
}


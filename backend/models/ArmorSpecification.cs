public class ArmorSpecification
{
    public int ArmorId { get; set; }
    public int SpecificationId { get; set; }
    public decimal HullFront { get; set; }
    public decimal HullSide { get; set; }
    public decimal HullRear { get; set; }
    public decimal TurretFront { get; set; }
    public decimal TurretSide { get; set; }
    public decimal TurretRear { get; set; }

    public TankSpecification? Specifications { get; set; }
}

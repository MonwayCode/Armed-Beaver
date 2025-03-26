
public class TankSpecification
{
    public int SpecificationId { get; set; }
    public int TankId { get; set; }
    public int GunId { get; set; }
    public int CrewCount { get; set; }
    public decimal MaxForwardSpeed { get; set; }
    public decimal MaxBackwardSpeed { get; set; }
    public decimal PowerToWeightRatio { get; set; }
    public decimal EnginePower { get; set; }
    public decimal Weight { get; set; }
    public Tank? Tank { get; set; }
    public ArmorSpecification? Armor { get; set; }
    public GunSpecification? Gun {get; set;}
}
public class TankSpecification
{
    public int SpecificationId { get; set; }
    public int TankId { get; set; }
    public string? Crew { get; set; }
    public string? Gun { get; set; }
    public string? FrontArmor { get; set; } 
    public string? SideArmor { get; set; }  
    public string? RearArmor { get; set; }  
    public string? Ammunition { get; set; } 
    public string? Engine { get; set; }
    public string? MaxSpeed { get; set; }
    public string? Weight { get; set; }

    public Tank? Tank { get; set; }  
}

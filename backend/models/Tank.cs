public class Tank
{
    public int TankId { get; set; }  
    public string? Name { get; set; }
    public string? Country { get; set; }
    public string? Description { get; set; }
    public string? TankType { get; set; }
    public string? Model3DPath { get; set; }
    public string? JpgPath { get; set; }
    public TankSpecification? Specifications { get; set; }
}

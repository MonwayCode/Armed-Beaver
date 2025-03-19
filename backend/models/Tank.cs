public class Tank
{
    public int TankId { get; set; }  // Nazwa powinna być zgodna z konwencją

    public string? Name { get; set; }
    public string? Country { get; set; }
    public string? Era { get; set; }
    public string? Description { get; set; }
    public string? Model3DPath { get; set; }
    
    // Relacja 1:1 z TankSpecification
    public TankSpecification? Specifications { get; set; }
}

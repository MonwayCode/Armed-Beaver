public class TankSpecification
{
    public int specificationId { get; set; }                
    public int tankId { get; set; }             
    public string gun { get; set; }    
    public string armor { get; set; }   
    public string ammunition { get; set; }        
    public string engin { get; set; } 
    public string maxSpeed { get; set; }            
    public string weight { get; set; }            
    public Tank Tank { get; set; }   
}           

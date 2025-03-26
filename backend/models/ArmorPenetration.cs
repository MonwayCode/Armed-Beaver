public class ArmorPenetration
{
    public int PenetrationId { get; set; }
    public int AmmunitionId { get; set; }
    public decimal? m100_0S { get; set; }
    public decimal? m100_30s { get; set; }
    public decimal? m100_60s { get; set; }
    public decimal? m1000_0s { get; set; }
    public decimal? m1000_30s { get; set; }
    public decimal? m1000_60s { get; set; }

    public AmmunitionType? Ammunition { get; set; } 
}
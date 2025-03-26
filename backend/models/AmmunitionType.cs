public class AmmunitionType
{
    public int AmmunitionId { get; set; }
    public int GunId { get; set; }
    public string? AmmunitionName { get; set; }
    public string? AmmunitionTypeName { get; set; }
    public int? Caliber { get; set; }
    public decimal? ProjectileMass { get; set; }
    public decimal? MuzzleVelocity { get; set; }
    public decimal? ExplosiveMassTNT { get; set; }
    public List<GunAmmunition>? GunAmmunitions { get; set; }
     public ArmorPenetration? ArmorPenetration { get; set; }
}
public class GunAmmunition
{
    public int GunId { get; set; }
    public int AmmunitionId { get; set; }

    public GunSpecification? Gun { get; set; }
    public AmmunitionType? Ammunition { get; set; }
}

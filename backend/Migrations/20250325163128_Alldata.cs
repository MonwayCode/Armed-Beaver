using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Alldata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AmmunitionTypes_GunSpecifications_GunId",
                table: "AmmunitionTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_GunSpecifications_TankSpecifications_SpecificationId",
                table: "GunSpecifications");

            migrationBuilder.DropIndex(
                name: "IX_GunSpecifications_SpecificationId",
                table: "GunSpecifications");

            migrationBuilder.DropIndex(
                name: "IX_AmmunitionTypes_GunId",
                table: "AmmunitionTypes");

            migrationBuilder.DropColumn(
                name: "Depression",
                table: "GunSpecifications");

            migrationBuilder.DropColumn(
                name: "ElevationSpeed",
                table: "GunSpecifications");

            migrationBuilder.AddColumn<int>(
                name: "GunId",
                table: "TankSpecifications",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "JpgPath",
                table: "Tanks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TankType",
                table: "Tanks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Caliber",
                table: "AmmunitionTypes",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ExplosiveMassTNT",
                table: "AmmunitionTypes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MuzzleVelocity",
                table: "AmmunitionTypes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ProjectileMass",
                table: "AmmunitionTypes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ArmorPenetrations",
                columns: table => new
                {
                    PenetrationId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AmmunitionId = table.Column<int>(type: "INTEGER", nullable: false),
                    m100_0S = table.Column<decimal>(type: "TEXT", nullable: true),
                    m100_30s = table.Column<decimal>(type: "TEXT", nullable: true),
                    m100_60s = table.Column<decimal>(type: "TEXT", nullable: true),
                    m1000_0s = table.Column<decimal>(type: "TEXT", nullable: true),
                    m1000_30s = table.Column<decimal>(type: "TEXT", nullable: true),
                    m1000_60s = table.Column<decimal>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArmorPenetrations", x => x.PenetrationId);
                    table.ForeignKey(
                        name: "FK_ArmorPenetrations_AmmunitionTypes_AmmunitionId",
                        column: x => x.AmmunitionId,
                        principalTable: "AmmunitionTypes",
                        principalColumn: "AmmunitionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GunAmmunition",
                columns: table => new
                {
                    GunId = table.Column<int>(type: "INTEGER", nullable: false),
                    AmmunitionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GunAmmunition", x => new { x.GunId, x.AmmunitionId });
                    table.ForeignKey(
                        name: "FK_GunAmmunition_AmmunitionTypes_AmmunitionId",
                        column: x => x.AmmunitionId,
                        principalTable: "AmmunitionTypes",
                        principalColumn: "AmmunitionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GunAmmunition_GunSpecifications_GunId",
                        column: x => x.GunId,
                        principalTable: "GunSpecifications",
                        principalColumn: "GunId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Informations",
                columns: table => new
                {
                    InformationId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    funfact = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Informations", x => x.InformationId);
                });

            migrationBuilder.CreateTable(
                name: "VerticalGuidances",
                columns: table => new
                {
                    VGId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Max = table.Column<decimal>(type: "TEXT", nullable: true),
                    Min = table.Column<decimal>(type: "TEXT", nullable: true),
                    GunId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VerticalGuidances", x => x.VGId);
                    table.ForeignKey(
                        name: "FK_VerticalGuidances_GunSpecifications_GunId",
                        column: x => x.GunId,
                        principalTable: "GunSpecifications",
                        principalColumn: "GunId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TankSpecifications_GunId",
                table: "TankSpecifications",
                column: "GunId");

            migrationBuilder.CreateIndex(
                name: "IX_ArmorPenetrations_AmmunitionId",
                table: "ArmorPenetrations",
                column: "AmmunitionId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GunAmmunition_AmmunitionId",
                table: "GunAmmunition",
                column: "AmmunitionId");

            migrationBuilder.CreateIndex(
                name: "IX_VerticalGuidances_GunId",
                table: "VerticalGuidances",
                column: "GunId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TankSpecifications_GunSpecifications_GunId",
                table: "TankSpecifications",
                column: "GunId",
                principalTable: "GunSpecifications",
                principalColumn: "GunId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TankSpecifications_GunSpecifications_GunId",
                table: "TankSpecifications");

            migrationBuilder.DropTable(
                name: "ArmorPenetrations");

            migrationBuilder.DropTable(
                name: "GunAmmunition");

            migrationBuilder.DropTable(
                name: "Informations");

            migrationBuilder.DropTable(
                name: "VerticalGuidances");

            migrationBuilder.DropIndex(
                name: "IX_TankSpecifications_GunId",
                table: "TankSpecifications");

            migrationBuilder.DropColumn(
                name: "GunId",
                table: "TankSpecifications");

            migrationBuilder.DropColumn(
                name: "JpgPath",
                table: "Tanks");

            migrationBuilder.DropColumn(
                name: "TankType",
                table: "Tanks");

            migrationBuilder.DropColumn(
                name: "Caliber",
                table: "AmmunitionTypes");

            migrationBuilder.DropColumn(
                name: "ExplosiveMassTNT",
                table: "AmmunitionTypes");

            migrationBuilder.DropColumn(
                name: "MuzzleVelocity",
                table: "AmmunitionTypes");

            migrationBuilder.DropColumn(
                name: "ProjectileMass",
                table: "AmmunitionTypes");

            migrationBuilder.AddColumn<decimal>(
                name: "Depression",
                table: "GunSpecifications",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ElevationSpeed",
                table: "GunSpecifications",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_GunSpecifications_SpecificationId",
                table: "GunSpecifications",
                column: "SpecificationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AmmunitionTypes_GunId",
                table: "AmmunitionTypes",
                column: "GunId");

            migrationBuilder.AddForeignKey(
                name: "FK_AmmunitionTypes_GunSpecifications_GunId",
                table: "AmmunitionTypes",
                column: "GunId",
                principalTable: "GunSpecifications",
                principalColumn: "GunId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GunSpecifications_TankSpecifications_SpecificationId",
                table: "GunSpecifications",
                column: "SpecificationId",
                principalTable: "TankSpecifications",
                principalColumn: "SpecificationId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

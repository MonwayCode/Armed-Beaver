using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Specifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tanks",
                columns: table => new
                {
                    TankId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Country = table.Column<string>(type: "TEXT", nullable: true),
                    Era = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Model3DPath = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tanks", x => x.TankId);
                });

            migrationBuilder.CreateTable(
                name: "TankSpecifications",
                columns: table => new
                {
                    SpecificationId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TankId = table.Column<int>(type: "INTEGER", nullable: false),
                    CrewCount = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxForwardSpeed = table.Column<decimal>(type: "TEXT", nullable: false),
                    MaxBackwardSpeed = table.Column<decimal>(type: "TEXT", nullable: false),
                    PowerToWeightRatio = table.Column<decimal>(type: "TEXT", nullable: false),
                    EnginePower = table.Column<decimal>(type: "TEXT", nullable: false),
                    Weight = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TankSpecifications", x => x.SpecificationId);
                    table.ForeignKey(
                        name: "FK_TankSpecifications_Tanks_TankId",
                        column: x => x.TankId,
                        principalTable: "Tanks",
                        principalColumn: "TankId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ArmorSpecifications",
                columns: table => new
                {
                    ArmorId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SpecificationId = table.Column<int>(type: "INTEGER", nullable: false),
                    HullFront = table.Column<decimal>(type: "TEXT", nullable: false),
                    HullSide = table.Column<decimal>(type: "TEXT", nullable: false),
                    HullRear = table.Column<decimal>(type: "TEXT", nullable: false),
                    TurretFront = table.Column<decimal>(type: "TEXT", nullable: false),
                    TurretSide = table.Column<decimal>(type: "TEXT", nullable: false),
                    TurretRear = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArmorSpecifications", x => x.ArmorId);
                    table.ForeignKey(
                        name: "FK_ArmorSpecifications_TankSpecifications_SpecificationId",
                        column: x => x.SpecificationId,
                        principalTable: "TankSpecifications",
                        principalColumn: "SpecificationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GunSpecifications",
                columns: table => new
                {
                    GunId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SpecificationId = table.Column<int>(type: "INTEGER", nullable: false),
                    GunName = table.Column<string>(type: "TEXT", nullable: true),
                    Caliber = table.Column<decimal>(type: "TEXT", nullable: false),
                    AmmunitionCount = table.Column<int>(type: "INTEGER", nullable: false),
                    ReloadTime = table.Column<decimal>(type: "TEXT", nullable: false),
                    Depression = table.Column<decimal>(type: "TEXT", nullable: false),
                    TurretRotationSpeed = table.Column<decimal>(type: "TEXT", nullable: false),
                    ElevationSpeed = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GunSpecifications", x => x.GunId);
                    table.ForeignKey(
                        name: "FK_GunSpecifications_TankSpecifications_SpecificationId",
                        column: x => x.SpecificationId,
                        principalTable: "TankSpecifications",
                        principalColumn: "SpecificationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AmmunitionTypes",
                columns: table => new
                {
                    AmmunitionId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GunId = table.Column<int>(type: "INTEGER", nullable: false),
                    AmmunitionName = table.Column<string>(type: "TEXT", nullable: true),
                    AmmunitionTypeName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AmmunitionTypes", x => x.AmmunitionId);
                    table.ForeignKey(
                        name: "FK_AmmunitionTypes_GunSpecifications_GunId",
                        column: x => x.GunId,
                        principalTable: "GunSpecifications",
                        principalColumn: "GunId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AmmunitionTypes_GunId",
                table: "AmmunitionTypes",
                column: "GunId");

            migrationBuilder.CreateIndex(
                name: "IX_ArmorSpecifications_SpecificationId",
                table: "ArmorSpecifications",
                column: "SpecificationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GunSpecifications_SpecificationId",
                table: "GunSpecifications",
                column: "SpecificationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TankSpecifications_TankId",
                table: "TankSpecifications",
                column: "TankId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AmmunitionTypes");

            migrationBuilder.DropTable(
                name: "ArmorSpecifications");

            migrationBuilder.DropTable(
                name: "GunSpecifications");

            migrationBuilder.DropTable(
                name: "TankSpecifications");

            migrationBuilder.DropTable(
                name: "Tanks");
        }
    }
}

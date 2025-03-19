using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class TankSpecification : Migration
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
                    Crew = table.Column<string>(type: "TEXT", nullable: true),
                    Gun = table.Column<string>(type: "TEXT", nullable: true),
                    FrontArmor = table.Column<string>(type: "TEXT", nullable: true),
                    SideArmor = table.Column<string>(type: "TEXT", nullable: true),
                    RearArmor = table.Column<string>(type: "TEXT", nullable: true),
                    Ammunition = table.Column<string>(type: "TEXT", nullable: true),
                    Engine = table.Column<string>(type: "TEXT", nullable: true),
                    MaxSpeed = table.Column<string>(type: "TEXT", nullable: true),
                    Weight = table.Column<string>(type: "TEXT", nullable: true)
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
                name: "TankSpecifications");

            migrationBuilder.DropTable(
                name: "Tanks");
        }
    }
}

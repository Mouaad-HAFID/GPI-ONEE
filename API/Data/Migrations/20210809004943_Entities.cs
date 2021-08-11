using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class Entities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Fournisseur",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fournisseur", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeEquipement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeEquipement", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gammes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Caracteristiques = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gammes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gammes_TypeEquipement_TypeId",
                        column: x => x.TypeId,
                        principalTable: "TypeEquipement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Equipements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AgentId = table.Column<int>(type: "int", nullable: false),
                    InventaireId = table.Column<int>(type: "int", nullable: false),
                    MouvementId = table.Column<int>(type: "int", nullable: false),
                    TypeEquipementId = table.Column<int>(type: "int", nullable: false),
                    GammeId = table.Column<int>(type: "int", nullable: false),
                    FournisseurId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Equipements_Fournisseur_FournisseurId",
                        column: x => x.FournisseurId,
                        principalTable: "Fournisseur",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Equipements_Gammes_GammeId",
                        column: x => x.GammeId,
                        principalTable: "Gammes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Equipements_TypeEquipement_TypeEquipementId",
                        column: x => x.TypeEquipementId,
                        principalTable: "TypeEquipement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Mouvements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeMouvement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateMouvement = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DemandeurId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mouvements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Direction",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MouvementId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Direction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Direction_Mouvements_MouvementId",
                        column: x => x.MouvementId,
                        principalTable: "Mouvements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Agents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Matricule = table.Column<int>(type: "int", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prenom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DR = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dir = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DomainePerso = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Poste = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fonction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UniteStruc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DirectionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Agents_Direction_DirectionId",
                        column: x => x.DirectionId,
                        principalTable: "Direction",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Inventaire",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DirectionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventaire", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inventaire_Direction_DirectionId",
                        column: x => x.DirectionId,
                        principalTable: "Direction",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Agents_DirectionId",
                table: "Agents",
                column: "DirectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Direction_MouvementId",
                table: "Direction",
                column: "MouvementId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipements_AgentId",
                table: "Equipements",
                column: "AgentId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipements_FournisseurId",
                table: "Equipements",
                column: "FournisseurId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipements_GammeId",
                table: "Equipements",
                column: "GammeId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipements_InventaireId",
                table: "Equipements",
                column: "InventaireId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipements_MouvementId",
                table: "Equipements",
                column: "MouvementId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipements_TypeEquipementId",
                table: "Equipements",
                column: "TypeEquipementId");

            migrationBuilder.CreateIndex(
                name: "IX_Gammes_TypeId",
                table: "Gammes",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventaire_DirectionId",
                table: "Inventaire",
                column: "DirectionId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_DemandeurId",
                table: "Mouvements",
                column: "DemandeurId");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipements_Agents_AgentId",
                table: "Equipements",
                column: "AgentId",
                principalTable: "Agents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Equipements_Inventaire_InventaireId",
                table: "Equipements",
                column: "InventaireId",
                principalTable: "Inventaire",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Equipements_Mouvements_MouvementId",
                table: "Equipements",
                column: "MouvementId",
                principalTable: "Mouvements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Agents_DemandeurId",
                table: "Mouvements",
                column: "DemandeurId",
                principalTable: "Agents",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Agents_Direction_DirectionId",
                table: "Agents");

            migrationBuilder.DropTable(
                name: "Equipements");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Fournisseur");

            migrationBuilder.DropTable(
                name: "Gammes");

            migrationBuilder.DropTable(
                name: "Inventaire");

            migrationBuilder.DropTable(
                name: "TypeEquipement");

            migrationBuilder.DropTable(
                name: "Direction");

            migrationBuilder.DropTable(
                name: "Mouvements");

            migrationBuilder.DropTable(
                name: "Agents");
        }
    }
}

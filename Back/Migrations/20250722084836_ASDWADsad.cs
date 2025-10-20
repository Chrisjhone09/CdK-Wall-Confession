using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back.Migrations
{
    /// <inheritdoc />
    public partial class ASDWADsad : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "From",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "To",
                table: "Posts",
                newName: "Sender");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Sender",
                table: "Posts",
                newName: "To");

            migrationBuilder.AddColumn<string>(
                name: "From",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

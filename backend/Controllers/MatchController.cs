using Dapper;
using LeaderBoard.Database;
using LeaderBoard.Models;
using LeaderBoard.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class MatchesController : ControllerBase
{
  private readonly ILogger<MatchesController> _logger;
  private readonly DatabaseConfig _db;


  public MatchesController(ILogger<MatchesController> logger, DatabaseConfig config)
  {
    _logger = logger;
    _db = config;
  }

  [HttpGet]
  public IEnumerable<Matches> GetMatches()
  {
    using var connection = new SqliteConnection(_db.Name);
    var matches = connection.Query<Matches>("SELECT * FROM Matches;");
    return matches;
  }

  [HttpPost]
  public bool CreateMatch(Matches match)
  {
    using var connection = new SqliteConnection(_db.Name);

    var res = connection.Execute(@"
            INSERT INTO Matches (
                Winner,
                Loser,
                Date
            ) VALUES (
                @Winner,
                @Loser,
                @Date
            );",
        new
        {
          Winner = match.Winner,
          Loser = match.Loser,
          Date = match.date
        });

    return res == 1;
  }

  [HttpDelete]
  public bool DeleteMatch(int Id)
  {
    using var connection = new SqliteConnection(_db.Name);
    var res = connection.Execute(
          @"DELETE * FROM Matches
                  WHERE Id = @IdInsert;",
            new { IdInsert = Id });

    return res == 1;
  }
}

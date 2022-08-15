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
    var matches = connection.Query<Matches>("SELECT * FROM Matches ORDER BY date DESC;");
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
          Date = match.date,
        });

    return res == 1;
  }

  [HttpDelete]
  public bool DeleteMatch(int ID)
  {
    using var connection = new SqliteConnection(_db.Name);
    var res = connection.Execute(
          @"DELETE FROM Matches
                  WHERE Id = @IdInsert;",
            new { IdInsert = ID });

    return res == 1;
  }

  [HttpGet("Score")]
  public IEnumerable<IdToScore> GetScore(){
    using var connection = new SqliteConnection(_db.Name);
    var score = connection.Query<IdToScore>(@"SELECT Winner AS ID, COUNT(*) as Score from Matches GROUP BY winner ORDER BY score DESC");
    return score;
  }

  [HttpGet("Score/filtered")]
  public IEnumerable<IdToScore> GetScoreFiltered([FromQuery]long DateStart, [FromQuery]long DateEnd){
    using var connection = new SqliteConnection(_db.Name);
    var score = connection.Query<IdToScore>(@"SELECT Winner AS ID, COUNT(*) as Score from Matches WHERE
                                              ((date BETWEEN @dateStart AND @dateEnd)) 
                                              GROUP BY winner ORDER BY score DESC",
    new {dateStart = DateStart, dateEnd = DateEnd});
    return score;
  }
}

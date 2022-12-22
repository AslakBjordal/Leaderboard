using Dapper;
using LeaderBoard.Database;
using LeaderBoard.Models;
using LeaderBoard.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
namespace backend.Controllers;


public class BaseController : ControllerBase
{
  protected readonly DatabaseConfig _db;

    public BaseController(DatabaseConfig config)
  {
    _db = config;
  }

  protected bool BaseUpdateElo(int UserId, int NewElo){
    using var connection = new SqliteConnection(_db.Name);
    
    var res = connection.Execute(@"
              UPDATE UserProfiles
              SET
                  Elo = @Elo
              WHERE Id = @Id;
              ",
              new {
                Id = UserId,
                Elo = NewElo
              });

    return false;
  }


    protected UserProfile getUser(int UserId){
        using var connection = new SqliteConnection(_db.Name);
        UserProfile user = connection.QuerySingle<UserProfile>(@"SELECT * FROM UserProfiles
                                                         WHERE Id = @Id;",
                                                          new{Id = UserId});
        return user;
    }
}

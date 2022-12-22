using Dapper;
using LeaderBoard.Database;
using LeaderBoard.Models;
using LeaderBoard.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : BaseController
{
  private readonly ILogger<UsersController> _logger;


  public UsersController(ILogger<UsersController> logger, DatabaseConfig config) : base(config)
  {
    _logger = logger;
  }

  [HttpGet]
  public IEnumerable<UserProfile> GetUsers()
  {
    using var connection = new SqliteConnection(_db.Name);
    var users = connection.Query<UserProfile>("SELECT * FROM UserProfiles;");
    return users;
  }

  [HttpPost]
  public bool CreateUsers(UserProfile user)
  {
    using var connection = new SqliteConnection(_db.Name);

    var check = connection.QuerySingleOrDefault<UserProfile>(
        @"SELECT * FROM UserProfiles
              WHERE UserName = @UserName;",
        user
    );

    if (check == null)
    {
      var res = connection.Execute(@"
                INSERT INTO UserProfiles (
                    UserName,
                    Password,
                    Elo
                ) VALUES (
                    @UserName,
                    @Password,
                    @Elo
                );",
          new
          {
            UserName = user.UserName,
            Password = Helper.ComputeSHA256Hash(user.Password),
            Elo = user.Elo
          }
      );
      return res == 1;
    }

    return false;
  }
  [HttpPut]
  public bool UpdateElo(int UserId, int score){
    return BaseUpdateElo(UserId, score);
  }
}

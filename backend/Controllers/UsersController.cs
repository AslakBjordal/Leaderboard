using Dapper;
using LeaderBoard.Database;
using LeaderBoard.Models;
using LeaderBoard.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
  private readonly ILogger<UsersController> _logger;
  private readonly DatabaseConfig _db;


  public UsersController(ILogger<UsersController> logger, DatabaseConfig config)
  {
    _logger = logger;
    _db = config;
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
                    Password
                ) VALUES (
                    @UserName,
                    @Password
                );",
          new
          {
            UserName = user.UserName,
            Password = Helper.ComputeSHA256Hash(user.Password)
          }
      );
      return res == 1;
    }

    return false;
  }
}

using System.Security.Claims;
using Dapper;
using LeaderBoard.Database;
using LeaderBoard.Models;
using LeaderBoard.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : Controller
{
  private readonly ILogger<AuthenticationController> _logger;
  private readonly DatabaseConfig _db;


  public AuthenticationController(ILogger<AuthenticationController> logger, DatabaseConfig config)
  {
    _logger = logger;
    _db = config;
  }

  [HttpGet("IsLoggedIn")]
  public UserProfile? IsLoggedIn()
  {
    var id = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "Id")?.Value;
    if (!string.IsNullOrEmpty(id))
    {
      using var connection = new SqliteConnection(_db.Name);
      var user = connection.QuerySingleOrDefault<UserProfile>(
          @"SELECT * FROM UserProfiles
                  WHERE Id = @IdInsert;",
            new { IdInsert = id });
      return user;
    }

    return null;
  }

  [HttpPost("Login")]
  public async Task<UserProfile?> Login(UserProfile user)
  {
    using var connection = new SqliteConnection(_db.Name);

    var res = connection.QuerySingleOrDefault<UserProfile>(
        @"SELECT * FROM UserProfiles
              WHERE UserName = @UserName
                AND Password = @Password;",
        new
        {
          UserName = user.UserName,
          Password = Helper.ComputeSHA256Hash(user.Password)
        }
    );

    if (res != null)
    {
      var claims = new[]
      {
        new Claim("Id", res.Id.ToString()),
      };
      var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
      var authProps = new AuthenticationProperties
      {
        IsPersistent = true,
        IssuedUtc = DateTime.UtcNow,
        ExpiresUtc = DateTimeOffset.UtcNow.AddYears(100),
        AllowRefresh = true,
      };
    Console.WriteLine(res.Id);

      await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProps);
    }

    return res;
  }

  [HttpPost("Logout")]
  public async Task Logout()
  {
    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
  }
}

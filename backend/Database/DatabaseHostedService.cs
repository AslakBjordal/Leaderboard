using Dapper;
using Microsoft.Data.Sqlite;


namespace LeaderBoard.Database
{
  public class DatabaseHostedService : IHostedService
  {
    private readonly DatabaseConfig databaseConfig;

    public DatabaseHostedService(DatabaseConfig databaseConfig)
    {
      this.databaseConfig = databaseConfig;
    }


    public Task StartAsync(CancellationToken cancellationToken)
    {
      using var connection = new SqliteConnection(databaseConfig.Name);

      connection.Execute(@"
            CREATE TABLE IF NOT EXISTS UserProfiles (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                UserName VARCHAR(30) NOT NULL,
                Password VARCHAR(30) NOT NULL,
                Elo INTEGER
            );

            CREATE TABLE IF NOT EXISTS Matches (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Winner INT,
                Loser INT,
                Date INT NOT NULL,
                FOREIGN KEY(Winner) REFERENCES UserProfiles(Id),
                FOREIGN KEY(Loser) REFERENCES UserProfiles(Id)
            );
        ");

      return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
      return Task.CompletedTask;
    }
  }
}
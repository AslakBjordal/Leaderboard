
using Dapper;
using LeaderBoard.Database;
using LeaderBoard.Models;
using Microsoft.Data.Sqlite;

namespace LeaderBoard.UserProfileMaster
{
    public interface IUserRepository
    {
        Task Create(UserProfile userprofile);
    }
}


namespace LeaderBoard.UserProfileMaster
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseConfig databaseConfig;

        public UserRepository(DatabaseConfig databaseConfig)
        {
            this.databaseConfig = databaseConfig;
        }
        
        public async Task Create(UserProfile userprofile)
        {
            using var connection = new SqliteConnection(databaseConfig.Name);

            await connection.ExecuteAsync("INSERT INTO UserProfile (UserProfileId, UserName, Password, Score, WeeklyScore, MonthlyScore)"+
            "VALUES (@UserProfileId, @UserName, @Password, @Score, @WeeklyScore, @MonthlyScore);",userprofile);
        }
    }
}
using System.Security.Cryptography;
using System.Text;
using LeaderBoard.Models;


namespace LeaderBoard.Utils
{
    public class Helper
    {
        public static string ComputeSHA256Hash(string input)
        {
            var bytes = SHA256.Create().ComputeHash(Encoding.ASCII.GetBytes("qGmLwByUv_" + input));

            var result = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
                result.Append(bytes[i].ToString("x2"));

            return result.ToString();
        }

        public static double CalculateWin( UserProfile A , UserProfile B){
            double winchance = (1/(1+Math.Pow(10,(B.Elo - A.Elo)/400)));
            return winchance;
        }

        public static int CalculateNewElo(UserProfile A, UserProfile B,int score){
            double expected = CalculateWin(A,B); 
            double newelo = A.Elo+40*(score-expected);

            return (int)newelo;
        }
    }
}

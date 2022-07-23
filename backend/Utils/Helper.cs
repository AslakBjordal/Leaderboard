using System.Security.Cryptography;
using System.Text;

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
    }
}

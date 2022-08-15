using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace LeaderBoard.Models
{

    public class UserProfile
    {
        [Key]
        public int Id {get; set;}

        [Column(TypeName = "nvarchar(10)")]
        public string UserName {get; set;} = string.Empty;

        [Column(TypeName = "nvarchar(30)")]
        public string Password {internal get; set;} = string.Empty;
    }
}

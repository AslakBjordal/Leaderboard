using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace LeaderBoard.Models
{
  public class Matches
  {
    public int Id { get; set; }
    public int Winner { get; set; }

    public int Loser { get; set; }

    public int date { get; set; }
  }
}
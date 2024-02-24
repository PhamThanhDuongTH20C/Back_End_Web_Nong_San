using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Eshop.Models
{
       public class Payment
    {
         
            public int Id { get; set; }
            public string Invoiceid { get; set; }
            public string Codepayment { get; set; }
            public bool Status { get; set; }
            public DateTime IssuedpayDate { get; set; } = DateTime.Now;


    }
    
}

using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Eshop.Models
{
       public class Supplier
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
            public string Address { get; set; }
            public bool isAvailable { get; set; }
            
        }
    
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace Eshop.Models
{
    public class ProductImage
    {
        public int Id { get; set; }
        public string ProductId { get; set; }
        public Product Product { get; set; }
        [NotMapped]
        [Display(Name = "Profile Image")]
        [Required]
        public IFormFile Image { get; set; }
        public string Imagepath { get; set; } 

    }
}

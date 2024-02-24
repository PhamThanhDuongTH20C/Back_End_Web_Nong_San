using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace Eshop.Models
{
    public class ProductReviews
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        // Navigation reference property cho khóa ngoại đến Product
        [DisplayName("Số sao")]
        public string Star { get; set; }
        [DisplayName("Bình luận")]
        public string Comment { get; set; }
        public Product Product { get; set; }
        public int MyProperty { get; set; }
        public string Username { get; set; }
    }
}

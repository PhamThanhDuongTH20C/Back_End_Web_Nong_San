using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Eshop.Models
{
    public class CartImport
    {
        public int Id { get; set; }

        //Navigation reference property cho khóa ngoại đến Account
        [DisplayName("Khách hàng")]
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public int Supplerid { get; set; }
        // Navigation reference property cho khóa ngoại đến Product
        public string Name { get; set; }
 
        [Required(ErrorMessage = "{0} không được bỏ trống")]
        [DefaultValue(1)]
        public int PriceImport { get; set; }
        public int Quantity { get; set; } = 1;
    }
}

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Eshop.Models
{
    public class ApplicationUser : IdentityUser
    {
       
        [DisplayName("Địa chỉ")]
        public string Address { get; set; }

        [DisplayName("Họ tên")]
        public string FullName { get; set; }

        [Required]
        [DisplayName("SĐT")]
        [RegularExpression("0\\d{9}", ErrorMessage = "SĐT không hợp lệ")]
        public string PhoneNumbers { get; set; }

        public bool Status { get; set; } = true;

    }
}

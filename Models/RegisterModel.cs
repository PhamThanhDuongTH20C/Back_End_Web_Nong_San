using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Eshop.Models
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required]
        [DisplayName("SĐT")]
        [RegularExpression("0\\d{9}", ErrorMessage = "SĐT không hợp lệ")]
        public string PhoneNumber { get; set; }

        [Required]
        [DisplayName("Họ tên")]
        public string FullName { get; set; }

        [Required]
        [DisplayName("Địa chỉ")]
        public string Address { get; set; }

        public bool Status { get; set; } = true;



    }
}

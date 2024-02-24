using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Eshop.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        [DisplayName("Mã HĐ")]
        public string Code { get; set; }
        //Navigation reference property cho khóa ngoại đến Account
        [DisplayName("Khách hàng")]
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        [DisplayName("Ngày lập")]
        [DataType(DataType.DateTime)]
        public DateTime IssuedDate { get; set; } = DateTime.Now;

        [DisplayName("Địa chỉ giao hàng")]
        public string ShippingAddress { get; set; }

        [DisplayName("SĐT giao hàng")]
        public string ShippingPhone { get; set; }

        [DisplayName("Tổng tiền")]
        [DisplayFormat(DataFormatString = "{0:n0}")]
        [DefaultValue(0)]
        public double Total { get; set; } = 0;

      
        [DisplayName("Còn hiệu lực")]
        [DefaultValue(true)]

        public bool Status { get; set; } = false;
        public bool Cancel { get; set; } = false;
        public bool Ship { get; set; } = false;
        public bool Shipping { get; set; } = false;
        public bool ShipSuccecs { get; set; } = false;
        public bool Succescfull { get; set; } = false;

        [DisplayName("Lý Do huy")]
        public string Reason { get; set; }
    }
}

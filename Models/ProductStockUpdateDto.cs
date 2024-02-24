using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.Models
{
    public class ProductStockUpdateDto
    {
        public int ProductId { get; set; }
        public int NewStock { get; set; }
    }
}

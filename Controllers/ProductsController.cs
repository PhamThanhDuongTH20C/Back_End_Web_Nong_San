using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eshop.Data;
using Eshop.Models;

namespace Eshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly EshopContext _context;

        public ProductsController(EshopContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products
        [HttpGet("{productTypeId}")]
        public async Task<ActionResult<Product>> GetProduct(int productTypeId)
        {
            var products = await _context.Products.Where(p => p.ProductTypeId == productTypeId).ToListAsync();

            if (products == null)
            {
                return NotFound();
            }

            return Ok(products);
        }
        [HttpGet("id/{id}")]
        public async Task<ActionResult<Product>> GetProducts(int id)
        {
            var products = await _context.Products.Where(p => p.Id == id).ToListAsync();

            if (products == null)
            {
                return NotFound();
            }

            return Ok(products);
        }
        [HttpGet("product/{name}")]
        public async Task<ActionResult<Product>> Getname(string name)
        {
            var products = await _context.Products.Where(p => p.Name.ToLower().Contains(name.ToLower())).ToListAsync();

            if (products == null)
            {
                return NotFound();
            }

            return Ok(products);
        }
        [HttpGet("status/{status}")]
        public IActionResult GetProductsByStatus(bool status)
        {
            var products = _context.Products
                .Where(p => p.Status == status)
                .ToList();

            return Ok(products);
        }
        [HttpGet("productHot/{productHot}")]
        public IActionResult GetProductsByproductHot(bool productHot)
        {
            var products = _context.Products
                .Where(p => p.ProductHot == productHot)
                .ToList();

            return Ok(products);
        }

        [HttpGet("price")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByPrice(int minPrice, int maxPrice)
        {
            var products = await _context.Products
                .Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                .ToListAsync();

            return products;
        }
        [HttpGet("new")]
        public ActionResult<IEnumerable<Product>> GetNewProducts(bool productNew)
        {
            var newProducts = _context.Products.Where(p => p.ProductNew).ToList();
            return Ok(newProducts);
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProduct", new { id = product.Id }, product);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return StatusCode(500, "An error occurred while saving the product.");
            }
        }

        [HttpGet("stock")]
        public IActionResult GetTotalStock()
        {
            int totalStock = _context.Products.Sum(p => p.Stock);

            return Ok(totalStock);
        }
        [HttpGet("count")]
        public IActionResult GetProductCount()
        {
            int productCount = _context.Products.Count();

            return Ok(productCount);
        }


        [HttpPut("products/{id}/stock")]
        public IActionResult UpdateStock(int id, [FromBody] int newStock)
        {
            // Tìm sản phẩm theo ID
            var product = _context.Products.FirstOrDefault(p => p.Id == id);

            // Kiểm tra nếu không tìm thấy sản phẩm
            if (product == null)
            {
                return NotFound();
            }

            // Cập nhật Stock mới
            product.Stock = newStock;

            // Lưu thay đổi vào cơ sở dữ liệu
            _context.SaveChanges();

            return Ok();
        }
        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
 
        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}

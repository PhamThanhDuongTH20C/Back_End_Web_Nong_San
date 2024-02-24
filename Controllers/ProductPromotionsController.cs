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
    public class ProductPromotionsController : ControllerBase
    {
        private readonly EshopContext _context;

        public ProductPromotionsController(EshopContext context)
        {
            _context = context;
        }

        // GET: api/ProductPromotions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductPromotion>>> GetProductPromotions()
        {
            return await _context.ProductPromotions.ToListAsync();
        }

        // GET: api/ProductPromotions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductPromotion>> GetProductPromotion(int id)
        {
            var productPromotion = await _context.ProductPromotions.FindAsync(id);

            if (productPromotion == null)
            {
                return NotFound();
            }

            return productPromotion;
        }
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<ProductPromotion>>> GetProductPromotionss()
        {
            var productPromotions = await _context.ProductPromotions.ToListAsync();

            return productPromotions;
        }
        [HttpGet("statustrue")]
        public async Task<ActionResult<IEnumerable<ProductPromotion>>> GetProduct(bool? status, string description)
        {
            var promotions = _context.ProductPromotions.AsQueryable();

            if (status.HasValue)
            {
                promotions = promotions.Where(p => p.Status == status.Value);
            }

            if (!string.IsNullOrEmpty(description))
            {
                promotions = promotions.Where(p => p.Description.Contains(description));
            }

            var result = await promotions.ToListAsync();

            return Ok(result);
        }




        [HttpPut("update-all-status")]
        public async Task<IActionResult> PutAllProductPromotionStatus(bool status)
        {
            var productPromotions = await _context.ProductPromotions.ToListAsync();

            foreach (var productPromotion in productPromotions)
            {
                productPromotion.Status = status;
                _context.Entry(productPromotion).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                // Handle any exceptions that occur during the save operation
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
        }

        // PUT: api/ProductPromotions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductPromotion(int id, ProductPromotion productPromotion)
        {
            if (id != productPromotion.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingPromotion = await _context.ProductPromotions.FindAsync(id);

            if (existingPromotion == null)
            {
                return NotFound();
            }

            existingPromotion.Percent = productPromotion.Percent;
            existingPromotion.Description = productPromotion.Description;
            existingPromotion.ExpirationDate = productPromotion.ExpirationDate;
            existingPromotion.Status = productPromotion.Status;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductPromotionExists(id))
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

        // POST: api/ProductPromotions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("sssss")]
        public async Task<ActionResult<ProductPromotion>> PostProductPromotion(ProductPromotion productPromotion)
        {
            // Thêm đối tượng productPromotion vào ngữ cảnh (_context) của ứng dụng
            _context.ProductPromotions.Add(productPromotion);

            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            // Trả về một đối tượng ActionResult, tạo thành công (CreatedAtAction) với thông tin về productPromotion đã được tạo
            return CreatedAtAction("GetProductPromotion", new { id = productPromotion.Id }, productPromotion);
        }
        [HttpGet("active-promotions")]
        public IActionResult GetActivePromotions()
        {
            DateTime today = DateTime.Today;

            var activePromotions = _context.ProductPromotions
                .Where(p => p.IssuedDate.Date <= today && p.ExpirationDate.Date >= today)
                .ToList();

            return Ok(activePromotions);
        }
        [HttpGet("update-promotion-status")]
        public IActionResult UpdatePromotionStatus()
        {
            DateTime today = DateTime.Today;

            var expiredPromotions = _context.ProductPromotions
                .Where(p => p.ExpirationDate.Date < today)
                .ToList();

            foreach (var promotion in expiredPromotions)
            {
                promotion.Status = false;
            }

            var activePromotions = _context.ProductPromotions
                .Where(p => p.ExpirationDate.Date >= today)
                .ToList();

            foreach (var promotion in activePromotions)
            {
                promotion.Status = true;
            }

            _context.SaveChanges();

            return Ok();
        }
        // DELETE: api/ProductPromotions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductPromotion(int id)
        {
            var productPromotion = await _context.ProductPromotions.FindAsync(id);
            if (productPromotion == null)
            {
                return NotFound();
            }

            _context.ProductPromotions.Remove(productPromotion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductPromotionExists(int id)
        {
            return _context.ProductPromotions.Any(e => e.Id == id);
        }
    }
}

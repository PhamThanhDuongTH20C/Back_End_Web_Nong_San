using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eshop.Data;
using Eshop.Models;
using Microsoft.CodeAnalysis;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;

namespace Eshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductReviewsController : ControllerBase
    {
        private readonly EshopContext _context;

        public ProductReviewsController(EshopContext context)
        {
            _context = context;
        }

        // GET: api/ProductReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReviews>>> GetProductReviews()
        {
            return await _context.ProductReviews.ToListAsync();
        }

        // GET: api/ProductReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductReviews>> GetProductReviews(int id)
        {
            var productReviews = await _context.ProductReviews.FindAsync(id);

            if (productReviews == null)
            {
                return NotFound();
            }

            return productReviews;
        }

        // PUT: api/ProductReviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductReviews(int id, ProductReviews productReviews)
        {
            if (id != productReviews.Id)
            {
                return BadRequest();
            }

            _context.Entry(productReviews).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductReviewsExists(id))
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

        // POST: api/ProductReviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductReviews>> PostProductReviews(ProductReviews productReviews)
        {
            var claims = HttpContext.User.Claims;
            if (claims == null)
            {
                return BadRequest();
            }
            var username = claims.FirstOrDefault(c => c.Type == "Username").Value;
            string accountId = _context.ApplicationUsers.FirstOrDefault(a => a.UserName == username).Id;
            _context.ProductReviews.Add(productReviews);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductReviews", new { id = productReviews.ProductId }, productReviews);
        }


        // DELETE: api/ProductReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductReviews(int id)
        {
            var productReviews = await _context.ProductReviews.FindAsync(id);
            if (productReviews == null)
            {
                return NotFound();
            }

            _context.ProductReviews.Remove(productReviews);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductReviewsExists(int id)
        {
            return _context.ProductReviews.Any(e => e.Id == id);
        }
    }
}

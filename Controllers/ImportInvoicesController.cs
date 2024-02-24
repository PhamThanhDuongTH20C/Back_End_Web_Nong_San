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
    public class ImportInvoicesController : ControllerBase
    {
        private readonly EshopContext _context;

        public ImportInvoicesController(EshopContext context)
        {
            _context = context;
        }

        // GET: api/ImportInvoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImportInvoice>>> GetImportInvoices()
        {
            return await _context.ImportInvoices.ToListAsync();
        }

        // GET: api/ImportInvoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ImportInvoice>> GetImportInvoice(int id)
        {
            var importInvoice = await _context.ImportInvoices.FindAsync(id);

            if (importInvoice == null)
            {
                return NotFound();
            }

            return importInvoice;
        }

        // PUT: api/ImportInvoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImportInvoice(int id, ImportInvoice importInvoice)
        {
            if (id != importInvoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(importInvoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImportInvoiceExists(id))
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

        // POST: api/ImportInvoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("card")]
        public async Task<ActionResult<ImportInvoice>> PostImportInvoice(ImportInvoice importInvoice)
        {
            _context.ImportInvoices.Add(importInvoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImportInvoice", new { id = importInvoice.Id }, importInvoice);
        }
        [HttpGet("invoice")]
        public async Task<ActionResult<IEnumerable<CartImport>>> GetCartImports()
        {
            var cartImports = await _context.CartImports.ToListAsync();
            return cartImports;
        }
        [HttpPost]
        public async Task<ActionResult<CartImport>> CreateCartImport(CartImport cartImport)
        {
            var claims = HttpContext.User.Claims;
            var username = claims.FirstOrDefault(c => c.Type == "Username").Value;
            string accountId = _context.ApplicationUsers.FirstOrDefault(a => a.UserName == username).Id;
            CartImport item = new CartImport
            {
                ApplicationUserId = accountId,
                ProductId = cartImport.ProductId,
                Supplerid = cartImport.Supplerid,
                Name = cartImport.Name,
                PriceImport = cartImport.PriceImport,
                Quantity = cartImport.Quantity
            };
            _context.CartImports.Add(item);
            await _context.SaveChangesAsync();           
             return CreatedAtAction(nameof(GetCartImport), new { id = cartImport.Id}, cartImport);
           
        }


        [HttpPost("Postss")]
        [Authorize]
        public async Task<ActionResult<ImportInvoice>> PostImportnvoice(ImportInvoice invoice)
        {
            var claims = HttpContext.User.Claims;
            if (claims == null)
            {
                return BadRequest();
            }
            var username = claims.FirstOrDefault(c => c.Type == "Username").Value;
            var carts = _context.CartImports.Include(c => c.ApplicationUser)
                                     .Include(c => c.Product)
                                     .Where(c => c.ApplicationUser.UserName == username);
            var accountId = _context.ApplicationUsers.FirstOrDefault(a => a.UserName == username).Id;

            ImportInvoice item = new ImportInvoice
            {
                Code = DateTime.Now.ToString("yyyyMMddhhmmss"),
                ApplicationUserId = accountId,
                IssuedDate = DateTime.Now,
                SupplierId = invoice.SupplierId,
                Total = invoice.Total,
                Status = true

            };
            _context.ImportInvoices.Add(item);
            _context.SaveChanges();
            foreach (var item2 in carts)
            {
                ImportInvoiceDetail detail = new ImportInvoiceDetail
                {
                    ImportInvoiceId = item.Id,
                    ProductId = item2.ProductId,
                    Quantity = item2.Quantity,
                    UnitPrice = item2.PriceImport
                };
                _context.ImportInvoiceDetails.Add(detail);
                _context.CartImports.Remove(item2);

                item2.Product.Stock += item2.Quantity;
                _context.Products.Update(item2.Product);
            }
            _context.SaveChanges();

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImportInvoices", new { id = invoice.Id }, invoice);
        }


        [HttpGet("card/{id}")]
        public async Task<ActionResult<CartImport>> GetCartImport(int id)
        {
            var cartImport = await _context.CartImports.FindAsync(id);

            if (cartImport == null)
            {
                return NotFound();
            }

            return cartImport;
        }
        // DELETE: api/ImportInvoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImportInvoice(int id)
        {
            var importInvoice = await _context.ImportInvoices.FindAsync(id);
            if (importInvoice == null)
            {
                return NotFound();
            }

            _context.ImportInvoices.Remove(importInvoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImportInvoiceExists(int id)
        {
            return _context.ImportInvoices.Any(e => e.Id == id);
        }
    }
}

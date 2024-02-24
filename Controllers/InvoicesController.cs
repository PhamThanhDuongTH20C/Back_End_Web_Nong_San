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
using System.Drawing;

namespace Eshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly EshopContext _context;

        public InvoicesController(EshopContext context)
        {
            _context = context;
        }
        [HttpGet("total/{date}")]
        public async Task<ActionResult<double>> GetTotalByDate(DateTime date)
        {
            DateTime startDate = date.Date;
            DateTime endDate = startDate.AddDays(1).AddTicks(-1);

            double total = await _context.Invoices
                .Where(i => i.IssuedDate >= startDate && i.IssuedDate <= endDate)
                .SumAsync(i => i.Total);

            return Ok(total);
        }

        [HttpGet("total-cancelled")]
        public IActionResult GetTotalInvoicesCancelled()
        {
            int totalCancelledInvoices = _context.Invoices
                .Count(i => i.Cancel);

            return Ok(totalCancelledInvoices);
        }

        [HttpGet("month")]
        public IActionResult GetTotalAmountInMonth(int month, int year)
        {
            // Tính ngày đầu tháng và ngày cuối thángA
            DateTime startDate = new DateTime(year, month, 1);
            DateTime endDate = startDate.AddMonths(1).AddDays(-1);

            // Truy vấn cơ sở dữ liệu để lấy tổng số tiền đơn hàng trong khoảng thời gian đã chỉ định
            double totalAmount = _context.Invoices
                .Where(i => i.IssuedDate >= startDate && i.IssuedDate <= endDate)
                .Sum(i => i.Total);

            return Ok(totalAmount);
        }
        [HttpGet("total")]
        public IActionResult GetTotalInvoicesToday()
        {
            DateTime today = DateTime.Today;
            DateTime tomorrow = today.AddDays(1);

            int totalInvoices = _context.Invoices
                .Count(i => i.IssuedDate >= today && i.IssuedDate < tomorrow);

            return Ok(totalInvoices);
        }
        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices.Include(p => p.ApplicationUser).ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, [FromBody] Invoice updatedInvoice)
        {
            if (id != updatedInvoice.Id)
            {
                return BadRequest();
            }

            // Find the existing invoice in the database
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            // Check if the cancel status has changed
            bool cancelStatusChanged = invoice.Cancel != updatedInvoice.Cancel;

            invoice.Code = updatedInvoice.Code;
            invoice.IssuedDate = updatedInvoice.IssuedDate;
            invoice.ShippingAddress = updatedInvoice.ShippingAddress;
            invoice.ShippingPhone = updatedInvoice.ShippingPhone;
            invoice.Total = updatedInvoice.Total;
            invoice.Status = updatedInvoice.Status;
            invoice.Cancel = updatedInvoice.Cancel;
            invoice.Ship = updatedInvoice.Ship;
            invoice.Shipping = updatedInvoice.Shipping;
            invoice.ShipSuccecs = updatedInvoice.ShipSuccecs;
            invoice.Succescfull = updatedInvoice.Succescfull;
            invoice.Reason = updatedInvoice.Reason;
            await _context.SaveChangesAsync();

            if (cancelStatusChanged && updatedInvoice.Cancel)
            {
                // Retrieve the invoice details from the database
                var invoiceDetails = await _context.InvoiceDetails
                    .Where(detail => detail.InvoiceId == id)
                    .ToListAsync();

                foreach (var detail in invoiceDetails)
                {
                    // Find the associated product
                    var product = await _context.Products.FindAsync(detail.ProductId);
                    if (product != null)
                    {
                        product.Stock += detail.Quantity; // Increase the product stock
                        _context.Products.Update(product);
                    }
                }

                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoiceById(int id)
        {
            var invoice = await _context.Invoices.Include(p => p.ApplicationUser)
                                                 .FirstOrDefaultAsync(p => p.Id == id);

            if (invoice == null)
            {
                return NotFound(); // Return a 404 Not Found response if the invoice is not found
            }

            return invoice;
        }
        [HttpGet("invoices")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicesByApplicationUserId()
        {
            var claims = HttpContext.User.Claims;
            if (claims == null)
            {
                return NotFound();
            }

            var username = claims.FirstOrDefault(c => c.Type == "Username")?.Value;
            if (string.IsNullOrEmpty(username))
            {
                return NotFound();
            }

            var invoices = await _context.Invoices
                .Include(i => i.ApplicationUser)
                .Where(i => i.ApplicationUser.UserName == username)
                .ToListAsync();

            if (invoices == null || invoices.Count == 0)
            {
                return NotFound();
            }

            return invoices;
        }


        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            var claims = HttpContext.User.Claims;
            if (claims == null)
            {
                return BadRequest();
            }
            var username = claims.FirstOrDefault(c => c.Type == "Username").Value;
            var carts = _context.Carts.Include(c => c.ApplicationUser)
                                     .Include(c => c.Product)
                                     .Where(c => c.ApplicationUser.UserName == username);
            var accountId = _context.ApplicationUsers.FirstOrDefault(a => a.UserName == username).Id;
            
            Invoice item = new Invoice
            {
                Code = DateTime.Now.ToString("yyyyMMddhhmmss"),
                ApplicationUserId = accountId,
                IssuedDate = DateTime.Now,
                ShippingAddress = invoice.ShippingAddress,
                ShippingPhone = invoice.ShippingPhone,
                Total = invoice.Total,
                Status = false,
                Cancel = false,
                Ship = false,
                Shipping = false,
                ShipSuccecs = false,
                Succescfull = false,
                Reason="Cảm ơn quý khách đã mua sản phẩm"

            };
            _context.Invoices.Add(item);
            _context.SaveChanges();
            foreach (var item2 in carts)
            {
                InvoiceDetail detail = new InvoiceDetail
                {
                    InvoiceId = item.Id,
                    ProductId = item2.ProductId,
                    Quantity = item2.Quantity,
                    UnitPrice = item2.Product.Price
                };
                _context.InvoiceDetails.Add(detail);
                _context.Carts.Remove(item2);

                item2.Product.Stock -= item2.Quantity;
                _context.Products.Update(item2.Product);
            }
            _context.SaveChanges();

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoices", new { id = invoice.Id }, invoice);
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("invoicesss")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicesByApplicationUserIds()
        {
            var claims = HttpContext.User.Claims;
            if (claims == null)
            {
                return NotFound();
            }

            var username = claims.FirstOrDefault(c => c.Type == "Username")?.Value;
            if (string.IsNullOrEmpty(username))
            {
                return NotFound();
            }

            var invoices = await _context.Invoices
                .Include(i => i.ApplicationUser)
                .Where(i => i.ApplicationUser.UserName == username &&
                            (i.Status || i.Cancel || i.Ship || i.Shipping || i.ShipSuccecs || i.Succescfull))
                .ToListAsync();

            if (invoices == null || invoices.Count == 0)
            {
                return NotFound();
            }

            return invoices;
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.Id == id);
        }
    }
}

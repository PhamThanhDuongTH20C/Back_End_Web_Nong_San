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
    public class InvoiceDetailsController : ControllerBase
    {
        private readonly EshopContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public InvoiceDetailsController(EshopContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/InvoiceDetails
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<InvoiceDetail>>> GetInvoiceDetails()
        {
            var claims = HttpContext.User.Claims;
            if (claims == null)
            {
                return BadRequest();
            }
            var username = claims.FirstOrDefault(c => c.Type == "Username").Value;
            string accountId = _context.ApplicationUsers.FirstOrDefault(a => a.UserName == username).Id;
            return await _context.InvoiceDetails.Include(p => p.Invoice).Include(p => p.Product).Where(p => p.Invoice.ApplicationUserId == accountId).ToListAsync();
        }

        // GET: api/InvoiceDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<InvoiceDetail>>> GetInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetails.Include(p => p.Invoice).Include(p => p.Product).Where(p => p.InvoiceId == id).ToListAsync();
            if (invoiceDetail == null)
            {
                return NotFound();
            }

            return invoiceDetail;
        }
        

        // PUT: api/InvoiceDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceDetail(int id, InvoiceDetail invoiceDetail)
        {
            if (id != invoiceDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoiceDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceDetailExists(id))
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

        [HttpPost]
        public async Task<ActionResult<ImportInvoiceDetail>> PostImportInvoiceDetail(ImportInvoiceDetail importInvoiceDetail)
        {
            _context.ImportInvoiceDetails.Add(importInvoiceDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImportInvoiceDetail", new { id = importInvoiceDetail.Id }, importInvoiceDetail);
        }

        // DELETE: api/InvoiceDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetails.FindAsync(id);
            if (invoiceDetail == null)
            {
                return NotFound();
            }

            _context.InvoiceDetails.Remove(invoiceDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceDetailExists(int id)
        {
            return _context.InvoiceDetails.Any(e => e.Id == id);
        }
    }
}

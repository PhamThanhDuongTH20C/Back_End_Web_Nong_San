using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eshop.Data;
using Eshop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Eshop.Controllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class ImportInvoiceDetailsController : ControllerBase
    {
        private readonly EshopContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ImportInvoiceDetailsController(EshopContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/ImportInvoiceDetails
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ImportInvoiceDetail>>> GetImportInvoiceDetails()
        {
            //return await _context.ImportInvoiceDetails.ToListAsync();
            var claims = HttpContext.User.Claims;
            if (claims == null)
            {
                return BadRequest();
            }
            var username = claims.FirstOrDefault(c => c.Type == "Username").Value;
            string accountId = _context.ApplicationUsers.FirstOrDefault(a => a.UserName == username).Id;
            return await _context.ImportInvoiceDetails.Include(p => p.ImportInvoiceId).Include(p => p.Product).Where(p => p.ImportInvoice.ApplicationUserId == accountId).ToListAsync();
        }
        [HttpGet("importdeta")]
        public async Task<ActionResult<IEnumerable<ImportInvoiceDetail>>> GetImportInvoiceDetails(int importInvoiceId)
        {
            // Assuming you have a data context or service to retrieve the data
            var importInvoiceDetails = await _context.ImportInvoiceDetails
                .Where(d => d.ImportInvoiceId == importInvoiceId)
                .ToListAsync();

            return Ok(importInvoiceDetails);
        }

        // GET: api/ImportInvoiceDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ImportInvoiceDetail>>> GetImportInvoiceDetail(int id)
        {
            // var invoiceDetail = await _context.InvoiceDetails.Include(p => p.Invoice).Include(p => p.Product).Where(p => p.InvoiceId == id).ToListAsync();
            var importInvoiceDetail = await _context.ImportInvoiceDetails
                .Include(p => p.ImportInvoice).Include(p => p.Product).Where(p => p.ImportInvoiceId == id).ToListAsync();
            if (importInvoiceDetail == null)
            {
                return NotFound();
            }

            return importInvoiceDetail;
        }
        [HttpGet("product")]
        public async Task<ActionResult<ImportInvoiceDetail>> GetImportInvoiceDetailPrice(int id)
        {
            var importInvoiceDetail = await _context.ImportInvoiceDetails
                .Include(p => p.ImportInvoice).Include(p => p.Product).Where(p => p.ProductId == id).ToListAsync();
            if (importInvoiceDetail == null)
            {
                return NotFound();
            }

            return importInvoiceDetail.LastOrDefault();
        }

        // PUT: api/ImportInvoiceDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImportInvoiceDetail(int id, ImportInvoiceDetail importInvoiceDetail)
        {
            if (id != importInvoiceDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(importInvoiceDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImportInvoiceDetailExists(id))
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

        // POST: api/ImportInvoiceDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ImportInvoiceDetail>> PostImportInvoiceDetail(ImportInvoiceDetail importInvoiceDetail)
        {
            _context.ImportInvoiceDetails.Add(importInvoiceDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImportInvoiceDetail", new { id = importInvoiceDetail.Id }, importInvoiceDetail);
        }

        // DELETE: api/ImportInvoiceDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImportInvoiceDetail(int id)
        {
            var importInvoiceDetail = await _context.ImportInvoiceDetails.FindAsync(id);
            if (importInvoiceDetail == null)
            {
                return NotFound();
            }

            _context.ImportInvoiceDetails.Remove(importInvoiceDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImportInvoiceDetailExists(int id)
        {
            return _context.ImportInvoiceDetails.Any(e => e.Id == id);
        }
    }
}

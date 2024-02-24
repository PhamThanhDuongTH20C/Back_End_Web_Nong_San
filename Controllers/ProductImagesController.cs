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

namespace Eshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductImagesController : ControllerBase
    {
        private readonly EshopContext _dbContext;

        public ProductImagesController(EshopContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductImage>>> GetProductImages()
        {
            return await _dbContext.ProductImages.ToListAsync();
        }

        // GET: api/ProductImages/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // Retrieve the ProductImage from the database using the ID
            var productImage = RetrieveProductImageById(id);

            if (productImage == null)
            {
                return NotFound();
            }

            // Get the image file path
            string imagePath = productImage.Imagepath;

            // Check if the image file exists
            if (System.IO.File.Exists(imagePath))
            {
                // Read the image file
                byte[] imageBytes = System.IO.File.ReadAllBytes(imagePath);

                // Determine the MIME type of the image based on the file extension
                string mimeType = GetMimeType(imagePath);

                // Return the image file as a FileStreamResult
                return File(imageBytes, mimeType);
            }

            return NotFound();
        }

        private ProductImage RetrieveProductImageById(int id)
        {
            // Implement your logic to retrieve the ProductImage from the database
            // using the provided ID.
            // Replace the code below with your actual implementation.
            var productImage = new ProductImage(); // Replace with your logic
            return productImage;
        }

        private string GetMimeType(string filePath)
        {
            // Get the file extension from the file path
            string extension = Path.GetExtension(filePath);

            // Map the file extension to the corresponding MIME type
            switch (extension.ToLowerInvariant())
            {
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                case ".png":
                    return "image/png";
                case ".gif":
                    return "image/gif";
                // Add more cases for other image file extensions if needed
                default:
                    return "application/octet-stream"; // fallback MIME type
            }
        }
        [HttpGet]
        [Route("api/productimages/{productId}")]
        public IActionResult GetProductImage(string productId)
        {
           
            {
                var productImage = _dbContext.ProductImages.FirstOrDefault(pi => pi.ProductId == productId);
                if (productImage == null)
                {
                    return NotFound(); // Return 404 Not Found if no matching record is found
                }

                return Ok(productImage); // Return the found productImage with 200 OK status
            }
        }
        // PUT: api/ProductImages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductImage(int id, ProductImage productImage)
        {
            if (id != productImage.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(productImage).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductImageExists(id))
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

        private bool ProductImageExists(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<IActionResult> PostProductImage([FromForm] ProductImage model)
        {


            if (ModelState.IsValid)
            {
                var productImage = new ProductImage
                {
                    ProductId = model.ProductId,
                    Imagepath = await SaveImageAsync(model.Image)
                };

                _dbContext.ProductImages.Add(productImage);
                await _dbContext.SaveChangesAsync();

                return Ok(model);
            }

            return BadRequest(ModelState);
        }
        [HttpPut("productId/{productId}")]
        public async Task<IActionResult> PutProductImagse(string ProductId, [FromForm] ProductImage model)
        {
            if (ModelState.IsValid)
            {
                var existingProductImage = await _dbContext.ProductImages.FindAsync(ProductId);

                if (existingProductImage == null)
                {
                    return NotFound();
                }

                existingProductImage.Imagepath = await SaveImageAsync(model.Image);

                await _dbContext.SaveChangesAsync();

                return Ok(model);
            }

            return BadRequest(ModelState);
        }


        [HttpGet]
        [Route("apis/productimages/{productId}")]
        public IActionResult GetProductImages(string productId)
        {
            var productImages = _dbContext.ProductImages.Where(pi => pi.ProductId == productId).ToList();

            if (productImages == null || productImages.Count == 0)
            {
                return NotFound();
            }

            return Ok(productImages);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var productImage = await _dbContext.ProductImages.FindAsync(id);
            if (productImage == null)
            {
                return NotFound();
            }

            _dbContext.ProductImages.Remove(productImage);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
        private async Task<string> SaveImageAsync(IFormFile image)
        {
            if (image == null || image.Length == 0)
                return null;

            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            return uniqueFileName;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Eshop.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Eshop.Data
{
    public class EshopContext : IdentityDbContext<ApplicationUser>
    {
        public EshopContext(DbContextOptions<EshopContext> options)
            : base(options)
        {
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetails { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<ImportInvoice> ImportInvoices { get; set; }
        public DbSet<ImportInvoiceDetail> ImportInvoiceDetails { get; set; }
        public DbSet<ProductReviews> ProductReviews { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ProductPromotion> ProductPromotions { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<CartImport> CartImports { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }

        internal Product GetProductById(int id)
        {
            throw new NotImplementedException();
        }
    }
}

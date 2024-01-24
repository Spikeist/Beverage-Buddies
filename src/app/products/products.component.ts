import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Item[] = [];
  filteredProducts: Item[] = [];
  selectedPriceRange: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = [...this.products];
    });
  }

  applyFilter() {
    if (this.selectedPriceRange) {
      const [min, max] = this.selectedPriceRange.split('-');
      this.productService.getProductsByPriceRange(+min, +max).subscribe((filteredProducts) => {
        this.filteredProducts = filteredProducts;
      });
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  viewProduct(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  editProduct(productId: number) {
    this.router.navigate(['/edit', productId]);
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== productId);
      this.filteredProducts = this.filteredProducts.filter((product) => product.id !== productId);
    });
  }
}
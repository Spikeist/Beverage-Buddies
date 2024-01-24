import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  product: Item | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!.toString() ?? 0;
    this.loadProduct(this.productId);
  }

  loadProduct(productId: number) {
    this.productService.getProduct(productId).subscribe((product) => {
      this.product = product;
    });
  }

  onEditClick() {
    this.router.navigate(['/edit', this.productId]);
  }

  onDeleteClick() {
    this.productService.deleteProduct(this.productId).subscribe(() => {
      console.log('Product deleted successfully.');
      this.router.navigate(['/products']);
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  productId: number = 0;
  product: Item | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!.toString() ?? 0;
    this.loadProduct(this.productId);

    this.productForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      description: ['', Validators.required],
      dairyFree: [false],
      price: [0, Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  loadProduct(productId: number) {
    this.productService.getProduct(productId).subscribe((product) => {
      this.product = product;

      this.productForm.patchValue({
        itemName: product.itemName,
        description: product.description,
        dairyFree: product.dairyFree,
        price: product.price,
        imageUrl: product.imageUrl
      });
    });
  }

  onSubmit() {
    const updatedProductData = this.productForm.value;

    this.productService.updateProduct({ id: this.productId, ...updatedProductData }).subscribe(() => {
      console.log('Product updated successfully.');
      this.router.navigate(['/products']);
    });
  }
}
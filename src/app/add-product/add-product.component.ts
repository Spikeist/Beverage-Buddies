import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      description: ['', Validators.required],
      dairyFree: [false],
      price: [0, Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  onSubmit() {
    const newProduct = this.productForm.value;

    this.productService.createProduct(newProduct).subscribe((createdProduct) => {
      console.log('Product added successfully:', createdProduct);
      this.router.navigate(['/products']);
    });
  }
}
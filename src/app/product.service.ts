import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/items';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  createProduct(product: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, product);
  }

  updateProduct(product: Item): Observable<Item> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<Item>(url, product);
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getProductsByPriceRange(minPrice: number, maxPrice: number): Observable<Item[]> {
    const url = `${this.apiUrl}?price_gte=${minPrice}&price_lte=${maxPrice}`;
    return this.http.get<Item[]>(url);
  }
}

import { Injectable } from '@angular/core';
import * as Parse from 'parse';

import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor() { }

  async getAllProducts(): Promise<Product[]> {
    const Product = Parse.Object.extend('Product');
    const query = new Parse.Query(Product);

    const results = await query.find();
    const products: Product[] = [];
    for (const j of results) {
      const json: Product = {
        id: j.id,
        name: j.get('name'),
        price_usd: j.get('price_usd'),
      };

      products.push(json);
    }

    return products;
  }
}

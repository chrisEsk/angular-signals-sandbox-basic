import { ChangeDetectionStrategy, Component, OnInit, effect, inject, signal } from '@angular/core';

import { ProductService } from 'src/services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private productService = inject(ProductService);
  public products = signal<Product[]>([]);

  constructor() {
    effect(() => {
      console.log('In effect, current value for products signal ->', this.products())
      this.products().forEach(e => {
        e.price_gbp = e.price_usd ? e.price_usd * 0.75 : 0;
      });
    });
  }

  async ngOnInit() {
    this.products.set(await this.productService.getAllProducts());
  }
}

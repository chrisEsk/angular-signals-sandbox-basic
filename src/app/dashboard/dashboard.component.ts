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
  private usd_gbp_exchangeRate = 0.75;
  public products = signal<Product[]>([]);

  constructor() {
    effect(() => {
      console.log('In effect, current value for products signal ->', this.products());
    });
  }

  async ngOnInit() {
    this.productService.getAllProducts().subscribe(res => {
      this.products.set(res);
    });
  }

  aggregateGBPPrice() {
    this.products.mutate(product => {
      product.forEach(e => {
        e.price_gbp = e.price_usd ? e.price_usd * this.usd_gbp_exchangeRate : 0;
      });
    });
  }

  removeGBPPrice() {
    this.products.mutate(product => {
      product.forEach(e => {
        delete e.price_gbp;
      });
    });
  }
}

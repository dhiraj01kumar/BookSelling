import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsdataService } from 'src/app/productsdata.service';
import { Item } from './item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;

	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductsdataService
	) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
			if (id) {
				var item: Item = {
					product: this.productService.find(id),
					quantity: 1
				};
				if (localStorage.getItem('cart') == null) {
					let cart: any = [];
          cart.push(JSON.stringify(item));          
          localStorage.setItem('cart', JSON.stringify(cart));
				} else {
					let cart: any = JSON.parse(localStorage.getItem('cart'));
					let index: number = -1;
					for (var i = 0; i < cart.length; i++) {
						let item: Item = JSON.parse(cart[i]);
						if (item.product.id == id) {
							index = i;
							break;
						}
					}
					if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
					} else {
						let item: Item = JSON.parse(cart[index]);
						item.quantity += 1;
						cart[index] = JSON.stringify(item);
            localStorage.setItem("cart", JSON.stringify(cart));
					}
				}
        this.loadCart();
			} else {
				this.loadCart();
      }
		});
	}

	loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.newPrice * item.quantity;
		}
	}

	remove(id: number): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == id) {/// here changed
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}
  _increamentQTY(id, quantity): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == id) {/// here changed
        item.quantity += 1;
        cart[i] = JSON.stringify(item);
			  localStorage.setItem("cart", JSON.stringify(cart));
				break;
      }
			
    }this.loadCart();
  }
  _decreamentQTY(id, quantity): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == id) {
        item.quantity -= 1;
        if(item.quantity==0){
          this.remove(id);
        }else{
          cart[i] = JSON.stringify(item);
          localStorage.setItem("cart", JSON.stringify(cart));
          break;
        }
        break;
      }
			
    }this.loadCart();
  }
 _proceedtoPayment():void{

 }

}
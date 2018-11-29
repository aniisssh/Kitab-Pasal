import { Product } from './product';

export class ShoppingCartItem {
    $key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    //making optional so that it will allow making shoppingCartItem object without necessarily providing argument 
    //this mean init can be an object that looks like a shoppingCartItem Object
    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this,init);
     }

    get totalPrice() {
        return this.price * this.quantity;
    }
}
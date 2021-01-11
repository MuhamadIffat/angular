import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataShareService } from '../services/data-share.service';
import { DataToCart } from '../shared/data-to-cart';
import { Modal } from '../shared/modal';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  page:string;
  books;
  cart:any[];
  cartLength:number;
  modalVisibility:boolean;
  emittedItem:any[];
  modalItem:object;
  storageName:string;
  constructor(private _bookService: ApiService,
              private _dataShareService: DataShareService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.page  = "shop";
    this.cartLength = 0
    this.modalItem = new Object;
    this.cart = [];
    this.storageName = "cartCleared";
    this.getData();
  }

  getData():any{
    this._bookService.getBooks().subscribe(
      data => { return this.books = data},
      err => console.error(err),
      () => console.log('done loading books')
    );
  }

  addToCart(i:number):void{
    var bookToCart = new DataToCart().setData(this.books,i);
    var cartStatus = this.localStorageService.getLocalstorage(this.books,this.storageName);
    if(cartStatus === 1){
      this.cart = [];
      this.localStorageService.setLocalstorage(0, this.storageName);
      this.cart.push(bookToCart);
    }else{
      this.cart = this.cart;
      this.cart.push(bookToCart);
    }
    this.passData(this.cart);
  }

  passData(cart:any[]):void{
    this.cart = cart;
    this._dataShareService.sendData(this.cart)
  }

  openModal(i:number):void{
    let array:Modal = new Modal().setItem(this.books,i);
    this.modalItem = array;
    this.modalVisibility = true;
  }

  closeModal():void{
    this.modalItem = {};
    this.modalVisibility = false;
  }



}



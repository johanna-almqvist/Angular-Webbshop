import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IOrder } from 'src/app/models/IOrder';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  orders: IOrder[] = [];

  isLoggedIn: boolean = false;
  logInForm = new FormGroup({
    userName: new FormControl(''),
    passWord: new FormControl(''),
  });

  private adminUserName: string = 'admin';
  private adminPassWord: string = 'admin';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.orders$.subscribe((ordersFromApi) => {
      this.orders = ordersFromApi;
      console.log('Det här är mina ordrar', this.orders);
    });
  }

  logInClick() {
    const userName: string = this.logInForm.get('userName')?.value;
    const password: string = this.logInForm.get('passWord')?.value;
    console.log(userName, password);

    this.logInAdmin(userName, password);
  }

  logOutClick() {
    this.isLoggedIn = false;
  }

  removeOrder(orderId: number) {
    this.adminService.deleteOrder(orderId);
  }

  private logInAdmin(userName: string, passWord: string) {
    if (userName === this.adminUserName && passWord === this.adminPassWord) {
      this.isLoggedIn = true;
      this.adminService.getOrders();
    }
  }
}

import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { MenuService } from 'src/app/services/shared/menu.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  token: any = localStorage.getItem('token');
  tokenPayload: any;
  menuItems: any;

  constructor(
    private menuService: MenuService
  ) {
    this.tokenPayload = jwt_decode(this.token)
    this.loadMenuItems()
  }

  loadMenuItems() {
      this.menuItems = this.menuService.getMenuItem().filter( item =>  item.role === "" || item.role ===  this.tokenPayload.role);
      console.log(this.menuItems)
  }

}

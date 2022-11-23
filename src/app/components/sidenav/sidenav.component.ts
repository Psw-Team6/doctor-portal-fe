import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarDataDoctor} from "./nav-data-doctor";
import {TokenStorageService} from "../../services/token-storage.service";
import {navbarData} from "./nav-data";
import {navDataManager} from "./nav-data-manager";
import {UserToken} from "../../model/UserToken";
import {navbarDataBank} from "./nav-data-bank";

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  screenWidth = 0;
  collapsed = false;
  navDataDoctor = navbarDataDoctor;
  navDataManager= navDataManager;
  navDataBank= navbarDataBank;
  navData = navbarData;
  userToken:UserToken;
  isLoggedIn:boolean = false;
  constructor(private tokenStorageService:TokenStorageService) {
    this.userToken = this.tokenStorageService.getUser()
    this.isLoggedIn = this.tokenStorageService.isLoggedIn()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <=2133){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
  }
  closeSidenav():void{
    console.log(this.collapsed)
    this.collapsed = false;
    console.log(this.collapsed)
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  openSidenav():void{
    if(this.collapsed == false){
      this.collapsed = true;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});

    }
  }


}

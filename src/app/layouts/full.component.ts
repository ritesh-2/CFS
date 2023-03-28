import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent implements AfterViewInit {

  @ViewChild(MatSidenav)
  sideNav!: MatSidenav;


  constructor(private observer: BreakpointObserver) { }


  ngAfterViewInit(): void {
    // added set timeout to resolve view init error
    setTimeout(() => {
      this.observer.observe(['(max-width : 880px)']).subscribe(res => {
        if (res.matches) {
          this.sideNav.mode = 'over';
          this.sideNav.close();
        }
        else{
          this.sideNav.mode = 'side';
          this.sideNav.open();
        }
      })
    }, 10);
  
  }


}

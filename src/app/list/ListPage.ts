import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public vetor = [];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor() {
  }


  ordenarVetor(){
    
  }

  ngOnInit() {
    
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}

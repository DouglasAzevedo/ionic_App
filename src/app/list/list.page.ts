import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public bolha = { i: 0, t: 0, c: 0 };
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor() {
  }

  // var vetorQuebrado = vetor.trim().split(',',';',' ');


  ordenarVetor(vetor){
    this.bolha.i = vetor.length -1;
    let tamanho = vetor.length-1;
    let tamanhoB = vetor.length-1;
    let temp1 = 0;
    let temp2 = 0;

    for(let i = 0;i < tamanho;i++){
      for(let x = 0;x < tamanhoB;x++){
          if(vetor[x] > vetor[x+1]){
            temp1 = vetor[x];
            temp2 = vetor[x+1];
            vetor[x] = temp2;
            vetor[x+1] = temp1;
            this.bolha.c++;
            this.bolha.t++;
          }else{
            this.bolha.c++;
          } 
      }
      tamanhoB--;
      console.table(vetor);
    }
  }

  ngOnInit() {
    
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}

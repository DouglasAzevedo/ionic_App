import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {


  public vetor = [];
  public verifica = /[A-Za-z]/;
  public bolha = { i: 0, t: 0, c: 0 };
  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(public alert: AlertController) {
  }
  // public alerta = this.alert.create({
  //   header: 'Alert',
  //   subHeader: 'Subtitle',
  //   message: 'This is an alert message.',
  //   buttons: ['Cancel', 'Open Modal', 'Delete']
  // });

   async verificaEntrada(vetor) {
    const alerta = await this.alert.create({
      header: 'ERRO PNC',
      message: 'Só números são permitidos!',
      buttons: ['Ok']
    });
    let valida = this.verifica.test(vetor);
    if (valida) {
      alerta.present();
      return
    }

  }

  parsePaNumero(vetor) {

    for(let i = 0; i < vetor.length; i++) {
      vetor[i] = parseInt(vetor[i]);
    }
    return vetor;
  }


  ordenarVetor(vetor) {
    let vetorQuebrado = vetor.trim().split((/[,;\s]+/));
    vetorQuebrado = this.parsePaNumero(vetorQuebrado);

    this.bolha.i = vetorQuebrado.length - 1;
    let tamanho = vetorQuebrado.length - 1;
    let tamanhoB = vetorQuebrado.length - 1;
    let temp1 = 0;
    let temp2 = 0;

    for (let i = 0; i < tamanho; i++) {
      for (let x = 0; x < tamanhoB; x++) {
        if (vetorQuebrado[x] > vetorQuebrado[x + 1]) {
          temp1 = vetorQuebrado[x];
          temp2 = vetorQuebrado[x + 1];
          vetorQuebrado[x] = temp2;
          vetorQuebrado[x + 1] = temp1;
          this.bolha.c++;
          this.bolha.t++;
        } else {
          this.bolha.c++;
        }
      }
      tamanhoB--;
      console.table(vetorQuebrado);
    }
  }

  ngOnInit() {
    console.log('Oninit');
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}

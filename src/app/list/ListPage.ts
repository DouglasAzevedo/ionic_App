import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { isArray } from 'util';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {


  public vetor = [];
  public verifica = /[A-Za-z]/;
  public bolha = { i: 0, t: 0, c: 0, vetor:[] };
  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(public alert: AlertController,public toastSucess: ToastController) {
  }
   async verificaEntrada(vetor) {
    const alerta = await this.alert.create({
      header: 'Atenção',
      message: 'Só números são permitidos!',
      buttons: ['Ok']
    });
    let valida = this.verifica.test(vetor);
    if (valida) {
      alerta.present();
      return
    }
  }
  async toast(){
    const toast = await this.toastSucess.create({
      message: 'Ação concluída!',
      duration: 2000
    });
    toast.present();
  } 
  parsePaNumero(vetor) {
    console.log(vetor)
    for(let i = 0; i < vetor.length; i++) {
      vetor[i] = parseFloat(vetor[i]);
    }
    console.log(vetor)
    return vetor;
  }
  
  zeraContagens() {
    this.bolha.i = 0;
    this.bolha.c = 0;
    this.bolha.t = 0;
    if(isArray(this.bolha.vetor)) {
      this.bolha.vetor.slice();
    }
  }

  ordenarVetor(vetor) {
    this.zeraContagens();
    let vetorQuebrado;
    console.log(vetor);
    if(vetor[0] || vetor.length > 0){
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
      }
      this.bolha.vetor = vetorQuebrado;
    } else {
      return;
    }
  }

  ngOnInit() {}
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}

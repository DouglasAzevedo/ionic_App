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
  public acoes = { i: 0, t: 0, c: 0, p: 0, vetor: [] };
  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(public alert: AlertController, public toastSucess: ToastController) { }

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

  async toast() {
    const toast = await this.toastSucess.create({
      message: 'Ação concluída!',
      duration: 2000
    });
    toast.present();
  }

  parsePaNumero(vetor) {
    console.log(vetor)
    for (let i = 0; i < vetor.length; i++) {
      vetor[i] = parseFloat(vetor[i]);
    }
    console.log(vetor)
    return vetor;
  }

  zeraContagens() {
    this.acoes.i = 0;
    this.acoes.c = 0;
    this.acoes.t = 0;
    if (isArray(this.acoes.vetor)) {
      this.acoes.vetor.slice();
    }
  }

  quebraVetor(vetor) {
    this.zeraContagens();
    if (vetor[0] || vetor.length > 0) {
      var vetorQuebrado = vetor.trim().split((/[,;\s]+/));
      vetorQuebrado = this.parsePaNumero(vetorQuebrado);
    }
    return vetorQuebrado;
  }

  bubbleSort(vetor) {
    let vetorQuebrado = this.quebraVetor(vetor);
    this.acoes.i = vetorQuebrado.length - 1;
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
          this.acoes.c++;
          this.acoes.t++;
        } else {
          this.acoes.c++;
        }
      }
      tamanhoB--;
    }
    this.acoes.vetor = vetorQuebrado;
  }

  insertionSort(vetor) {
    let vetorQuebrado = this.quebraVetor(vetor);
    var stop = true;
    var temp1 = 0;
    var temp2 = 0;
    for (let i = 1; i < vetor.length; i++) {
      if (vetor[i - 1] > vetor[i]) {
        stop = true;
        if (stop) {
          for (let x = i; 0 < x; x--) {
            if (vetor[x - 1] > vetor[x]) {
              temp1 = vetor[x];
              temp2 = vetor[x - 1];
              vetor[x] = temp2;
              vetor[x - 1] = temp1;
              this.acoes.t++;
              this.acoes.c++;
            } else {
              stop = false;
              this.acoes.c++;
            }
          }
        }
      }
    }
    this.acoes.vetor = vetorQuebrado;
  }

  selectionSort(vetor) {
    let vetorQuebrado = this.quebraVetor(vetor);
    var temp1 = 0;
    var cont = 0;
    var aux = 0;
    this.acoes.p = -1;
    for (let i = 0; i < vetor.length; i++) {
      temp1 = vetor[i];
      cont = 0;
      var trocas = false;
      for (let x = i + 1; x < vetor.length; x++) {
        if (vetor[x] < temp1) {
          temp1 = vetor[x];
          cont = x;
          trocas = true;
        }
        this.acoes.c++;
      };
      if (trocas) {
        aux = vetor[i];
        vetor[i] = vetor[cont];
        vetor[cont] = aux;
        this.acoes.t++;
      }
      this.acoes.p++;
    }
    this.acoes.vetor = vetorQuebrado;
  }

  quickSort(vetor) {
    let vetorQuebrado = this.quebraVetor(vetor);
    for (let x = 0; x < vetorQuebrado.length; x++) {
      for (let j = vetorQuebrado.length; j < 0; j--) {
        var pivo = j[vetorQuebrado.length];
        if(x <= pivo){
          this.acoes.c++
          x++;
          if(x > pivo) {
            this.acoes.c++
            continue;
          }
        }
        if(j > pivo){
          j--;
          this.acoes.c++
          if(j <= pivo){
            x = j;
            j = x;
            this.acoes.t++;
            this.acoes.c++;
          }
        }
        if(j > x){
          x = j;
          this.acoes.c++;
          this.acoes.t++;
        }
      }
    }
  }
  ngOnInit() { }
}

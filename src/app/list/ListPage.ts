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
  public acoes = { i: 0, t: 0, c: 0, vetor: [] };
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

  selectionSort(vetor) {
    let vetorQuebrado = this.quebraVetor(vetor);
    this.acoes.i = vetorQuebrado.length - 1;
    let tamanho = vetorQuebrado.length - 1;
    let tamanhoB = vetorQuebrado.length - 1;

    for (let i = 0; i < tamanho; i++) {
      for (let x = 0; x < tamanhoB; x++) {
        if (vetorQuebrado[i] > vetorQuebrado[i + 1]) {
          let temp = vetorQuebrado[x];
          let temp1 = vetorQuebrado[x + 1];
          vetorQuebrado[x] = temp;
          vetorQuebrado[x + 1] = temp1;
          this.acoes.c++;
          this.acoes.t++;
          i++;
        } else {
          i++;
        }
      }
    }
    console.log(vetorQuebrado);
  }

  ngOnInit() { }
}

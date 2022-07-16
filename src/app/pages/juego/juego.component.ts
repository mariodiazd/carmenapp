import { Component, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FeedItem } from 'src/app/models/feedItem';
import { Accion } from 'src/app/models/Accion';
import { Participante } from 'src/app/models/participante';
@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  feed:Array<FeedItem> = new Array<FeedItem>();
  participantes: Array<Participante> = new Array<Participante>();
  acciones:Array<Accion> = new Array<Accion>();
  muertos:Array<Participante> = new Array<Participante>();

  constructor() { }

  ngOnInit(): void {

    this.acciones = [
      new Accion("normal", "manda dar 5 vueltas sobre si mismo"),
      new Accion("quitarvida", "Dispara en la espalda y quita 1 vida a "),
      new Accion("normal", "Manda hacer 10 sentadillas a"),
      new Accion("matar", "Ha disparado 3 veces y matado a"),
      new Accion("matar", "Ha disparado 3 veces y matado a"),
      new Accion("res", "Da de beber para resucitar de entre los muertos a"),
      new Accion("quitarvida", "Dispara en el pecho y quita 1 vida a "),
    ]
    this.getParticipantes();
  }


  quitarVida(participante:Participante)
  {
    var index = this.participantes.indexOf(participante);
    if (index !== -1) {
    participante.vidas--
    if (participante.vidas <= 0)
    {
      this.muertos.push(participante);
      this.matarA(participante);
    }
  }
  }


  matarA(participante:Participante)
  {
    var index = this.participantes.indexOf(participante);
    if (index !== -1) {
    this.participantes.splice(index, 1);
  }
  }

  resucitarA(participante:Participante)
  {
    var index = this.muertos.indexOf(participante);
    if (index !== -1) {
    this.muertos.splice(index, 1);
  }
  }

  checkGanador(){
    if (this.participantes.length == 1)
    {
      alert(this.participantes[0].name + " ha ganado el juego");
    }
  }

  ramdomize():FeedItem
  {
    const ramdomIndex1 = Math.floor(Math.random() * this.participantes.length);
    const ramdomIndex3 = Math.floor(Math.random() * this.acciones.length);
    var ramdomAccion = this.acciones[ramdomIndex3];
    var ramdomPlayer2 = this.participantes[0];
    if (ramdomAccion.tipo == "res")
    {
      if (this.muertos.length > 0)
      {
        const ramdomIndex2 = Math.floor(Math.random() * this.muertos.length);
        ramdomPlayer2 = this.muertos[ramdomIndex2];
        ramdomAccion.descripcion = ramdomAccion.descripcion;
      } else
      {
        ramdomAccion.tipo = "normal";
        ramdomAccion.descripcion = "No estaba muerto pero intento resucitar a"
        const ramdomIndex2 = Math.floor(Math.random() * this.participantes.length);

        ramdomPlayer2 = new Participante("nadie","",false,"",0,3);
      }

    } else
    {
      const ramdomIndex2 = Math.floor(Math.random() * this.participantes.length);
      ramdomPlayer2 = this.participantes[ramdomIndex2];
    }

    var ramdomPlayer1 = this.participantes[ramdomIndex1];
    this.feed.forEach(element => {
      element.color = "white";
    });
    return new FeedItem(ramdomPlayer1, ramdomAccion, ramdomPlayer2, "lightblue");
  }

  async jugar(){
    var res = await this.addToFeed();
    if (res)
    {
      this.checkGanador();
    }

  }

  async addToFeed():Promise<boolean>
  {
   var feedItem = this.ramdomize();
   if (feedItem.player1 != feedItem.player2)
   {
    await this.feed.unshift(feedItem);
    if (feedItem.accion.tipo == "matar")
    {
      this.matarA(feedItem.player2);
      this.muertos.push(feedItem.player2);
      feedItem.player1.kills++
    } else if (feedItem.accion.tipo == "res")
    {
      feedItem.player2.vidas = 1;
      this.resucitarA(feedItem.player2);
      this.participantes.push(feedItem.player2);
    } else if (feedItem.accion.tipo == "quitarvida")
    {
      this.quitarVida(feedItem.player2)
    }

   } else
   {
     this.addToFeed();
   }
   return true;
  }

  async getParticipantes(){

    var participantes = await localStorage.getItem("participantes");
    if (participantes)
    {
      this.participantes = JSON.parse(participantes);
    }

  }

}

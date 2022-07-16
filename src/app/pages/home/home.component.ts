import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participante } from 'src/app/models/participante';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  add:boolean = false;
  participantes:Array<Participante> = [];
  participanteCustom: Participante = new Participante("","",false,"",0,3);
  participantesSelected:Array<Participante> = [];
  selectedParticipante:Participante | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.getParticipantes();
  }

  enableAdd()
  {
    this.add = true;
  }

  removeParticipante(index:number){

    this.participantesSelected.splice(index,1);
 }
 addParticipanteCustom()
 {
   if (this.participanteCustom)
   {
    this.participantes.push(this.participanteCustom);
    this.participanteCustom = new Participante("","perfil.jpg",false,"",0,3);
    this.add = false;
   }

 }


  getParticipantes(){
    this.participantes = [
      new Participante("Alex", "alex.jpg", false, "Las cañas son pequeñas, quiero barriles.",0,3),
      new Participante("Pablo Argos", "argos.jpg", false, '"No podemos ser tan malos, algún año tenemos que ganar,", volvió a perder.',0,3),
      new Participante("David Bermejo", "bermejo.jpg", false, "7 meses cuidándome para joderlo en un día.",0,3),
      new Participante("Carmen García", "carmen.jpg", false, "Lo mismo te hace un empaste, que te compra un bar.",0,3),
      new Participante("Eduardo Paredes", "edu.jpg", false, "Su aventura con los canguros no ha hecho olvidar su cara.",0,3),
      new Participante("Gelo Díaz", "gelo.jpg", false, "GOMA Y GOMA.",0,3),
      new Participante("Irene Castro", "ines.jpg", false, "En su botiquín no faltará B12 para sus compañeros.",0,3),
      new Participante("Isa García", "isa.jpg", false, "Cuidado con las cervezas, que tengo que conducir la silla.",0,3),
      new Participante("Julia Gutiérrez", "julia.jpg", false, "Si no escuchaís una risa desde Cortiguera, no hay duda, esoy yo.",0,3),
      new Participante("Mario Díaz", "mario.jpg", false, "El puto amo",0,3),
      new Participante("Marta García", "marta.jpg", false, "Lo mismo enseña a leer partituras, que se tala 17 calimochos un Martes.",0,3),
      new Participante("Merce Torrens", "merce.jpg", false,"Independentista",0,3),
      new Participante("Migui Arenal", "migui.jpg", false, "No bajaré ni subiré andando.",0,3),
      new Participante("Pablete Conde", "pablete.jpg", false, "El mexicano de moda",0,3),

    ]
  }

  addAll(){
    this.participantesSelected = new Array<Participante>();
    this.participantes.forEach(element => {
      this.participantesSelected.push(element)
    });
  }

  addParticipante(participante:Participante){
    console.log(participante);
   if (!this.participantesSelected.includes(participante))
   {
    this.participantesSelected.push(participante)
  }
  }

  goToGame()
  {
    localStorage.setItem("participantes", JSON.stringify(this.participantesSelected));
    this.router.navigateByUrl("juego")
  }



}

import { Accion } from "./Accion";
import { Participante } from "./participante";

export class FeedItem {
  constructor(
   public player1: Participante,
    public accion: Accion,
    public player2: Participante,
    public color:string
   ) {}
 }

import { CardFormComponent } from "./cards/cardFormComponent";
import CardGridDateNascimento from "./Grid/CardGridDateNascimento";
import { CardHeader } from "./cards/CardHeader";
import { CardRoot } from "./cards/CardRoot";
import CardGridCpf from "./Grid/CardGridCpf";
import CardGridName from "./Grid/CardGridName";
import CardGridRelacionamento from "./Grid/CardGridRelacionamento";
import CardGridTel1 from "./Grid/CardGridTel1";
import CardGridTel2 from "./Grid/CardGridTel2";



export const CardCreateUpdate = {
  Root: CardRoot,
  Headers: CardHeader,
  Form: CardFormComponent,
  GridCpf: CardGridCpf,
  GridName: CardGridName,
  GridDateNasc: CardGridDateNascimento,
  GridRelacionamento: CardGridRelacionamento,
  GridTel1: CardGridTel1,
  GridTel2: CardGridTel2,
};
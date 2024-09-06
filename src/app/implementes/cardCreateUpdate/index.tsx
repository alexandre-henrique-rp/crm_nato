import { CardFormComponent } from "./cardFormComponent";
import CardGridCpf from "./CardGridCpf";
import CardGridDateNascimento from "./CardGridDateNascimento";
import CardGridName from "./CardGridName";
import CardGridRelacionamento from "./CardGridRelacionamento";
import { CardHeader } from "./CardHeader";
import { CardRoot } from "./CardRoot";



export const CardCreateUpdate = {
  Root: CardRoot,
  Headers: CardHeader,
  Form: CardFormComponent,
  GridCpf: CardGridCpf,
  GridName: CardGridName,
  GridDateNasc: CardGridDateNascimento,
  GridRelacionamento: CardGridRelacionamento,
};
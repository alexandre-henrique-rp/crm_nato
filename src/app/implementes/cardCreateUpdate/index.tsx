import { CardFormComponent } from "./cards/cardFormComponent";
import CardGridDateNascimento from "./Grid/CardGridDateNascimento";
import { CardHeader } from "./cards/CardHeader";
import { CardRoot } from "./cards/CardRoot";
import CardGridCpf from "./Grid/CardGridCpf";
import CardGridName from "./Grid/CardGridName";
import CardGridRelacionamento from "./Grid/CardGridRelacionamento";
import CardGridRegisterTel from "./Grid/CardGridRegiterTel";
import CardGridTel from "./Grid/CardGridTel";
import CardGridRegisterEmail from "./Grid/CardGridEmail";
import CardGridConstrutora from "./Grid/CardGridConstrutora";
import CardGridEmpreedimentoCliente from "./Grid/CardGridEmpreedimentoCliente";
import CardGridFinanceiraCliente from "./Grid/CardGridFinanceiraCliente";
import CardGridUpdateCnh from "./Grid/CardGridUpdateCnh";



/**
 * @name CardCreateUpdate
 * @description Componente que renderiza o card de criação e atualização de um registro
 * @property {CardRoot} Root - Componente que renderiza o card de criação e atualização de um registro
 * @property {CardHeader} Headers - Componente que renderiza o cabeçalho do card de criação e atualização de um registro
 * @property {CardFormComponent} Form - Componente que renderiza o formulário do card de criação e atualização de um registro
 * @property {CardGridCpf} GridCpf - Componente que renderiza a grid de CPF do card de criação e atualização de um registro
 * @property {CardGridName} GridName - Componente que renderiza a grid de nome do card de criação e atualização de um registro
 * @property {CardGridDateNasc} GridDateNasc - Componente que renderiza a grid de data de nascimento do card de criação e atualização de um registro
 * @property {CardGridRelacionamento} GridRelacionamento - Componente que renderiza a grid de relacionamento do card de criação e atualização de um registro
 * @property {CardGridRegisterTel} GridRegiterTel - Componente que renderiza a grid de registro de telefone do card de criação e atualização de um registro
 * @property {CardGridTel} GridTel - Componente que renderiza a grid de telefone do card de criação e atualização de um registro
 */
export const CardCreateUpdate = {
  Root: CardRoot,
  Headers: CardHeader,
  Form: CardFormComponent,
  GridCpf: CardGridCpf,
  GridName: CardGridName,
  GridDateNasc: CardGridDateNascimento,
  GridRelacionamento: CardGridRelacionamento,
  GridRegisterTel: CardGridRegisterTel,
  GridTel: CardGridTel,
  GridEmail: CardGridRegisterEmail,
  GridConstrutora: CardGridConstrutora,
  GridEmpreedimentoCL: CardGridEmpreedimentoCliente,
  GridFinanceiraCl: CardGridFinanceiraCliente,
  GridUpdateCnh: CardGridUpdateCnh,
};
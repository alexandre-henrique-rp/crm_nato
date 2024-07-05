import 'next-auth';

declare module 'next-auth' {
  interface Session {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      cpf: string;
      construtora: any[];
      telefone: string;
      empreendimento: any[];
      hierarquia: string;
      cargo: string;
    }
  }
}
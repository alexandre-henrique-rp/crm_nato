import 'next-auth';

declare module 'next-auth' {
  interface Session {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      cpf: string;
      construtora: string[];
      telefone: string;
      empreendimento: string[];
      hierarquia: string;
      cargo: string;
    }
  }
}
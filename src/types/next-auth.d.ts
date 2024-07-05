import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      construtora: string;
      telefone: string;
      empreendimento: string;
      hierarquia: string
    }
  }
}
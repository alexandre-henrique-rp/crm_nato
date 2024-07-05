export const APP_ROUTES = {
  private: {
      assinantes: {
          name: "/assinantes/:path*",
      },
      enviar_documentos: {
          name: "/enviar-documentos/:path*",
      },
      verificador: {
          name: "/verificador/:path*",
      },
      root: {
          name: "/",
      },
  },
  public: {
      login: '/login',
      register: '/register',
      reset_password: '/reset-password',
      termos_uso: '/termos/uso',
  }
}
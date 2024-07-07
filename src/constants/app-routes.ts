export const APP_ROUTES = {
    private: {
      home:"/home/:path*",
      Notification:"/notification/:path*",
      perfil_adm:"/perfil-adm/:path*",
      perfil_client:"/perfil-client/:path*",
      redefinicao: "/redefinicao",
      solicitacao: "/solicitacoes/:path*",
    },
    public: {
        login: '/login',
        register: '/register',
        reset_password: '/reset-password',
        termos_uso: '/termos/uso',
    }
  }

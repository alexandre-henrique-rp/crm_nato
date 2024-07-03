export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const { username, password } = body;
    if (!username || !password) {
      return new Response("Missing fields", { status: 400 });
    }

    // console.log(body);
    // const user = await fetch(`http://localhost:3000/api/auth/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });

    // if (!user.ok) {
    //   return new Response("Invalid credentials", { status: 401 });
    // }

    // const data = await user.json();
    // return new Response(JSON.stringify(data), { status: 200 });

    const dados = [
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdHJpbmcxIiwidGVsZWZvbmUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsImNwZiI6InN0cmluZyIsIm5vbWUiOiJzdHJpbmciLCJlbXByZWVuZGltZW50byI6IltcIlZBTEUgRE8gU09MXCJdIiwiY29uc3RydXRvcmEiOiJbXCJNUlZcIixcIkJSSU9cIl0iLCJjYXJnbyI6bnVsbCwiaGllcmFycXVpYSI6IltcIlVTRVJcIl0iLCJjcmVhdGVkQXQiOiIyMDI0LTA2LTI5VDE1OjQ1OjU2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA2LTI5VDEyOjQ3OjA3LjAwMFoiLCJpYXQiOjE3MTk4NDI1MDYsImV4cCI6MTcxOTg1NjkwNn0.Thx-R4bOBfOeoEpzcY8ztZauwkeTDJD-mFNizfzBmFU",
        user: {
          id: 1,
          username: "matheus",
          password: "matheus",
          nome: "string",
          cpf: "string",
          telefone: "string",
          email: "string",
          construtora: ["MRV", "BRIO"],
          empreendimento: ["VALE DO SOL"],
          hierarquia: "USER",
          cargo: null,
          createdAt: "2024-06-29T15:45:56.000Z",
          updatedAt: "2024-06-29T12:47:07.000Z",
        },
      },
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdHJpbmcxIiwidGVsZWZvbmUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsImNwZiI6InN0cmluZyIsIm5vbWUiOiJzdHJpbmciLCJlbXByZWVuZGltZW50byI6IltcIlZBTEUgRE8gU09MXCJdIiwiY29uc3RydXRvcmEiOiJbXCJNUlZcIixcIkJSSU9cIl0iLCJjYXJnbyI6bnVsbCwiaGllcmFycXVpYSI6IltcIlVTRVJcIl0iLCJjcmVhdGVkQXQiOiIyMDI0LTA2LTI5VDE1OjQ1OjU2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA2LTI5VDEyOjQ3OjA3LjAwMFoiLCJpYXQiOjE3MTk4NDI1MDYsImV4cCI6MTcxOTg1NjkwNn0.Thx-R4bOBfOeoEpzcY8ztZauwkeTDJD-mFNizfzBmFU",
        user: {
          id: 1,
          username: "finance",
          password: "finance",
          nome: "string",
          cpf: "string",
          telefone: "string",
          email: "string",
          construtora: ["MRV", "BRIO"],
          empreendimento: ["VALE DO SOL"],
          hierarquia: "CONST",
          cargo: null,
          createdAt: "2024-06-29T15:45:56.000Z",
          updatedAt: "2024-06-29T12:47:07.000Z",
        },
      },
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdHJpbmcxIiwidGVsZWZvbmUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsImNwZiI6InN0cmluZyIsIm5vbWUiOiJzdHJpbmciLCJlbXByZWVuZGltZW50byI6IltcIlZBTEUgRE8gU09MXCJdIiwiY29uc3RydXRvcmEiOiJbXCJNUlZcIixcIkJSSU9cIl0iLCJjYXJnbyI6bnVsbCwiaGllcmFycXVpYSI6IltcIlVTRVJcIl0iLCJjcmVhdGVkQXQiOiIyMDI0LTA2LTI5VDE1OjQ1OjU2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA2LTI5VDEyOjQ3OjA3LjAwMFoiLCJpYXQiOjE3MTk4NDI1MDYsImV4cCI6MTcxOTg1NjkwNn0.Thx-R4bOBfOeoEpzcY8ztZauwkeTDJD-mFNizfzBmFU",
        user: {
          id: 1,
          username: "rbrp",
          password: "rbrp",
          nome: "string",
          cpf: "string",
          telefone: "string",
          email: "string",
          construtora: ["MRV", "BRIO"],
          empreendimento: ["VALE DO SOL"],
          hierarquia: "ADM",
          cargo: null,
          createdAt: "2024-06-29T15:45:56.000Z",
          updatedAt: "2024-06-29T12:47:07.000Z",
        },
      },
    ];

    const filtro = dados.filter((item) => {
      return item.user.username === username && item.user.password === password;
    });
    if (filtro.length > 0) {
      return new Response(JSON.stringify(filtro[0]), {
        status: 200,
      });
    }
    return new Response("Not Found", { status: 404 });

  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

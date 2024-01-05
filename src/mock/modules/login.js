import { users } from "../data";
export function login() {
  return {
    url: "login",
    methods: "POST",
    response: (opts) => { 
      const name = opts.data.account;
      if (
        users.find(
          (v) => v.name === name && v.password === opts.data.password
        )
      ) {
        return {
          //成功
          code: 200,
          msg: "",
          data: {
            token: name + "@eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cC",
            name,
          },
        };
      }
      return {
        //失败
        code: -1,
        msg: "用户名或密码不正确！",
      };
    },
  };
}

export function logout(){
  return {
    url: 'logout',
    methods: "get",
    response: {
      code: 200,
      msg: null,
      data: {}
    }
  }
}

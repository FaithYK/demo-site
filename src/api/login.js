import request from "@/request";

//登录
export const login = (data) => { 
    return request({
        url: 'login',
        methods:  'post',
        data
    })
}

//登出
export const logout = () => {
    return request({
        url: 'logout',
        methods: 'get'
    })
}

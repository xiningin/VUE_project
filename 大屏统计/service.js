import axios from 'axios'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus';
axios.defaults.headers['Content-Type'] = 'application/json'
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // baseURL: 'http://127.0.0.1:8082/',
    baseURL: 'https://api.survey.qugeek.com/',
    // 超时
    timeout: 10000
})
service.interceptors.request.use(config => {
    // 判断是否要带上身份token
    console.log(config)
    const requireLogin = (config.headers || {}).requireLogin == "true"
    if (requireLogin) {
        config.headers['Authorization'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZU1pbGxpcyI6IjE2NjgwNTI4OTk2NTAiLCJpZCI6MjEsImV4cCI6MTY2ODQxMjg5OX0.tC1mjsBVyfnBCTFcZJ75PC4wGWFpAsh8IuQBf2A8_GM";
        // if (localStorage.getItem("token") != null
        //     && localStorage.getItem("token") != undefined
        //     && localStorage.getItem("token").trim() != "") {
        //     config.headers = {}
        //     config.headers['Authorization'] = localStorage.getItem("token") // 让每个请求携带自定义token
        // } else {
        //     //要登录又没有token，那咋办
        //     //这里跳转到登录页
        //     ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        //         confirmButtonText: '重新登录',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }
        //     ).then(() => {
        //         //跳转到登录页
        //         localStorage.setItem('token',"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZU1pbGxpcyI6IjE2NjczMTI5MTMwNzQiLCJpZCI6MjEsImV4cCI6MTY2NzY3MjkxM30.CrGrLsOz5VJlX3SsyxHRlpxVT7OSvFbQcG7WSDXSD0w")
                
        //     }).catch(() => {
        //     });
        //     return Promise.reject(new Error("需要登录"));
        // }
    }
    //注意一定要return config
    return config
}, error => {
    console.log("interceptors前置拦截器出错:" + error)
    Promise.reject(error)
})
let isReloginShow = false;
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = res.data.msg || "";
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
        return res.data
    }
    console.log(res);
    if (res.headers != null && res.headers != undefined && res.headers.authorization != null && res.headers.authorization != undefined && res.headers.authorization.trim() != "") {
        console.log("存储新的token");
        localStorage.setItem("token", res.headers.authorization.trim());
    }
    //token过期
    if (code === 9001 || code === 9004 || code === 9005) {
        if (!isReloginShow) {
            isReloginShow = true;
            ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }
            ).then(() => {
                //直接登录
                localStorage.setItem('token',"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZU1pbGxpcyI6IjE2NjczMTI5MTMwNzQiLCJpZCI6MjEsImV4cCI6MTY2NzY3MjkxM30.CrGrLsOz5VJlX3SsyxHRlpxVT7OSvFbQcG7WSDXSD0w")
                isReloginShow = false;
                //跳转到登录页
            }).catch(() => {
                isReloginShow = false;
            });
        }
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500 || code === 400) {
        ElMessage({
            message: msg,
            type: 'error'
        })
        return Promise.reject(new Error(msg))
    } else {
        return Promise.resolve(res)
    }
},
    error => {
        console.log('err' + error)
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        }
        else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        }
        else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        ElMessage({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default {
    /**
     * @param {String} url 
     * @param {Object} data 
     * @returns Promise
     */
    send(url, data, requireLogin = true) {
        return new Promise((resolve, reject) => {
            service({
                method: 'post',
                url,
                data: (data),
                headers: {
                    requireLogin: requireLogin
                }
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    }
};
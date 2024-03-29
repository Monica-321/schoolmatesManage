import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'


const JSEncrypt = require('node-jsencrypt');
// const pubkey = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDWWIEMSz1t8sAe5djqgonx8X5S
// 77tl6Vf41o3apyItbYe+v9qQI4H2MRvj2pcZ4+shKeL0PadQ2v1SgQdVkuLXfjdg
// ok05zJt3EuSpgzGaOAGhHX4nV1rwxFlHPNsH9ZktvZGpUvvLTM+Gj2dvDEw+gP84
// kV1oPKFg02jv4ZWRqQIDAQAB
// -----END PUBLIC KEY-----`;

const {
  loginApi,
  logoutApi,
  getUserInfo,
} = api

interface content{
  username:string,
  password:string,
}

class UserStore{

  constructor(){
    makeObservable(this)
  }
  @observable userData:any={}
  @observable userName: string = localStorage.getItem('userName')||''
  // @action
  // handelLogin= async(params:any) => {
  //   // var encrypt = new JSEncrypt();
  //   // encrypt.setPublicKey(pubkey);
  //   // var encrypted = encrypt.encrypt(JSON.stringify(params));
  //   // console.log("登录时加密",encrypted);
  //   // const {success ,  msg , result } =await loginApi({content:encrypted})
  //   // return {success:success,msg:msg,result:result}
  //   return {success:true}
  // }
  @action
  handelLogin= async(params:any) => {
    let {status,success ,  msg , data} = await loginApi(params)
    if (success) {
      const {phone,email, username, identity, status,permissions} = data
      runInAction(()=>{
        this.userData=data
        localStorage.setItem("userName", username);
        this.userName = username
        console.log('用户数据：',this.userData,'用户名',this.userName)
      })
    } 
    return {success,msg};
  }

  fetchUserInfo=async(params:any) => {
    let {status,success ,  msg , data} = await getUserInfo(params)
    if (success) {
      runInAction(()=>{
        this.userData=data
      })
    } 
    return {success,msg};
  }

  @action
  handelLogout=async()=>{
    const {status, success ,  msg } =await logoutApi()
    if (success) {
      localStorage.clear()
      sessionStorage.clear()
    } 
    return {success:success,msg:msg}
  }
}

export {UserStore}
export default new UserStore();
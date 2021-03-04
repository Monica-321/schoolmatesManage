import { observable, action , makeObservable, runInAction } from 'mobx'
import api from '@/api'


const JSEncrypt = require('node-jsencrypt');
const pubkey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDWWIEMSz1t8sAe5djqgonx8X5S
77tl6Vf41o3apyItbYe+v9qQI4H2MRvj2pcZ4+shKeL0PadQ2v1SgQdVkuLXfjdg
ok05zJt3EuSpgzGaOAGhHX4nV1rwxFlHPNsH9ZktvZGpUvvLTM+Gj2dvDEw+gP84
kV1oPKFg02jv4ZWRqQIDAQAB
-----END PUBLIC KEY-----`;

const {
  loginApi,
  logoutApi,
  registerApi,
  modifyInfoApi,
} = api

interface content{
  username:string,
  password:string,
}

class UserStore{

  constructor(){
    makeObservable(this)
  }

  @action
  handelLogin= async(params:any) => {
    // var encrypt = new JSEncrypt();
    // encrypt.setPublicKey(pubkey);
    // var encrypted = encrypt.encrypt(JSON.stringify(params));
    // console.log("登录时加密",encrypted);
    // const {success ,  msg , result } =await loginApi({content:encrypted})
    // return {success:success,msg:msg,result:result}
    return {success:true}
  }

  @action
  handelRegister= async(params:any) => {
    // var encrypt = new JSEncrypt();
    // encrypt.setPublicKey(pubkey);
    // var encrypted = encrypt.encrypt(JSON.stringify(params));
    // console.log("注册时加密",encrypted);
    // const {success ,  msg } =await registerApi({content:encrypted})
    // return {success:success,msg:msg}
    return {success:true}
  }

  //修改个人信息
  @action
  modifyUserInfo= async(params:any) => {
    // const {success ,  msg , result} =await modifyInfoApi(params)
    // return {success:success,msg:msg,result:result}
    return {success:true}
  }

  @action
  handelLogout=async()=>{
    // const {success ,  msg } =await logoutApi()
    // return {success:success,msg:msg}
    return {success:true}
  }
}

export {UserStore}
export default new UserStore();
import {  tokenTableName } from "@/config/settings";


export function getToken() {
  return  localStorage.getItem(tokenTableName);
}

export function setToken(token) {
  return  localStorage.setItem(tokenTableName, token); //设置token

}

export function removeToken() {
  return localStorage.removeItem(tokenTableName);
}

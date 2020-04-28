import {  tokenName } from "@/config/settings";


export function getToken() {
  return  localStorage.getItem(tokenName);
}

export function setToken(token) {
  return  localStorage.setItem(tokenName, token); //设置token

}

export function removeToken() {
  return localStorage.removeItem(tokenName);
}

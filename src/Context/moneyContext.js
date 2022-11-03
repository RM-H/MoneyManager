import {createContext} from "react";
export const MoneyContext= createContext({
    loading:()=>{} ,
    minus:()=>{},
    balance:0,
    setbalance:()=>{},
    Logger:()=>{},
    Logs:'',
    setLogs: ()=>{},
    increaseBalance:()=>{},
    order:"",
    setorder: ()=>{},
    fdate:"",




});
import axios from "axios";

const SSA = "http://localhost:9000";

export const getLogs = () => {
    const url = `${SSA}/logs` ;
    return axios.get(url)

};

export const setLogs = (log) => {
    const url = `${SSA}/logs` ;
    return axios.post(url,log)


};

export const getBalance = () => {
    const url = `${SSA}/balance` ;
    return axios.get(url)

};

export const setBalance = (val) => {
    const url =`${SSA}/balance` ;
    return axios.put(url,val)


};
export const getGroups = () => {
    const url = `${SSA}/groups` ;
    return axios.get(url)

};

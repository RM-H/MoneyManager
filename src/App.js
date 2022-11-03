
import './App.css';
import {useState , } from "react";
import {ToastContainer,toast} from "react-toastify";

import {MoneyContext} from "./Context/moneyContext";

import Navbar from "./Components/Navbar";

import Logs from "./Components/Logs";
import Balance from "./Components/balance";
import {setBalance,setLogs} from "./SS/SS";



function App() {
    const [Loading,setLoading]=useState()
    const [balance,setbalance]=useState(0)
    const [log,setlog]=useState([])
    const [orderedlog,setorderedlog]=useState([])
    
    
    const logger = async (val) => {

        const {data,status}=await  setLogs(val)

        if (status===201){

            setlog([...log,data]);


        }


      
    }

    const decrease = async (num) => {

        const tot=Number(balance)-Number(num.price)


        const {data,status} = await setBalance( {"ball":tot}) ;
        if (status===200) {

           setbalance(data.ball)
            toast.info("ثبت شد" , {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            await logger(num)
        }



    }


    const Increase = async (val) => {
        try {
            const tot =  Number(balance) + Number(val.value)
            const {data,status}= await setBalance({"ball": tot})
            if (status===200) {
                setbalance(data.ball)
                toast.success("شد" , {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

                await logger(val)
            }

        } catch (err) {

        }




    }
    const fadate = new Date().toLocaleDateString("fa-IR")





    return (
        <MoneyContext.Provider value={
            {
                loading:setLoading,
                minus:decrease,
                balance:balance,
                setbalance:setbalance,
                Logger:logger,
                 Logs: log,
                setLogs:setlog,
                increaseBalance:Increase,
                order: orderedlog,
                setorder:setorderedlog,
                fdate: fadate,

            }
        }>





        <div className="App ">



                <ToastContainer/>
                <Navbar  />
                <Balance />


                <Logs />


            </div>
        </MoneyContext.Provider>




















    );
}

export default App;

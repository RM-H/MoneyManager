import {useState,useContext,useEffect} from "react";
import {getLogs} from "./../SS/SS"
import {MoneyContext} from "../Context/moneyContext";
import _ from "lodash"





const Logs = () => {
    const {setLogs,Logs,setorder,order}=useContext(MoneyContext)


    useEffect(()=>{
        const getlogs= async ()=>{
            const {data:logdata}= await getLogs()
            setLogs(logdata);

        }

        getlogs()




    },[])

    useEffect(()=>{
        const testing = _.orderBy(Logs,["id"],["desc"])
        setorder(testing)


    },[Logs])
















    return (

        <div className="row justify-content-center   ">
            <div className="col-10 position-fixed bottom-0 ">
                <div className="accordion  mit fs-5" id="accordionExample">
                    <div className="accordion-item ">
                        <h2 className="accordion-header " id="headingOne">
                            <button className="accordion-button fs-3 fw-bold" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                تاریخچه حساب
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body overflow-scroll" style={{maxHeight:"14rem"}}>

                                <ul className="list-group text-start ">
                                    {
                                        order.map((l)=>{

                                            if (l.desc){
                                                const pl = l.price.toLocaleString()

                                                return (
                                                    <li className={`list-group-item text-${l.clr}`} key={l.id}>{` مبلغ ${pl} برای ${l.desc} `}
                                                        <span className="badge rounded-pill text-bg-danger float-end">{`${l.group}`}</span>
                                                        <span className="mx-5 px-3  rounded-pill  border border-dark  float-end text-black">{l.date}</span>



                                                    </li>

                                                )



                                            } else {


                                                return (
                                                    <li className="list-group-item text-success" key={l.id}>{`   افزایش مبلغ ${l.value.toLocaleString()} تومان  `}
                                                        <span className="badge rounded-pill text-bg-success float-end">افزایش موجودی</span>
                                                        <span className="mx-5 px-3  rounded-pill  border border-dark  float-end text-black">{l.date}</span>

                                                    </li>

                                                )
                                            }


                                        })
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </div>














        </div>



    )

}

export default Logs ;
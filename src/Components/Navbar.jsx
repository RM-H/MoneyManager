import {FcMoneyTransfer} from "react-icons/fc"
import {  toast } from 'react-toastify';

import {getBalance} from "../SS/SS"
import {useContext, useEffect} from "react"
import {Formik, Field, Form} from 'formik';


import {MoneyContext} from "../Context/moneyContext";


const Navbar = () => {

    const {balance, setbalance,increaseBalance,fdate} = useContext(MoneyContext)


    useEffect(() => {
        const getbalance = async () => {
            try {
                const {data: money , status} = await getBalance()
                if (status===200) {
                    toast("اتصال برقرار شد",{
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    setbalance(money.ball)


                }
            } catch (err) {
                toast.warn('🦄 اوه شت!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }







        }
        getbalance()


    }, [setbalance])




    return (
        <nav className="navbar  clrthree  ">
            <div className="row w-100  mit">
                <div className="col-2">

                    <div className="container-fluid text-start  ">
                        <a className="navbar-brand fs-4 ">
                            <FcMoneyTransfer className="fs-3"/>
                            <span className=" ms-2 h2 fw-bold  ">

                          مدیریت پول
                      </span>

                        </a>


                    </div>

                </div>

                <div className="col-10 text-center text-end">


                    <span className="fw-bold  fs-5">
                        موجودی
                    </span>

                    <button className="btn btn-dark rounded-pill mx-2 fs-5 fw-bold  " data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                        {balance.toLocaleString()} تومان

                    </button>
                    <span className="float-end fs-5 px-3 py-1 rounded-pill my-auto border border-dark   ">
                        {fdate}
                    </span>
                    {/*MODAL*/}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">افزایش موجودی</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"/>
                                </div>
                                <div className="modal-body">

                                    <Formik initialValues={
                                        {
                                            value: 0,
                                            date:fdate,
                                        }

                                    }
                                            onSubmit={(values,{resetForm,} )=>{

                                                increaseBalance(values)




                                                    resetForm()

                                            }  }
                                    >


                                        <Form className="mb-3">

                                            <label className="form-label fs-5" htmlFor="value">مقدار افزایشی برای موجودی را وارد کنید</label>
                                            <Field  className="form-control" id="value" type="number" name="value" placeholder="مقدار را وارد کنید" >

                                            </Field>

                                            <button type="submit" data-bs-dismiss="modal"  className="btn btn-success">اضاف بنما</button>


                                        </Form>

                                    </Formik>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">بستن
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>


        </nav>


    );

};

export default Navbar;
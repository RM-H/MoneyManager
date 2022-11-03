import {getGroups, setBalance} from "../SS/SS";
import {useState, useEffect,useContext} from "react"
import {Formik, Field, Form, ErrorMessage} from 'formik';
import _ from "lodash"
import {formschema} from "../formschema";

import {MoneyContext} from "../Context/moneyContext";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Balance = () => {
    const {balance,minus,Logs,fdate}=useContext(MoneyContext)


    const [group, setgroup] = useState([]);
    const [chart,setchart]=useState([])



    useEffect(() => {
        const idk = async () => {
            const {data: groups} = await getGroups()
            setgroup(groups)

        }
        idk();

    }, []);



    useEffect( ()=>{
        const test = () => {
            const a=_.filter(Logs,{"group":"خوراک"})
            const adone= _.sumBy(a,"price")

            const b=_.filter(Logs,{"group":"حمل و نقل"})
            const bdone= _.sumBy(b,"price")

            const c=_.filter(Logs,{"group":"بدهی"})
            const cdone= _.sumBy(c,"price")

            const d=_.filter(Logs,{"group":"درمان"})
            const dddone= _.sumBy(d,"price")

            const e=_.filter(Logs,{"group":"تفریح"})
            const edone= _.sumBy(e,"price")

            const f=_.filter(Logs,{"group":"سایر"})
            const fdone= _.sumBy(f,"price")

            const tot= []
            tot.push(
                {
                    "group":"خوراک" , "price":adone
                },
                {
                    "group":"حمل و نقل" , "price":bdone
                },
                {
                    "group":"بدهی" , "price":cdone
                },
                {
                    "group":"درمان" , "price":dddone
                },
                {
                    "group":"تفریح" , "price":edone
                },
                {
                    "group":"سایر" , "price":fdone
                },
            )

            setchart(tot)






        }
        test()





    },[Logs])






    return (
        <div className="container-fluid">


        <div className="row  mit justify-content-around   " >

        <div className="col col-sm-6  rounded-4 text-start p-4 mt-5 clrone ">
            <h2 className="fw-bold text-center">
                اضافه کردن هزینه
            </h2>

            <p id="err" className="d-none">
                نمیشه که قیمت بیشتر از موجودیت باشه گوسفند !
            </p>

            <Formik
                initialValues={{
                    price: 0,
                    desc: '',
                    group: '',
                    date:fdate,
                    clr:"danger"

                }}
                validationSchema={formschema}
                onSubmit={(values,{resetForm})=>{
                    const tot= Number(balance)-parseInt(values.price)
                    if (tot<0  ) {
                        document.getElementById("err").className="text-danger text-center"

                    } else {

                        minus(values);
                        document.getElementById("err").className="d-none"

                        resetForm()







                    }




                }}
            >
                <Form className=" mb-3 text-center ">
                    <label className="form-label fs-5 fw-bold float-start  " htmlFor="price">قیمت</label>
                    <Field  className="form-control" id="price" type="number" name="price" placeholder="سامتینگ" >






                    </Field>
                    <ErrorMessage name="price" render={msg => <div>{msg}</div>} />


                    <label className="form-label fs-5 fw-bold float-start "  htmlFor="desc">توضیح </label>
                    <Field   className="form-control" id="desc" name="desc" placeholder="نام آیتم" >


                    </Field>

                    <ErrorMessage name="desc" render={msg => <div>{msg}</div>} />

                    <label className="form-label fs-5 fw-bold float-start "  htmlFor="group">دسته</label>
                    <Field className="form-control"


                        id="group"
                        name="group"
                        placeholder="jane@acme.com"
                        as="select"
                    >
                        <option defaultValue="">Open this select menu</option>
                        {
                            group.map((g)=>{
                                return (
                                    <option key={g.id} >{g.name}</option>
                                )
                            })
                        }
                    </Field>
                    <ErrorMessage name="group" render={msg => <div>{msg}</div>} />
                    <button className="btn btn-outline-light mt-4 fs-5 " type="submit" id="clr" name="clr" value="danger">ارسال</button>
                </Form>
            </Formik>




        </div>


            <div className="col col-sm-4 bg-body  p-3 mt-5 rounded-4  ">







                    <ResponsiveContainer  width="100%" height="100%">

                        <BarChart
                            width={500}
                            height={300}
                            data={chart}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="group" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            <Bar dataKey="price" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>




            </div>


    </div>
        </div>
)

}
export default Balance;





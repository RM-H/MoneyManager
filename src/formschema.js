import * as Yup from "yup"

export const formschema = Yup.object().shape({
    price:Yup.number().moreThan(0,"صفر که نمیشه !").required("مورد نیاز"),
    desc:Yup.string().required("مورد نیاز").min(2,"نام آیتم باید حداقل 2 حرف داشته باشد"),
    group:Yup.mixed().oneOf(["خوراک" ,"حمل و نقل" , "بدهی " , "درمان" , "تفریح" , "سایر"],"یکی را انتخاب کنید"),


}

)
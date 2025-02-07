import dayjs from "dayjs"
export const genereteDate=(
    month=dayjs().month(),
    year=dayjs().year()
)=>{
    const fistDtaeofMonth=dayjs().year(year).month(month).startOf("month")
    const lastDtaeofMonth=dayjs().year(year).month(month).endOf("month")


const arrayofdate=[]

// prefix date
for(let i=0; i<=fistDtaeofMonth.day();i++){
    arrayofdate.push({
        currentmonth:false,
        date:fistDtaeofMonth.day(i)})
}

// generet current date
for(let i=fistDtaeofMonth.date(); i<=lastDtaeofMonth.date(); i++){
    arrayofdate.push({currentmonth:true,date:fistDtaeofMonth.date(i),
    today:fistDtaeofMonth.date(i).toDate().toDateString()===dayjs().toDate().toDateString()
    })
}
const reamingdate=42-arrayofdate.length
for(let i=lastDtaeofMonth.date()+1;
 i<=lastDtaeofMonth.date()+reamingdate;i++){
    arrayofdate.push({currentmonth:false,date:fistDtaeofMonth.date(i)})
}
    return arrayofdate
}
export const months = [
    "January",
    "February",
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
];

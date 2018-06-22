
export module RandomUtil {
    const _MONTHS =["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    export function generateRandomString(length: number) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    export function pickFromList(list: string[]){
        var x = Math.floor(Math.random() * 10000.00)
        var pos = x % list.length
        return list[pos]
    }
    export function generateRandomUUID(pattern: number[]) {
        var text = "";
        pattern.forEach((len)=>{
            if(text.length==0){
                text=generateRandomString(len);
            }else
            {
                text=text+"-"+generateRandomString(len);
            }
        })
        return text;
    }
    
    export function generateRandomDateString(days: number) {
        let today=new Date();
        let output=new Date(today.getTime()+days*8640000*Math.random());
        let outpuString = output.getFullYear()+"/"+output.getMonth()+"/"+output.getDay();
        return outpuString;
    }
    export function getToday() {
        let today=new Date();
        return formatDate(today,"dd-MMM-yyyy");
    }
    export function formatDate(date:Date,format){
        var outputString =date.toISOString();
        if(format == 'dd-MMM-yyyy'){
            outputString = (date.getDate())+"-"+_MONTHS[date.getMonth()]+"-"+ date.getFullYear();
        }
        return outputString;
    }
}
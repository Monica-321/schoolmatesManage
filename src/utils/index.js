//格林威治时间转换
export const GMTToStr=(time)=>{
    var now = new Date(time);
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var date= now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second= now.getSeconds();
    if(mon<10){
        mon = '0'+mon;
    }
    if(date<10){
        date = '0'+date;
    }
    if(hour<10){
        hour = '0'+hour;
    }
    if(minute<10){
        minute = '0'+minute;
    }
    if(second<10){
        second = '0'+second;
    }
    var Str = year+'/'+mon+'/'+date+' '+hour+':'+minute+':'+second;
    return Str;
}
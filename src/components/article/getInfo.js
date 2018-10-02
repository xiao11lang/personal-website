export function timeStr(time){
    let times=time.split('-')
    return times[0]+'年'+times[1]+'月'
}
export function getInfo(summarys){
    let original=0;
    let reprint=0;
    let readCount=0;
    let thumpUp=0;
    let typeList={};
    let timeList={};
    summarys.forEach(function(summary){
        if(summary.isOriginal){
            original++
        }else{
            reprint++
        }
        if(typeList[summary.type]){
            typeList[summary.type]++
        }else{
            typeList[summary.type]=1
        }
        if(timeList[timeStr(summary.writeTime)]){
            timeList[timeStr(summary.writeTime)]++
        }else{
            timeList[timeStr(summary.writeTime)]=1
        }
        readCount+=parseInt(summary.readCount);
        thumpUp+=parseInt(summary.thumpUp)
    })
    return {
        original,readCount,reprint,thumpUp,typeList,timeList
    }
}
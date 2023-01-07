
function percent(total,percent){
    return (percent*100)/total;
}

function assist(event){
    if(event.hasOwnProperty("assistance")){
        return event.assistance
    }
    return event.estimate
}

//Evento con mayor capacidad
function largerCapacityTd(){
    let eventLgCap=data["events"].sort((event1,event2)=>event2.capacity-event1.capacity)[0]
    return `${eventLgCap.name} ${eventLgCap.capacity}`
}
//Evento con menor porcentaje de asistencia
function lowerPercentAttendanceTd(){
    let eventlwPerAtt=data["events"]
    .sort((e1,e2)=>percent(e1.capacity,assist(e1))-percent(e2.capacity,assist(e2)))[0]
    return `${eventlwPerAtt.name} %${percent(eventlwPerAtt.capacity, assist(eventlwPerAtt)).toFixed(2)}`
}
//Evento con mayor porcentaje de asistencia
function higherPercentAttendanceTd(){
    let eventhgPerAtt=data["events"]
    .sort((e1,e2)=>percent(e2.capacity,assist(e2))-percent(e1.capacity,assist(e1)))[0]
    return `${eventhgPerAtt.name} %${percent(eventhgPerAtt.capacity, assist(eventhgPerAtt)).toFixed(2)}`
}

function addRowTemplate(item1,item2,item3){
    return `<tr>
                <td>${item1}</td>
                <td>${item2}</td>
                <td>${item3}</td>
            </tr>`
}
//LLena la tabla general
function fillGeneralTable(){
    let generalStatsTable = document.getElementById("generalStats")
    generalStatsTable.innerHTML+=addRowTemplate(
    higherPercentAttendanceTd(),
    lowerPercentAttendanceTd(),
    largerCapacityTd()
    )
}


//---------------FILL TABLES----------------
fillGeneralTable()

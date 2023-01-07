
function percent(total,percent){
    return (percent*100)/total;
}

function audience(event){
    if(event.hasOwnProperty("assistance")){
        return event.assistance
    }
    return event.estimate
}

function largerCapacityTd(){
    let eventLgCap=data["events"].sort((e1,e2)=>e2.capacity-e1.capacity)[0]
    return `${eventLgCap.name} ${eventLgCap.capacity}`
}

function lowerPercentAttendanceTd(){
    let eventlwPerAtt=data["events"]
    .sort((e1,e2)=>percent(e1.capacity,audience(e1))-percent(e2.capacity,audience(e2)))[0]
    return `${eventlwPerAtt.name} %${percent(eventlwPerAtt.capacity, audience(eventlwPerAtt)).toFixed(2)}`
}

function higherPercentAttendanceTd(){
    let eventhgPerAtt=data["events"]
    .sort((e1,e2)=>percent(e2.capacity,audience(e2))-percent(e1.capacity,audience(e1)))[0]
    return `${eventhgPerAtt.name} %${percent(eventhgPerAtt.capacity, audience(eventhgPerAtt)).toFixed(2)}`
}

function addRowTemplate(item1,item2,item3){
    return `<tr>
                <td>${item1}</td>
                <td>${item2}</td>
                <td>${item3}</td>
            </tr>`
}

function fillGeneralTable(){
    let generalStatsTable = document.getElementById("generalStats")
    generalStatsTable.innerHTML+=addRowTemplate(
    higherPercentAttendanceTd(),
    lowerPercentAttendanceTd(),
    largerCapacityTd()
    )
}

function timeEvents(id){
    switch(id){
        case "upcommingStats":
            return data["events"].filter(e=>e.hasOwnProperty("estimate"))
        case "pastStats":
            return data["events"].filter(e=>e.hasOwnProperty("assistance"))
    }  
}

function accumulator(events,categoryObject){
    events.forEach(e => {
        categoryObject.revenue+=e.price*audience(e)
        categoryObject.capacity+=e.capacity
        categoryObject.persons+=audience(e)
    });
    return categoryObject
}

function fillCategoryTable(tbodyContainer){
    let filteredEvents = timeEvents(tbodyContainer.id)
    let setCategory= new Set(filteredEvents.map(e=>e.category))
    let categoryObject={"category":"","revenue":0,"capacity":0,"persons":0}
    for(let cat of setCategory){
        let eventsByCategory = filteredEvents.filter(e=>e.category===cat)
        categoryObject.category=cat
        categoryObject=accumulator(eventsByCategory,categoryObject)
        tbodyContainer.innerHTML+=addRowTemplate(
            categoryObject.category,
            categoryObject.revenue,
            `% ${percent(categoryObject.capacity, categoryObject.persons).toFixed(2)}`
            )
        categoryObject={"category":"","revenue":0,"capacity":0,"persons":""}
    }
}


//---------------FILL TABLES----------------
let upcommingTbodyContainer = document.getElementById("upcommingStats")
let pastTbodyContainer = document.getElementById("pastStats")
fillGeneralTable()
fillCategoryTable(upcommingTbodyContainer)
fillCategoryTable(pastTbodyContainer)
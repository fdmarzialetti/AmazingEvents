//------------------AUX FUNCTIONS---------------
function percent(total,percent){
    return (percent*100)/total;
}

function typeAudiance(event){
    if(event.hasOwnProperty("assistance")){
        return event.assistance
    }
    return event.estimate
}

function typeEvents(id){
    switch(id){
        case "upcommingStats":
            return data["events"].filter(e=>e.hasOwnProperty("estimate"))
        case "pastStats":
            return data["events"].filter(e=>e.hasOwnProperty("assistance"))
    }  
}

function addRowTemplate(item1,item2,item3){
    return `<tr>
                <td>${item1}</td>
                <td>${item2}</td>
                <td>${item3}</td>
            </tr>`
}

//-------------GENERAL TABLE FUNCTIONS----------
function largerCapacityTd(){
    let eventLgCap=data["events"].sort((e1,e2)=>e2.capacity-e1.capacity)[0]
    return `${eventLgCap.name} ${eventLgCap.capacity}`
}

function lowerPercentAttendanceTd(){
    let eventlwPerAtt=data["events"]
    .sort((e1,e2)=>percent(e1.capacity,typeAudiance(e1))-percent(e2.capacity,typeAudiance(e2)))[0]
    return `${eventlwPerAtt.name} ${percent(eventlwPerAtt.capacity, typeAudiance(eventlwPerAtt)).toFixed(2)}%`
}

function higherPercentAttendanceTd(){
    let eventhgPerAtt=data["events"]
    .sort((e1,e2)=>percent(e2.capacity,typeAudiance(e2))-percent(e1.capacity,typeAudiance(e1)))[0]
    return `${eventhgPerAtt.name} ${percent(eventhgPerAtt.capacity, typeAudiance(eventhgPerAtt)).toFixed(2)}%`
}

function fillGeneralTable(){
    let generalStatsTable = document.getElementById("generalStats")
    generalStatsTable.innerHTML+=addRowTemplate(
    higherPercentAttendanceTd(),
    lowerPercentAttendanceTd(),
    largerCapacityTd()
    )
}

//------PAST AND UPCOMMING TABLES FUNCTIONS--------
function accumulator(events,categoryObject){
    events.forEach(e => {
        categoryObject.revenue+=e.price*typeAudiance(e)
        categoryObject.capacity+=e.capacity
        categoryObject.persons+=typeAudiance(e)
    });
    return categoryObject
}

function fillCategoryTable(tbodyContainer){
    let filteredEvents = typeEvents(tbodyContainer.id)
    let setCategory= new Set(filteredEvents.map(e=>e.category).sort())
    let categoryObject={"category":"","revenue":0,"capacity":0,"persons":0}
    for(let cat of setCategory){
        let eventsByCategory = filteredEvents.filter(e=>e.category===cat)
        categoryObject.category=cat
        categoryObject=accumulator(eventsByCategory,categoryObject)
        tbodyContainer.innerHTML+=addRowTemplate(
            categoryObject.category,
            categoryObject.revenue,
            `${percent(categoryObject.capacity, categoryObject.persons).toFixed(2)}%`
            )
        categoryObject={"category":"","revenue":0,"capacity":0,"persons":0}
    }
}

//---------------FILL TABLES----------------
let upcommingTbodyContainer = document.getElementById("upcommingStats")
let pastTbodyContainer = document.getElementById("pastStats")
fillGeneralTable()
fillCategoryTable(upcommingTbodyContainer)
fillCategoryTable(pastTbodyContainer)
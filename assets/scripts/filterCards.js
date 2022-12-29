let checkboxes = document.querySelectorAll(".btn-check");
let arrCheckNames
let arrEventsFilter

//addEventListener a cada checkbox 
checkboxes.forEach(chk=>{
    chk.addEventListener("change", e => {
        //Cada vez que un checkbox cambie, completa un arreglo con los nombres de los checked.
        arrCheckNames = Array.from(checkboxes).filter(c=>c.checked).map(n=>n.name)
        //Filtra las cartas que compartan categoria con el arreglo de nombres.
        arrEventsFilter = events["events"].filter(event=>arrCheckNames.includes(event["category"]))
        let cardsContainer = document.getElementById("cards-container");
        console.log(arrEventsFilter)
        //Crea el template.
        if(arrEventsFilter.length === 0){
            //Si no hay ningun filtro en check muestra todo.
            cardsContainer.innerHTML=createTemplate(events['events']);
        }  else{
            cardsContainer.innerHTML=createTemplate(arrEventsFilter); 
        }
        console.log(arrEventsFilter)
    })
})







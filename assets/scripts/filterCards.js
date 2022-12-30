let checkboxes = document.querySelectorAll(".btn-check");
let arrCheckNames
let arrEventsFilter

//addEventListener a cada checkbox 
checkboxes.forEach(chk=>{
    chk.addEventListener("change", e => {
        //Cuando un checkbox cambie de estado, completa un arreglo con los nombres de los chechbox checkeds.
        arrCheckNames = Array.from(checkboxes).filter(c=>c.checked).map(c=>c.name)
        //Filtra las cartas que compartan categoria con el arreglo de nombres.
        arrEventsFilter = data["events"].filter(e=>arrCheckNames.includes(e["category"]))
        let cardsContainer = document.getElementById("cards-container");
        //Crea el template.
        if(arrEventsFilter.length === 0){
            //Si no hay ningun filtro en check muestra todo.
            cardsContainer.innerHTML=createTemplate(events['events']);
        }  else{
            cardsContainer.innerHTML=createTemplate(arrEventsFilter); 
        }
    })
})







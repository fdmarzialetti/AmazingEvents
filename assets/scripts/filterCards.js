let checkboxes = document.querySelectorAll(".btn-check");

//addEventListener a cada checkbox. 
checkboxes.forEach(chk=>{
    chk.addEventListener("change", e => {
        let arrCategories
        let arrFilteredEvents
        let cardsContainer = document.getElementById("cards-container");
        //Cuando un checkbox cambie de estado, completa un arreglo con los nombres de los checkbox checked.
        arrCategories = Array.from(checkboxes).filter(c=>c.checked).map(c=>c.name)
        //Filtra las cartas que compartan categoria con el arreglo de categorias.
        arrFilteredEvents = data["events"].filter(event=>arrCategories.includes(event["category"]))
        //Crea el template.
        if(arrFilteredEvents.length === 0){
            //Si no hay ningun checkbox checked muestra todos los eventos.
            cardsContainer.innerHTML=createTemplate(data['events']);
        }  else{
            cardsContainer.innerHTML=createTemplate(arrFilteredEvents); 
        }
    })
})







let checkboxes = document.querySelectorAll(".btn-check");

//addEventListener a cada checkbox. 
checkboxes.forEach(chk=>{
    chk.addEventListener("change", function(){
        let arrCategories
        let cardsContainer = document.getElementById("cards-container");
        //Cuando un checkbox cambie de estado, completa un arreglo con los nombres de los checkbox checked.
        arrCategories = Array.from(checkboxes).filter(chk=>chk.checked).map(chk=>chk.name)
        if(arrCategories.length === 0){
            //Si no hay ningun checkbox checked muestra todos los eventos.
            cardsContainer.innerHTML=createTemplate(data['events']);
        }  else{
            //Filtra las cartas que compartan categoria con el arreglo de categorias.
            //Crea el template.
            let arrFilteredEvents
            arrFilteredEvents = data["events"].filter(event=>arrCategories.includes(event["category"]))
            cardsContainer.innerHTML=createTemplate(arrFilteredEvents); 
        }
    })
})







//Filtra todos los eventos por categoria
function filterByCheckbox(){
    let arrCategories = document.querySelectorAll("input[type=checkbox]:checked")
    arrCategories = Array.from(arrCategories).map(chk=>chk.name)
    if(arrCategories.length === 0){
        //Si no hay ningun checkbox checked retorna todos los eventos.
        return data['events'];
    }  else{
        //Sino..
        //Filtra las cartas que compartan categoria con el arreglo de categorias.
        let filteredEvents=[]
        filteredEvents = data["events"].filter(event=>arrCategories.includes(event["category"]))
        return filteredEvents; 
    }
}
//Filtra los eventos ya filtrados, ahora por search.
function filterBySearch(events){
    //Toma el value del input search.
    let searchValue = document.getElementById("searchBar").value;
    //Si el value no es vacio.
    if(searchValue!==""){
        //Filtra los eventos que compartan nombre con el value.
        events=events.filter(e=>e.name.toLowerCase().includes(searchValue.toLowerCase()))
    }
    return events
}
//Aplica las filtros de checkbox y search.
function applyFilter(){
    //Aplica el filtro de checkbox y al resultado, el filtro search.
    let filterCards=filterBySearch(filterByCheckbox());
    //Muestra las cartas filtradas.
    showCards(filterCards);
}
//Agrega un checkbox al template de checkboxes.
function addCheckboxTemplate(chk){
    return `<input type="checkbox" class="btn-check" id="${chk}" name="${chk}">
    <label class="btn btn-outline-danger checkboxSize rounded-2" for="${chk}">${chk}</label>`
}
//Crea el template de chekboxes.
function createTemplateCheckbox(categories){
    let template=""
    for(let c of categories){
        template+=addCheckboxTemplate(c);
    }
    return template;
}
//Inserta los checkboxes en el html.
function showCheckbox(){
    //Crea un arreglo de categorias unicas mediante el objeto Set.
    let arrCategories=new Set(data["events"].map(e=>e.category))
    let checkboxsContainer=document.getElementsByClassName("btn-group")[0];
    //Inserto los checkboxs en el contenedor correspondiente. 
    checkboxsContainer.innerHTML=createTemplateCheckbox(arrCategories)
}

//Renderiza los checkbox
showCheckbox()
//Agrega escuchador de eventos al searchbar y al grupo de checkboxes.
document.getElementById("searchBar").addEventListener("input", applyFilter);
document.getElementById("checkboxGroup").addEventListener("change",applyFilter);












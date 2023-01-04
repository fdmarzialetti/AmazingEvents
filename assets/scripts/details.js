// traemos la url en forma de string
let paramUrl= location.search
// creamos un objeto que tiene las keys:value
let idCard= new URLSearchParams(paramUrl).get("id");

function showDetails(){
    //Busco la carta correspondiente por id
    let card = data["events"].filter(e=>e._id===idCard)[0];

    return `<div class="col col-lg-10">
                <div class="card card-detail">
                    <img src="${card.image} " alt="${card.name} image">
                    <div class="card-body d-flex flex-column align-items-center justify-content-between">
                        <h5 class="card-title w-100 text-center">${card.name}</h5>                        
                        <p class="card-text h-100  mb-0">${card.description}</p>
                        <div class="card-body-data w-100">
                            <p class="fw-bold text-center text-decoration-underline">Details</p>
                            <p>Date: ${card.date}</p> 
                            <p>Category: ${card.category}</p> 
                            <p>Place: ${card.place}</p> 
                            <p>Capacity: ${card.capacity}</p> 
                            <p>Assistance: ${card.assistance}</p> 
                        </div>
                        <div class=" card-bottom d-flex justify-content-between align-items-center w-100">
                            <p class="fw-bold text-align-center m-0">Pirce $${card.price}</p>
                            <a href="./index.html" class="btn btn-danger">Back</a>
                        </div>
                    </div>
                </div>
            </div> `
}

document.getElementById("detailsContainer").innerHTML=showDetails();


let cardsContainer = document.getElementById("cards-container"); 

function createTemplate(events){
    let template=``;
    for (let e of events['events']){
            template+= ` <div class="col col-md-6 col-lg-3">
                    <div class="card">
                        <img src="${e.image}" alt="${e.name} image">
                        <div class="card-body d-flex flex-column align-items-center justify-content-between">
                            <h5 class="card-title w-100 text-center">${e.name}</h5>
                            <p class="card-text h-100">${e.description}</p>
                            <div class=" card-bottom d-flex justify-content-between align-items-center w-100">
                                <p class="fw-bold text-align-center">Price $${e.price}</p>
                                <a href="./details.html" class="btn btn-danger">View more</a>
                            </div>
                        </div>
                    </div>
                </div>`
    }
    return template;
}

cardsContainer.innerHTML=createTemplate(events);





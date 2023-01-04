function addCardTemplate(card){
    return `<div class="col col-md-6 col-lg-3">
                <div class="card">
                    <img src="${card.image}" alt="${card.name} image">
                    <div class="card-body d-flex flex-column align-items-center justify-content-between">
                        <h5 class="card-title w-100 text-center">${card.name}</h5>
                        <p class="card-text h-100">${card.description}</p>
                        <div class=" card-bottom d-flex justify-content-between align-items-center w-100">
                            <p class="m-0 fw-bold text-align-center">Price $${card.price}</p>
                            <a href="./details.html?id=${card._id}" class="btn btn-danger">View more</a>
                        </div>
                    </div>
                </div>
            </div>`
}

function createTemplateCards(events){
    let currentDate = data['currentDate'];
    let pageName=document.getElementsByTagName('h1')[0].innerHTML;
    let template="";
    switch(pageName){
        case "Home":{
            for(let e of events){
                template+=addCardTemplate(e);
            }
            return template;
        }
        case "Past Events":{
            for(let e of events){
                if(e.date < currentDate){
                    template+=addCardTemplate(e);
                }
            }
            return template;
        }
        case "Upcomming Events":{
            for(let e of events){
                if(e.date >= currentDate){
                    template+=addCardTemplate(e);
                }
            }
            return template;
        }
    }
}

function showCards(events){
    let cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML=createTemplateCards(events);
}

showCards(data["events"])


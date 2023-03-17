
async function init() {
    // Récupère toutes les datas des photographes dans le fichier json
    const { photographers } = await getPhotographers();
    //console.log(getPhotographers())
    // renvoi uniquement les datas de photographers à la fonction displayData
    displayData(photographers);
    //console.log(photographers)
};


async function displayData(photographers) {
    //Selectionne les éléments ayant la class .photographer_section
    const photographersSection = document.querySelector(".photographer_section");
    //console.log(photographersSection)
    //Pour chaque item dans photographers que l'on appel arbitrairement photographer
    //On a la fonction de dessous qui pour chaque photographer dans la variable let=photographers
    photographers.forEach((photographer) => {
        //console.log(photographers)
        // stocke dans photographerModel
        // le retour de photographerFactory(photographer) cad le nom, la photo et l'article de getUserCardDOM
        const photographerModel = photographerFactory(photographer);
        //console.log(photographerModel)
        const userCardDOM = photographerModel.getUserCardDOM();
        console.log(userCardDOM)
        photographersSection.appendChild(userCardDOM);

    });
};

async function getPhotographers() {
    return fetch('http://localhost:5500/data/photographers.json')

        .then(function (data) {
            return data.json();

        })
        .catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message)
        })

}

init();


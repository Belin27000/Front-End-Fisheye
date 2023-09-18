
async function init() {
    // Récupère toutes les datas des photographes dans le fichier json
    const { photographers } = await getPhotographers();
    //console.log(getPhotographers())
    // renvoi uniquement les datas de photographers à la fonction displayData
    displayData(photographers);
    //console.log(photographers)
}


async function displayData(photographers) {
    //Selectionne les éléments ayant la class .photographer_section
    const photographersSection = document.querySelector(".photographer_section");
    //console.log(photographersSection)
    //Pour chaque item dans photographers que l'on appel arbitrairement photographer
    //On a la fonction de dessous qui pour chaque photographer dans la variable let=photographers
    photographers.forEach((photographer) => {
        // stocke dans photographerModel
        // le retour de photographerFactory(photographer) cad le nom, la photo et l'article de getUserCardDOM
        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);

    });
}

async function getPhotographers() {
    return fetch('./data/photographers.json')

        .then(function (data) {
            return data.json();

        })
        .catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message)
        })

}

init();


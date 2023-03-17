//Mettre le code JavaScript lié à la page photographer.html
async function init() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    const { photographers, media } = await getMedia();

    const photographer = photographers.find(photographer => photographer.id == id)
    const medias = media.filter(medias => medias.photographerId == id)

    displayPhotographer(photographer, medias)
}

async function getMedia() {
    return fetch('http://localhost:5500/data/photographers.json')
        .then(function (data) {
            return data.json();

        })
        .catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message)
        })

}

async function displayPhotographer(photographer, medias) {

    const photographersSection = document.querySelector(".photograph-header");
    //utilise les paramètre du photographe selectionné
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUser();
    photographersSection.appendChild(userCardDOM);

    const filter = document.createElement("div");
    filter.setAttribute("id", "filter_section")
    photographersSection.appendChild(filter);
    filter.insertAdjacentHTML(
        "beforeend",
        `
            <label class="label" for="select">Trier par</label>
            <div class="select__container">
                <div id="select__container-icon">
                    <img src="/assets/icons/dropdown.png" alt="icône flèche permettant de déplier le filtre dropdown" tabindex="0"/>
                </div>
                <button id="filter" type="button" role="button" aria-haspopup="listbox" tabindex="0" aria-expanded="false">Veuillez selectionner</button>
                <div id="dropdown__menu">
                <ul id="dropdown__menu_hidden">
                    <li class="dropdown__options" tabindex="0" role="listbox" activedescendant="Popularité">Popularité</li>
                    <li class="dropdown__options" tabindex="0" role="listbox" activedescendant="Date">Date</li>
                    <li class="dropdown__options" tabindex="0" role="listbox" activedescendant="Titre">Titre</li>
                </ul>
                </div>
            </div>
        `
    )

    // Initialisation des variables pour créer le DOM des médias.
    const section = document.createElement("section");
    const mediaSection = photographersSection.appendChild(section);
    mediaSection.classList.add("mediaCard")

    const displayPhotographerMedia = (medias) => {


        for (let i = 0; i < medias.length; i++) {
            if (medias[i].image) { // Si le média contient une image.
                let imageMedia = new ImageMedia(medias[i]) // Création d'une nouvelle instance de la classe ImageMedia.
                let article = imageMedia.createMedia(); // Appel de la fonction createMedia de la classe ImageMedia.

                mediaSection.appendChild(article);

            } else { // Si le média contient une vidéo.
                let videoMedia = new VideoMedia(medias[i]) // Création d'une nouvelle instance de la classe VideoMedia.
                let article = videoMedia.createMedia();// Appel de la fonction createMedia de la classe VideoMedia.

                mediaSection.appendChild(article);
            }
        }


    }

    displayPhotographerMedia(medias); // Appel de la fonction displayMedias.

    // Ajout de l'évènement au clique sur le bouton contact pour display la modale de contact.
    const buttonContact = document.querySelector('.contact_button');

    buttonContact.addEventListener('click', () => {
        console.log(photographer);
        displayModal(photographer)
    })

    const dropDown = document.querySelector('.select__container');

    dropDown.addEventListener('click', () => {
        // console.log("on est là");
        filterDrop()
    })


};
init()
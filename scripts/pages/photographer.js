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


    /***********************construction du dropdown***********************/

    const filter = document.createElement("div");
    filter.setAttribute("id", "filter_section")
    photographersSection.appendChild(filter);
    filter.insertAdjacentHTML(
        "beforeend",
        `
            <label class="label" for="select">Trier par</label>
            <div class="select__container" >
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


    // Initialisation de la variable pour ajouter le nombre de like total de la page du photographe
    const photographLike = document.querySelector("#totalLikes")


    /***********************Gestion des médias du photographe***********************/

    const displayPhotographerMedia = (medias) => {


        const mediaSection = photographersSection.appendChild(section);
        let allLike = []//initialise le tableau de comptage des likes total.

        for (let i = 0; i < medias.length; i++) {

            //additionne les likes reçu par le photographe
            allLike.push(medias[i].likes)
            // console.log(allLike);

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
        let totalLikes = photographerModel.CalculLikes();
        document.getElementById("totalLikes").innerHTML = totalLikes;
    }

    displayPhotographerMedia(medias); // Appel de la fonction displayMedias.


    /***********************Gestion des likes sur les médias***********************/

    // Initialisation de la variable pour ajouter un like au media du photograph
    const likeMedia = document.querySelectorAll('.likesNumber')
    const heartMedia = document.querySelectorAll(".heart")
    console.log(likeMedia);
    console.log(heartMedia.length);

    // console.log(heartMedia);
    // console.log(newHeartMedia);

    let likeMediaNb = [];//initialise le tableau de like

    for (let i = 0; i < heartMedia.length; i++) {//Parcours chaque like et le gère

        let intlikeMedia = parseInt(likeMedia[i].textContent);//converti en entier chaque nb de like
        likeMediaNb.push(intlikeMedia)

        const newHeartMedia = Array.from(likeMediaNb)//crée une copie du tableau des likes

        heartMedia[i].addEventListener('click', () => {//Écoute le click sur un like des média

            /**
             * Vérifie si le média a déjà été liké sinon ajoute un like au media
             * et ajoute un like au total et le retire si on reclique dessus
             */
            if (likeMediaNb[i] == newHeartMedia[i]) {
                newHeartMedia[i] = (newHeartMedia[i] + 1);
                likeMedia[i].innerHTML = newHeartMedia[i]
                let totalLikes = photographerModel.CalculLikes();
                document.getElementById("totalLikes").innerHTML = totalLikes;
            } else {
                newHeartMedia[i] = (newHeartMedia[i] - 1);
                likeMedia[i].innerHTML = newHeartMedia[i]
                let totalLikes = photographerModel.CalculLikes();
                document.getElementById("totalLikes").innerHTML = totalLikes;
            }
        })

    }

    /***********************Gestion de la modal contact***********************/

    // Ajout de l'évènement au clique sur le bouton contact pour display la modale de contact.
    const buttonContact = document.querySelector('.contact_button');


    buttonContact.addEventListener('click', () => {
        const modal = document.getElementById("contact_modal");
        const checkModalOpen = modal.style.display;
        console.log(checkModalOpen);
        if (checkModalOpen == 'block') {

        } else {
            //ajoute le nom de l'artiste à la modal
            artistName = photographer.name;
            const modalTitle = document.querySelector('.modal h2');

            const checkTitle = modalTitle.textContent.indexOf(artistName)//Empêche l'ajout du nom de l'artiste si celui-ci est déjà présent
            if (checkTitle == -1) {
                modalTitle.innerHTML = modalTitle.innerHTML + " " + artistName
            }

            const formdiv = document.querySelector('form div')
            formdiv.classList.add("firstname")
            // console.log(formdiv);

            //ajoute les champs du formulaire de contact
            const fieldModal = document.createElement("div");
            formdiv.appendChild(fieldModal);
            fieldModal.insertAdjacentHTML(
                "afterend",
                `
            <div class="lastname">
            <label>Nom</label>
            <input />
            </div>
            <div class="email">
            <label>Email</label>
            <input />
            </div>
            <div class="message">
            <label>Votre message</label>
            <textarea id=message></textarea>
            </div>
            `
            )
        }

        displayModal(photographer)

    })

    /***********************Gestion de la Lightbox***********************/

    const allMedia = document.querySelectorAll('.mediaCard article')
    console.log(allMedia);

    for (let i = 0; i < allMedia.length; i++) {

        /**
         * Gestion des cliques sur les medias sans prise en compte des cliques sur les like ou titres
         */
        const pictureList = allMedia[i].querySelector('.mediaPicture')
        const videoList = allMedia[i].querySelector('.video')
        if (pictureList) {
            console.log(pictureList);
            selectedMedia = pictureList
        } else {

            console.log(videoList);
            selectedMedia = videoList
        }

        selectedMedia.addEventListener('click', () => {
            // const modal = document.getElementById("contact_modal");
            // const checkModalOpen = modal.style.display;

            // console.log(checkModalOpen);
            const lboxModal = document.querySelector('.modal')
            lboxModal.setAttribute("id", "medias_modal")
            const mediaModal = document.getElementById('contact_modal')
            mediaModal.classList.add('mediaModal')

            // lboxModal.classList.add('mediaModal')
            // lboxModal.classList.add('active')

            const cleanModalTitle = document.querySelector('.modal header')
            const cleanModalForm = document.querySelector('.modal form')
            cleanModalTitle.classList.add('mediaModal')
            cleanModalForm.classList.add('mediaModal')


            const createModal = document.createElement('section')
            createModal.classList.add('modal_childrens')

            mediaModal.appendChild(createModal)
            createModal.insertAdjacentHTML(
                "beforeend",
                `
                        <div class="active">
                            <a href="#" tabindex="0" class="previous-button></a>
                            <a href="#" tabindex="0" class="next-button></a>
                        </div>
                `
            )


            // const closeBtn = document.querySelector('.modal img')
            // closeBtn.classList.add('close-button')
            displayModal(photographer)
            // lboxModal.classList.remove('modal')
        })

    }


    /***********************Gestion du Dropdown***********************/

    //Affichage de notre liste déroulante au click dessus
    const dropDown = document.querySelector('.select__container');
    dropDown.addEventListener('click', () => {
        filterDrop(dropDown) //Appel la fonction d'affichage de notre liste déroulante
        // console.log(medias);
        // console.log(medias);
        const btn = document.getElementById('filter').textContent
        /**
         * Fonction de trie en fonction du filtre selectionné
        */
        if (btn == 'Date') {
            medias.sort((a, b) => a.date < b.date ? -1 : 1);//trier par date croissante/décroissante des photo
            console.log("c'est la date");

        } else if (btn == 'Popularité') {
            console.log("c'est la popularité");
            medias.sort((a, b) => a.likes - b.likes)
        } else if (btn == 'Titre') {
            console.log("c'est la titre");
            medias.sort((a, b) => a.title > b.title ? -1 : 1);//trier par ordre alphabetique des titres
        } else {

        }
        mediaSection.innerHTML = '';
        displayPhotographerMedia(medias)

    })




};
init()
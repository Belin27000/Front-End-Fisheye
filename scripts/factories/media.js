/**
    * La classe Medias représente la structure de base pour tous les types de médias.
    * @class
*/
class Medias {
    /** 
        * Utilisation d'un constructor pour la création d'un nouveau média.
        * @constructor
        * @param {Object} data - Object contenant les informations du média.
        * @param {string} data.title - Le titre du média.
        * @param {number} data.likes - Le nombre de likes du média.
        * @param {number} data.id - l'ID unique du média.
    */
    constructor(data) {
        const { id, likes, title } = data;

        this.title = title;
        this.likes = likes;
        this.id = id;
    }

    createMedia() {
        const article = document.createElement('article');
        article.insertAdjacentHTML(
            "beforeend",
            `
                <div class ="descriptionPicture">
                    <p tabindex="0">${this.title}</p>
                    <div class="likes"><p class=likesNumber tabindex="0">${this.likes}</p><img tabindex="0" class="heart" src="assets/icons/Heart.png" alt="icône coeur permettant de liker un média"/></div>
                </div>
            `
        )
        return (article);

    }
}

/**
    * La classe ImageMedia représente la structure d'un média particulier de type image et bénéficie de la structure de base de la class Médias par extension.
    * @class
    * @extends Medias
*/
// eslint-disable-next-line no-unused-vars
class ImageMedia extends Medias {

    constructor(data) {
        super(data)
        this.id = data.id
        this.image = "assets/Photos/" + data.image
    }

    createMedia() {
        const article = super.createMedia()
        article.insertAdjacentHTML(
            "afterbegin",
            `
                <img src="${this.image}" class="mediaPicture" alt="${this.title}" tabindex="0"/>
            `
        )

        let imageModal = article.querySelectorAll('.mediaPicture')
        imageModal.forEach(element => {
            // eslint-disable-next-line no-undef
            element.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une image permettant l'ouverture de la modale carroussel.
            element.addEventListener('keydown', (e) => { // Ajout d'un évènement à l'appuie du la touche "entrée" d'une image permettant l'ouverture de la modale carroussel.
                if (e.key === 'Enter') {
                    // eslint-disable-next-line no-undef
                    openMediasModal(this.id)
                }
            })
        })

        return (article);
    }

    createMediaModal() {
        const article = document.createElement('div')
        article.setAttribute('id', 'mediaModal_' + this.id)
        article.setAttribute('class', 'mediaModal')
        article.insertAdjacentHTML(
            "beforeend",
            `
                <img src="${this.image}" class="mediaPicture" alt="${this.title}" tabindex="0"/>
                <p>${this.title}</p> 
            `
        )

        return (article)
    }

}

/**
    * La classe VideoMedia représente la structure d'un média particulier de type vidéo et bénéficie de la structure de base de la class Médias par extension.
    * @class
    * @extends Medias
*/
// eslint-disable-next-line no-unused-vars
class VideoMedia extends Medias {

    constructor(data) {
        super(data)
        this.id = data.id
        this.video = "assets/Photos/" + data.video
    }

    createMedia() {
        const article = super.createMedia()
        article.insertAdjacentHTML(
            "afterbegin",
            `
            <video width="350" height="300" controls alt="${this.title}" class="video" tabindex="0"><source src="${this.video}" type=video/mp4></video>
            `
        )

        let imageModal = article.querySelectorAll('.video')
        imageModal.forEach(element => {
            // eslint-disable-next-line no-undef
            element.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une vidéo permettant l'ouverture de la modale carroussel.
            element.addEventListener('keydown', (e) => { // Ajout d'un évènement à l'appuie du la touche "entrée" d'une vidéo permettant l'ouverture de la modale carroussel.
                if (e.key === 'Enter') {
                    // eslint-disable-next-line no-undef
                    openMediasModal(this.id)
                }
            })
        })

        return (article);
    }

    createMediaModal() {
        const article = document.createElement('div')
        article.setAttribute('id', 'mediaModal_' + this.id)
        article.setAttribute('class', 'mediaModal')
        article.insertAdjacentHTML(
            "beforeend",
            `
            <video width="350" height="300" class="video" alt="${this.title}" tabindex="0" controls auto>
            <source src="${this.video}" type=video/mp4>
            </video>
            <p>${this.title}</p> 
            `
        )

        return (article)
    }

}
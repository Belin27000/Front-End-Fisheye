// function mediaFactory(data) {
//     //console.log(data);
//     //console.log(mediaStyle);
//     const { image, title, likes, video } = data
//     console.log(data);
//     // console.log(title);
//     // console.log(image);

//     const picture = `assets/Photos/${image}`;
//     const getVideo = `assets/Photos/${video}`;
//     console.log(getVideo);
//     // console.log(picture);
//     // console.log(likes);

//     let mediaStyle = data.hasOwnProperty('video')
//     console.log(mediaStyle);
//     function getMediaCardDOM() {
//         const article = document.createElement('article');
//         //  console.log(mediaStyle)
//         console.log(mediaStyle);
//         if (mediaStyle) {
//             article.insertAdjacentHTML(
//                 "afterbegin",
//                 `

//                 <img src="${picture}" alt="Titre de la photo:${title}">
//                 <div class="legend">
//                 <p class="tagline" aria-label="Le titre de la photo est ${title}.">${title}</p>
//                 <p class="likes" aria-label="Le nombre de like sur cette photo est de ${likes}.">${likes}<i class="fas fa-heart"></i></p>
//                 </div>
//                 `
//             )
//             return (article);

//         } else {

//             console.log(video);
//             article.insertAdjacentHTML(
//                 "afterbegin",
//                 `
//                 <video width="350" height="300" alt="${this.title}" class="video" tabindex="0">
//                 <source src="${video}" type=video/mp4>
//                 </video>
//                             <div class="legend">
//                             <p class="tagline" aria-label="Le titre de la photo est ${title}.">${title}</p>
//                             <p class="likes" aria-label="Le nombre de like sur cette photo est de ${likes}.">${likes}<i class="fas fa-heart"></i></p>
//                             </div>
//                     `
//             )
//         }

//     }



//     return { getMediaCardDOM }
//     //console.log(data);


// }


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
        const { date, id, likes, photographerId, price, title } = data;
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
                    <div class="likes"><p tabindex="0">${this.likes}</p><img tabindex="0" class="heart" src="assets/icons/Heart.png" alt="icône coeur permettant de liker un média"/></div>
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
        // console.log(article)
        return (article);
    }

}

/**
    * La classe VideoMedia représente la structure d'un média particulier de type vidéo et bénéficie de la structure de base de la class Médias par extension.
    * @class
    * @extends Medias
*/
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

        return (article);
    }

}
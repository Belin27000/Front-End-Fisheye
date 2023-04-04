//Fonction de traitement des information du photographe
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
    //Met en forme les données passées en paramètre dans photographerFactory(photographer);
    //qui se trouve dans : const photographerModel = photographerFactory(photographer);
    const { name, id, portrait, city, country, tagline, price } = data;

    //Tu crées une variable qui stock la photo reçu via data
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.insertAdjacentHTML(
            "beforeend",
            `
                <a href="./photographer.html?id=${id}" tabindex="0">
                    <img class="userPicture" src="${picture}" alt="Photo de profil de ${name}">
                    <h2>${name}</h2>
                </a>
                <h3>${city}, ${country}</h3>
                <p class="tagline">${tagline}</p>
                <p class="price" aria-label="Le coût de prestation de ${name} est de ${price}€ par jour.">${price}€/jour</p>
            `
        );

        return (article);

    }

    function getUser() {
        const photographerCard = document.createElement('section');

        photographerCard.classList.add("photographerCard")
        photographerCard.insertAdjacentHTML(
            "beforeend",
            `
                <div class="informations">
                    <h1 tabindex="0">${name}</h1>
                    <h2 tabindex="0">${city}, ${country}</h2>
                    <p class="tagline" tabindex="0">${tagline}</p>
                </div>  
                <button class="contact_button">Contactez-moi</button>
                <img  src="${picture}" alt="${name}" class="userPicture" tabindex="0">
                <div class="dayPrice">
                <div class="likes"><p tabindex="0" id="totalLikes">X</p><img class="heart2" src="assets/icons/Heart2.png" alt="icône coeur symbolisant le total de like du photographe" tabindex="0"/></div>
                <p tabindex="0">${price}€/jour</p>
                </div>
            `
        )
        return (photographerCard)
    }

    function CalculLikes() {
        let totalLikes = 0;
        let allLikes = document.getElementsByClassName('likes');

        for (let i = 1; i < allLikes.length; i++) {
            totalLikes += parseInt(allLikes[i].textContent);
        }

        return totalLikes;
    }

    return { name, picture, getUserCardDOM, getUser, CalculLikes }
}

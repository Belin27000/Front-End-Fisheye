// eslint-disable-next-line no-unused-vars
function initMediasModal(medias) {

    const modal = document.getElementById("medias_modal");
    modal.style.display = "none";

    // Création du HTML de la modale.
    const modalHtml = `
    <div class="modal_childrens">
        <div class="modal-content">
            <div id="left-side">
                <span class="previous-button"></span>
            </div>
            <div id="carousel"></div>
            <div id="right-side">
                <span class="close-button"></span>
                <span class="next-button"></span>
            </div>
        </div>
    </div>
    `

    modal.innerHTML = modalHtml;

    // Création des différents selecteurs pour viser la modale et ses différents boutons, close, previous et next.
    let closeButton = document.querySelector('.close-button');
    let previousButton = document.querySelector('.previous-button');
    let nextButton = document.querySelector('.next-button');
    let carousel = document.getElementById("carousel");

    for (let i = 0; i < medias.length; i++) {
        if (medias[i].image) {
            // eslint-disable-next-line no-undef
            let imageMedia = new ImageMedia(medias[i])
            let article = imageMedia.createMediaModal();

            carousel.appendChild(article);

        } else {

            // eslint-disable-next-line no-undef
            let videoMedia = new VideoMedia(medias[i])
            let article = videoMedia.createMediaModal();

            carousel.appendChild(article);
        }
    }

    // Ajout d'un évènement au clique sur le bouton close, permettant d'ajouter du style à la modal pour ne plus l'afficher.
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Ajout d'un évènement au clique sur sur le bouton 'previous', permettant de retirer au média affiché la classe 'active', et d'attribuer au média précédent la classe 'active'.
    previousButton.addEventListener("click", function () {
        let m = modal.querySelector('.mediaModal.active')
        m.classList.remove('active')

        if (m.previousElementSibling) {
            m.previousElementSibling.classList.add('active')
        } else {
            modal.querySelector('.mediaModal:last-child').classList.add('active')
        }
    });

    // Ajout d'un évènement au clique sur sur le bouton 'previous', permettant de retirer au média affiché la classe 'active', et d'attribuer au média suivant la classe 'active'.
    nextButton.addEventListener("click", function () {
        let m = modal.querySelector('.mediaModal.active')
        m.classList.remove('active')

        if (m.nextElementSibling) {
            m.nextElementSibling.classList.add('active')
        } else {
            modal.querySelector('.mediaModal:first-child').classList.add('active')
        }
    });

    // Ajout d'un évènement sur la page qui permets d'utiliser les évènements au clique grâce au clavier.
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            previousButton.click();
        } else if (e.key === "ArrowRight") {
            nextButton.click();
        } else if (e.key === "Escape") {
            closeButton.click();
        }
    });

    return modal;
}

// eslint-disable-next-line no-unused-vars
function openMediasModal(id) {

    console.log(id);
    const modal = document.getElementById("medias_modal");
    const img = document.getElementById('mediaModal_' + id); // On récupère le média qui comporte l'id 'mediaModal_' + l'ID unique du média choisi.

    modal.style.display = 'block' // On display block la modale.
    modal.querySelectorAll('.mediaModal').forEach(m => {
        m.classList.remove('active') // On vient enlever la classe 'active' à tous les médias de la modale.
    })
    img.classList.add('active') // On vient ajouter la classe 'active' au média choisi pour pouvoir ouvrir la modale directement sur ce média.
}

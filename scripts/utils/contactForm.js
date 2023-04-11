const focusableSelector = "button, input, textarea, img"
let focusables = []
// eslint-disable-next-line no-unused-vars
function displayModal() {//Fonction appeler au click sur contacter-moi
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.querySelector('.modal img').focus()
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
}

// eslint-disable-next-line no-unused-vars
function closeModal() {//fonction appeler pour fermer la modal
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const formdiv = document.querySelector('form')
    formdiv.innerHTML = ''
}
//Gestion du focus de la modal contact
const focusInModal = function () {
    // e.preventDefault()
    const modal = document.getElementById("contact_modal");
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))

    if (index >= focusables.length - 1) {
        modal.querySelector('.modal img').focus()
        console.log(focusables);
    }

}
// Ajout d'un évènement à l'appui sur la touche 'échap' permettant la fermeture de la modale de formulaire de contact lorsque celle-ci est ouverture.
window.addEventListener("keydown", (e) => {
    const modal = document.getElementById("contact_modal");

    if (e.key === "Escape") {
        closeModal();//Fermeture de la modal
        const buttonContact = document.querySelector('.contact_button')//Focus back sur le boutton contactez-moi de la page du photograph
        buttonContact.focus()
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)

    }
});
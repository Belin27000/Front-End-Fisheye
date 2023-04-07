// eslint-disable-next-line no-unused-vars
function displayModal() {//Fonction appeler au click sur contacter-moi
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.querySelector('#firstname').focus()

}

// eslint-disable-next-line no-unused-vars
function closeModal() {//fonction appeler pour fermer la modal
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const formdiv = document.querySelector('form')
    formdiv.innerHTML = ''
}

// Ajout d'un évènement à l'appui sur la touche 'échap' permettant la fermeture de la modale de formulaire de contact lorsque celle-ci est ouverture.
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
        const buttonContact = document.querySelector('.contact_button')
        buttonContact.focus()
    }
});
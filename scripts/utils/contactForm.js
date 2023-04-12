const focusableSelector = "button, input, textarea, a"
let focusables = []
// eslint-disable-next-line no-unused-vars
function displayModal() {//Fonction appeler au click sur contacter-moi
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.querySelector('.modal a').focus()
    focusables = Array.from(modal.querySelectorAll(focusableSelector))

    window.addEventListener("keydown", (e) => {

        const modal = document.getElementById("contact_modal");
        let index = focusables.findIndex(f => f === modal.querySelector(':focus'))

        if (index >= focusables.length - 1) {
            focusables[0].focus()
        }

        if (index === 5 && e.key === 'Enter') {
            contactbutton.click()
        }
        if (index === 0 && e.key === 'Enter') {
            closeModal()
            const buttonContact = document.querySelector('.contact_button')//Focus back sur le boutton contactez-moi de la page du photograph
            buttonContact.focus()
        }

    })

    let contactbutton = document.getElementById("sendBtn");
    contactbutton.addEventListener("click", function (e) {
        e.preventDefault();

        let form = document.getElementsByClassName("modal");

        let ObjectForm = {
            lastname: form[0]["childNodes"][3][0].value,
            name: form[0]["childNodes"][3][1].value,
            email: form[0]["childNodes"][3][2].value,
            message: form[0]["childNodes"][3][3].value,
        }
        console.log(ObjectForm);
    })

}

// eslint-disable-next-line no-unused-vars
function closeModal() {//fonction appeler pour fermer la modal
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const formdiv = document.querySelector('form')
    formdiv.innerHTML = ''

}


// Ajout d'un évènement à l'appui sur la touche 'échap' permettant la fermeture de la modale de formulaire de contact lorsque celle-ci est ouverture.

window.addEventListener("keyup", (e) => {
    const modal = document.getElementById("contact_modal");

    if (e.key === "Escape" && modal.style.display === 'block') {
        closeModal();//Fermeture de la modal
        const buttonContact = document.querySelector('.contact_button')//Focus back sur le boutton contactez-moi de la page du photograph
        buttonContact.focus()
    }

});


// Ouvre et ferme le filtre de triage des medias

// eslint-disable-next-line no-unused-vars
function filterDrop() {//fonction appelée au click sur le filtre de classement

    // AJoute ou supprime la class .not-hidden à notre liste de tri
    const dropdownDisplay = document.querySelector('#dropdown__menu');
    dropdownDisplay.classList.toggle("not-hidden") //Affiche ou masque notre menu déroulant


    const openMenu = dropdownDisplay.classList.contains("not-hidden")// controle si la class "not-hidden" est présente ou pas


    if (openMenu) {//si "not-hidden" est présent, le menu est affiché
        const filterDisplay = document.getElementById('filter')
        filterDisplay.style.display = "none"//On masque l'entête du boutton
        const activeMenu = document.querySelector("#select__container-icon img")
        activeMenu.setAttribute("class", "isActive")//On tourne l'icon flèche vers le haut

    } else {//si "not-hidden" est absent, le menu n'est masqué
        const filterDisplay = document.getElementById('filter')
        filterDisplay.style.display = ""//On ne masque plus l'entête du boutton
        const activeMenu = document.querySelector("#select__container-icon img")
        activeMenu.removeAttribute("class", "isActive") //On tourne l'icon flèche vers le bas
    }

    const options = document.querySelectorAll('.dropdown__options')
    //on va selectionner chaque option possible
    const btn = document.getElementById('filter')
    //Puis on va modifier le filtre

    options.forEach(option => {
        //Pour chaque option du menu déroulant
        option.addEventListener('click', () => {
            //On affiche le texte du filtre
            btn.textContent = option.textContent;

        })
    })
    // window.addEventListener("keydown", (e) => {
    //     if (e.key === "Escape") {
    //         const dropdownDisplay = document.querySelector('#dropdown__menu');
    //         dropdownDisplay.classList.toggle("not-hidden")
    //         const activeMenu = document.querySelector("#select__container-icon img")
    //         activeMenu.removeAttribute("class", "isActive")
    //     }
    // });


}

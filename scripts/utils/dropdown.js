// Ouvre et ferme le filtre de triage des medias

function filterDrop() {
    // AJoute ou supprime la class .not-hidden à notre liste de tri
    const dropdownDisplay = document.querySelector('#dropdown__menu');
    dropdownDisplay.classList.toggle("not-hidden") //Affiche ou masque notre menu déroulant


    openMenu = dropdownDisplay.classList.contains("not-hidden")// controle si la class "not-hidden" est présente ou pas


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



}

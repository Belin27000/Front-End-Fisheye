/**
 * 
 * Ouvre et ferme le filtre de triage des medias
 * 
 */
function filterDrop() {
    // console.log("ensuite là");

    const dropdownDisplay = document.querySelector('#dropdown__menu');

    dropdownDisplay.classList.toggle("not-hidden")
    openMenu = dropdownDisplay.classList.contains("not-hidden")
    // console.log(dropdownDisplay);
    // dropdownDisplay.setAttribute("class", "not-hidden")

    if (openMenu) {
        const filterDisplay = document.getElementById('filter')
        filterDisplay.style.display = "none"
        const activeMenu = document.querySelector("#select__container-icon img")
        activeMenu.setAttribute("class", "isActive")

    } else {
        const filterDisplay = document.getElementById('filter')
        filterDisplay.style.display = ""
        const activeMenu = document.querySelector("#select__container-icon img")
        activeMenu.removeAttribute("class", "isActive")
    }
}
function displayMediaModal(medias) {

    const mediaDiv = document.createElement('div')//container de la modal lightbox
    mediaDiv.classList.add('modal-content')

    for (let i = 0; i < medias.length; i++) {
        const pictureList = medias[i].querySelector('.mediaPicture')
        const videoList = medias[i].querySelector('.video')
        if (pictureList) {
            mediaToAdd = pictureList
        } else {
            mediaToAdd = videoList
        }

        const eachmediaDiv = document.createElement('div')//ajoute une div pour contenir chaque media
        eachmediaDiv.classList.add('modal_childrens')
        mediaDiv.insertAdjacentElement("beforeend", eachmediaDiv)
        console.log(mediaToAdd);

        eachmediaDiv.insertAdjacentElement("beforeend", mediaToAdd)//insert chaque media dans la div modal_children
    }
    console.log(mediaDiv);
    return (mediaDiv)


}
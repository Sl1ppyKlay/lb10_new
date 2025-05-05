document.addEventListener('DOMContentLoaded', () => {
    const modalOpen = document.getElementById('modal-open');
    const modalWindow = document.getElementById('modal-window');
    const modalClose = document.getElementById('modal-close');

    modalOpen.addEventListener('click', () => {
        modalWindow.classList.toggle('active');
    })

    if (modalWindow) {
        modalClose.addEventListener('click', () => {
            modalWindow.classList.toggle('active');
        })
    }
})
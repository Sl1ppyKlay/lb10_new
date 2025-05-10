document.addEventListener('DOMContentLoaded', () => {
    const modalOpen = document.getElementById('modal-open');
    const modalWindow = document.getElementById('modal-window');
    const modalClose = document.getElementById('modal-close');

    if (modalOpen) {
        modalOpen.addEventListener('click', () => {
            modalWindow.classList.toggle('active');
        });
    }

    if (modalClose && modalWindow) {
        modalClose.addEventListener('click', () => {
            modalWindow.classList.toggle('active');
        });
    }
});
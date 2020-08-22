const imageModal = document.querySelector('.popup_type_image');
const imageModalImage = imageModal.querySelector('.pop-up__image');
const imageModalPlace = imageModal.querySelector('.pop-up__image-name');

function openModal(modal) {
  modal.classList.add('pop-up_type_opened');
  document.body.addEventListener('keydown', escClose);
}

function escClose(evt) {
  const activeModal = document.body.querySelector('.pop-up_type_opened');
  if (evt.key === 'Escape') {
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

function closeModal(modal) {
  modal.classList.remove('pop-up_type_opened');
  document.body.removeEventListener('keydown', escClose);
}

export { imageModal, imageModalImage, imageModalPlace, openModal, closeModal };
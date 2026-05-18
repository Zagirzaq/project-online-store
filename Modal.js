export class Modal {
  constructor(modalId, shouldCloseOnOverlay = true) {
    this.modal = document.getElementById(modalId);
    if (!this.modal) {
      console.error(`Модальное окно с id "${modalId}" не найдено`);
      return;
    }

    this.overlay = document.querySelector('.overlay');
    this.closeBtn = this.modal.querySelector('.close-btn');
    this.shouldCloseOnOverlay = shouldCloseOnOverlay;
    this.closeModal = this.closeModal.bind(this);
  }

  open() {
    this.modal.classList.add('modal-showed');
    if (this.overlay) {
      this.overlay.classList.add('overlay-showed');
    }
    
    if (this.overlay) {
      this.overlay.classList.add('active');
    }
    
    if (this.closeBtn) {
      this.closeBtn.removeEventListener('click', this.closeModal);
      this.closeBtn.addEventListener('click', this.closeModal);
    }

    if (this.shouldCloseOnOverlay && this.overlay) {
      this.overlay.removeEventListener('click', this.closeModal);
      this.overlay.addEventListener('click', this.closeModal);
    }
  }

  close() {
    this.modal.classList.remove('modal-showed');
    if (this.overlay) {
      this.overlay.classList.remove('overlay-showed');
    }
    
    if (this.overlay) {
      this.overlay.classList.remove('active');
    }
    
    if (this.closeBtn) {
      this.closeBtn.removeEventListener('click', this.closeModal);
    }
    
    if (this.shouldCloseOnOverlay && this.overlay) {
      this.overlay.removeEventListener('click', this.closeModal);
    }
  }

  isOpen() {
    return this.modal.classList.contains('modal-showed');
  }

  closeModal() {
    this.close();
  }
}

function modalPopup(modalId){
  const modal = document.querySelector(`#${modalId}`);
  const btn_close = modal.querySelector('.btn-close');

  
  //열기
  if(!modal.classList.contains('modal--open')){
    modal.classList.add('modal--open');
    modal.classList.remove('modal--hidden');
  };
  
  //닫기
  btn_close.addEventListener('click', () => {
    modal.classList.remove('modal--open');
    modal.classList.add('modal--hidden');
  });
}
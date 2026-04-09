//active 추가
function toggle(element){
  element.addEventListener('click', (event) => {
    element.classList.toggle('active');
    event.stopPropagation();
  });
}

function active(element){
  element.addEventListener('click', (event) => {
    element.classList.add('active');
    event.stopPropagation();
  });
}

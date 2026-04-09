//gis 위젯
const btn_func = document.querySelectorAll('.btn-func');

btn_func.forEach((btn_func) => {
  const func_widget = Array.from(btn_func.querySelectorAll('.btn-func__widget'));
  
  func_widget.forEach((func_itme) => {
    
    func_itme.addEventListener('click', () => {
      const btn_widget = Array.from(func_itme.querySelectorAll('.btn-widget'));
      
      func_itme.classList.toggle('active');

      btn_widget.forEach((btn_item) => {
        btn_item.classList.toggle('active');
      });
    })
  });
});

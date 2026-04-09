//gis period
const btn_group_period = document.querySelectorAll('.btn__group--period');

btn_group_period.forEach((btn_group) => {
  const btn_period = btn_group.querySelectorAll('.btn__period');

  btn_period.forEach((btn_items) => {
    btn_items.addEventListener('click', () => {
      
      btn_period.forEach((item) => {
        item.classList.remove("active");
      });

      btn_items.classList.add('active');
    });
  });
});

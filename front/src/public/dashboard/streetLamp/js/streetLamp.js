
//gis icon
const icon_smart = document.querySelector('.gis__icon--smart');
const icon_smart_event = document.querySelector('.gis__icon--smart-event');

toggle(icon_smart);
toggle(icon_smart_event);

//gis search
const gis__search = document.querySelector('.gis__search');
toggle(gis__search);


//lamp list
const lamp_items = document.querySelectorAll('.lamp__item');

lamp_items.forEach((lamp_item) => {
  lamp_item.addEventListener('click', () => {
    
    lamp_items.forEach((item) => {
      item.classList.remove("active");
    });

    lamp_item.classList.add('active');
  });
});


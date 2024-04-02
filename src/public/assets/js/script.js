// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// $(document).ready(function(){
//     $(".tab-item").click( function(e){
//         $(".tab-item.active").removeClass("active");
//         console.log("jihji");
//         e.target.addClass("active");
//     })
// })

// tabs.forEach((tab, index) => {
//   tab.onclick = function () {
   
//   };
// });
$(document).on('hidden.bs.modal', function () {
    if ($('.modal:visible').length) {
      $('body').addClass('modal-open');
    }
  });

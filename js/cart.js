$(document).ready(() => {
  $('.subtract').click(e => {
    let id = e.target.id;
    let val = parseInt($('input#'+id).val());
    if(val > 1)
      $('input#'+id).val(parseInt(val)-1);
  });

  $('.add').click(e => {
    let id = e.target.id;
    let val = parseInt($('input#'+id).val());
    $('input#'+id).val(parseInt(val)+1);
  });

  $('div.delete.act').click(e => {
    e.preventDefault();
    $(this).closest(".product").remove();
  });
});

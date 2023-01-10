$(document).ready(() => {
  $(".user-img").click(e => {
    $("#image").click();
  });
  
  $('.button-change').click(e => {
    e.preventDefault();
    let id = e.target.id;
    switch(id) {
      case 'gender':
        $('select[name='+id+']').prop('disabled', (i, v) => !v );
        $('#'+id).text() === 'Change' ? $('#'+id).text('Save') : $('#'+id).text('Change');
        break;
      default:
        $('input[name='+id+']').prop('disabled', (i, v) => !v);
        $('#'+id).text() === 'Change' ? $('#'+id).text('Save') : $('#'+id).text('Change');
    }
  });

  $('#toggle-email').click(e => {
    let normalText = "ivan013@binus.ac.id";
    let hiddenText = "ivan0*****@*****.ac.id";
    let field = $('#value-email');
    if(field.text().trim() === hiddenText)
      field.text(normalText);
    else
      field.text(hiddenText);
  });
  
  $('#image').change(() => {
    let file = $('#image')[0];
    if(file.files && file.files[0]){
      reader = new FileReader();
			reader.onload = function () {
				$('img.user-img').attr('src', reader.result);
			};
			reader.readAsDataURL(file.files[0]);
    }
  });
});
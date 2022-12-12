//Variable for save value of quantity
var quantity = 0;

//Decrement for value quantity
$(".subtract").click(function () {
  var $this = $(this),
    $insert = $this.next("input"),
    $parentInsert = $insert.closest("div");
  if (parseInt($insert.val()) > 1) {
    var newQuantity = parseInt($insert.val()) - 1;
    $parentInsert.find(".add").addClass("a" + newQuantity);
    $insert.val(newQuantity);
    quantity = quantity + newQuantity;
  }
});

//Increment for value quantity
$(".add").click(function () {
  var $this = $(this),
    $insert = $this.prev("input"),
    $parentInsert = $insert.closest("div");
  if (parseInt($insert.val()) < 100) {
    var newQuantity = parseInt($insert.val()) + 1;
    $parentInsert.find(".add").addClass("a" + newQuantity);
    $insert.val(newQuantity);
    quantity = quantity + newQuantity;
  }
});

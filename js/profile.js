$(".user-img").click(function () {
  $("#image").click();
});

function show() {
  document.getElementById("value-email").textContent = "ivan013@binus.ac.id";
  document.getElementById("show").style.display = "none";
  document.getElementById("hide").style.display = "block";
}

function hide() {
  document.getElementById("value-email").textContent = "ivan0*****@*****.ac.id";
  document.getElementById("show").style.display = "block";
  document.getElementById("hide").style.display = "none";
}

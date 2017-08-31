/* var menutimer;

function forEach(elements, func) {
  Array.prototype.forEach.call(elements, func);
}

function showMenu(target) {
  console.log(target);
  var submenus = document.querySelectorAll('.mainsub ul');
  forEach(submenus, function(e) {
    console.log(e);
    e.classList.remove('active');
  })
  var targetMenu = target.getAttribute('data-submenu');
  console.log(targetMenu);
  var submenu = document.getElementById(targetMenu);
  submenu.classList.add('active');
}

function hideMenu(target) {
  var submenus = document.querySelectorAll('.mainsub ul');
  forEach(submenus, function(e) {
    e.classList.remove('active');
  })
}

var mainnavitems = document.querySelectorAll('.mainnav a');

forEach(mainnavitems, function(e){
  e.addEventListener('mouseenter', function(event) {showMenu(event.target); clearTimeout(menutimer);});
  e.addEventListener('focus', function(event) {showMenu(event)});
  e.addEventListener('mouseleave', function(event) {
    menutimer = setTimeout(function(event){
      hideMenu(event)
    }, 1000);});
  e.addEventListener('blur', function(event) {hideMenu(event)});
});

var subnavitems = document.querySelectorAll('.mainsub ul');
forEach(subnavitems, function(e){
  e.addEventListener('mouseenter', function(event) {clearTimeout(menutimer);});
  e.addEventListener('mouseleave', function(event) {
    menutimer = setTimeout(function(event){
      hideMenu(event)
    }, 1000);});
});
*/
(function () {
  'use strict';

  var addclass = function(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  };

  var remclass = function(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  };

  var hasclass = function(el, className) {
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  };

  var spc = document.createTextNode(' ');

  var headings = document.querySelectorAll('article h2[id], article h3[id], article h4[id]');
  var firstheading = headings[0];

  if (firstheading) {
    addclass(firstheading, 'first');

    var toc_elements = headings; // $('.content h2[id], .ap')

    var excount = 1,
        apcount = 1;

    // var toc_outer = document.createElement('figure');
    // toc_outer.setAttribute('role', 'navigation');
    // toc_outer.setAttribute('aria-describedby', 'toc_desc');
    // toc_outer.innerHTML = '<figcaption id="toc_desc">On this page <a href="#skipotp" class="visuallyhidden focusable">(skip)</a></figcaption><div class="figcontent"></div>';
    // if (toc_outer.classList)
    //   toc_outer.classList.add('toc');
    // else
    //   toc_outer.className += ' ' + ('toc');
    var toc_wrap = document.createElement('ul');
    var toc_elem = document.createElement('li');
    var nesting = false;
    var subnesting = false;
    var sub_wrap, sub_sub_wrap, last_elem, last_sub_elem;
    Array.prototype.forEach.call(toc_elements, function(el, i){ // … .each(…)
      // console.log(el.localName + ': ' + el.textContent + ' // ' + nesting);
      var cur_elem = toc_elem.cloneNode(true);
      if ((el.localName==="h4") && (subnesting===false)) {
        sub_sub_wrap = toc_wrap.cloneNode(false);
      }
      if ((el.localName==="h3") && (nesting===false)) {
        sub_wrap = toc_wrap.cloneNode(false);
      }
      if ((el.localName==="h3") && (subnesting===true)) {
        last_sub_elem.appendChild(sub_sub_wrap);
        subnesting = false;
      }
      if ((el.localName==="h2") && (nesting===true)) {
        if (subnesting===true) {
          last_sub_elem.appendChild(sub_sub_wrap);
          subnesting = false;
        }
        last_elem.appendChild(sub_wrap);
        nesting = false;
      }

      if (hasclass(el,"ex")) {
        el.insertAdjacentHTML('afterbegin', "<b>Example " + excount + ":</b> ");
        excount++;
        if (!hasclass(el, "inap")) {
          apcount = 1;
        }
      }
      if (hasclass(el,"ap")) {
        el.insertAdjacentHTML('afterbegin', "<b>Approach " + apcount + ":</b> ");
        apcount++;
      }
      if (hasclass(el,"newex")) {
        excount = 1;
      }
      if (hasclass(el,"newap")) {
        apcount = 1;
      }

    //   cur_elem.innerHTML = '<a class="' + el.getAttribute('class') + '" href="#' + el.getAttribute('id') + '">' + el.innerHTML + '</a>';

    //    console.log(cur_elem);
    //   if (el.localName==="h4") {
    //     sub_sub_wrap.appendChild(cur_elem);
    //     subnesting = true;
    //   } else if (el.localName==="h3") {
    //     sub_wrap.appendChild(cur_elem);
    //     nesting = true;
    //     last_sub_elem = cur_elem;
    //   } else {
    //     toc_wrap.appendChild(cur_elem);
    //     last_elem = cur_elem;
    //   }
    });

    // if (nesting===true) {
    //   last_elem.appendChild(sub_wrap);
    //   nesting = false;
    // }

    // toc_outer.querySelectorAll('.figcontent')[0].innerHTML = toc_wrap.outerHTML;

    //var inner = document.querySelectorAll('.inner > :first-child')[0];
    //inner.insertAdjacentHTML('beforebegin', toc_outer.outerHTML + '<span id="skipotp" class="visuallyhidden"></span>');

  }

  document.querySelector('.mainnav > li').addEventListener("click", function(event){
    var cureel = event.target,
        isopen = false;
    while (cureel.nodeName.toLowerCase() != 'LI'.toLowerCase()) {
      cureel = cureel.parentNode;
    }
    if (hasclass(cureel, 'has-submenu')) {
      if (hasclass(cureel, 'active')) { isopen = true; }
      event.preventDefault();
      Array.prototype.forEach.call(document.querySelectorAll('li.active'), function(el, i){
        remclass(el, 'active');
      });
      if (!isopen) {
        addclass(cureel, 'active');
      }
    }
  });

  // $('.mainnav li').click(function (e){
  //   if ($(e.target).parent().parent().hasClass('active')) {
  //     $('.active').removeClass('active');
  //   } else {
  //     $('.active').removeClass('active');
  //     $(e.target).parent().parent().addClass('active');
  //   }
  //   e.preventDefault();
  // });

  // var menuItems = document.querySelectorAll('li.has-submenu');
  // var timer;
  // Array.prototype.forEach.call(menuItems, function(el, i){
  //   el.addEventListener("mouseover", function(event){
  //     if (document.querySelector(".has-submenu.open")) {
  //       document.querySelector(".has-submenu.open").className = "has-submenu";
  //     }
  //     this.className = "has-submenu open";
  //     clearTimeout(timer);
  //   });
  //   el.addEventListener("mouseout", function(event){
  //     timer = setTimeout(function(event){
  //       document.querySelector(".has-submenu.open").className = "has-submenu";
  //     }, 1000);
  //   });
  // });

  // Array.prototype.forEach.call(menuItems, function(el, i){
  //   el.querySelector('a').addEventListener("keyup",  function(event){
  //     if (event.keyCode == 13) {
  //       if (this.parentNode.className == "has-submenu") {
  //         this.parentNode.className = "has-submenu open";
  //         this.setAttribute('aria-expanded', "true");
  //       } else {
  //         this.parentNode.className = "has-submenu";
  //         this.setAttribute('aria-expanded', "false");
  //       }
  //       event.preventDefault();
  //       return false;
  //     }
  //   });
  // });



  var last_known_scroll_position = 0;
  var ticking = false;

  window.addEventListener('scroll', function(e) {

    last_known_scroll_position = window.scrollY;

    if (!ticking) {

      window.requestAnimationFrame(function() {
        if (last_known_scroll_position > (window.innerHeight * 0.66)) {
          addclass(document.querySelector('.button-backtotop'), 'active');
        } else {
          if (last_known_scroll_position < 1) {
            remclass(document.querySelector('.button-backtotop'), 'active');
          }
        }
        ticking = false;
      });

      ticking = true;

    }

  });

}());
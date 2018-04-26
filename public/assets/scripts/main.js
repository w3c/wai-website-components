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

  var isVisible = function(el) {
    return (el.offsetWidth > 0 && el.offsetHeight > 0);
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

  var metanav  = document.querySelector('.metanav'   );
  var mainnav  = document.querySelector('.mainnav'   );
  var mainnav  = document.querySelector('.sidenav'   );
  var breadnav = document.querySelector('.breadcrumb');
  var navbtn   = document.querySelector('#openmenu'  );

  if (navbtn !== null) {
    navbtn.addEventListener('click', function(e) {
      if (hasclass(e.target, 'open')) {
        remclass(e.target, 'open');
        remclass(metanav, 'open');
        remclass(mainnav, 'open');
        remclass(sidenav, 'open');
        breadnav.show();
        e.target.setAttribute('aria-expanded', 'false');
      } else {
        addclass(e.target, 'open');
        addclass(metanav, 'open');
        addclass(mainnav, 'open');
        addclass(sidenav, 'open');
        breadnav.hide();
        e.target.setAttribute('aria-expanded', 'true');
      }
    });
  }

  var excolAll = document.querySelectorAll('.excol-all');
  var excols =  document.querySelectorAll('details');

  if ((excolAll !== null) && (excols !== null) && (excols.length > 1)) {
    function enableButtons(els) {
      Array.prototype.forEach.call(els, function(el, i){
        el.disabled = false;
      });
    }
    function disableButtons(els) {
      Array.prototype.forEach.call(els, function(el, i){
        el.disabled = true;
      });
    }
    function setExColAllButtons() {
      setTimeout(function(){
        var open  = document.querySelectorAll('details[open]').length;
        var close = document.querySelectorAll('details:not([open])').length;
        if((open > 0) && (close === 0)) {
          enableButtons(document.querySelectorAll('.excol-all .collapse'));
          disableButtons(document.querySelectorAll('.excol-all .expand'));
        } else if ((open === 0) && (close > 0)) {
          disableButtons(document.querySelectorAll('.excol-all .collapse'));
          enableButtons(document.querySelectorAll('.excol-all .expand'));
        } else {
          enableButtons(document.querySelectorAll('.excol-all .collapse'));
          enableButtons(document.querySelectorAll('.excol-all .expand'));
        }
      }, 100);
    }

    Array.prototype.forEach.call(document.querySelectorAll('details summary'), function(el, i){
      el.addEventListener("click", function() {setExColAllButtons()});
    });

    Array.prototype.forEach.call(excolAll, function(el, i){
      el.innerHTML = '<button class="expand button button-secondary button-small">+ Expand All Sections</button> <button class="collapse button button-secondary button-small">&minus; Collapse All Sections</button>';
    });

    Array.prototype.forEach.call(document.querySelectorAll('.excol-all'), function(el, i){
      el.addEventListener("click", function(element) {
        if (hasclass(element.target, 'expand')) {
          Array.prototype.forEach.call(document.querySelectorAll('details'), function(el, i){
            el.setAttribute('open', 'true');
          });
        }
        if (hasclass(element.target, 'collapse')) {
          Array.prototype.forEach.call(document.querySelectorAll('details'), function(el, i){
            el.removeAttribute('open');
          });
        }
        setExColAllButtons();
      });
    });

    setExColAllButtons();
  }

  var fragment = window.location.hash;

  if (fragment.length) {
    var target = document.querySelector(fragment);

    // if the first element is a details element, open it. Set target to its parent node so we…
    if (target.nodeName.toLowerCase() == 'details') {
      target.setAttribute('open', 'true');
      target = target.parentNode;
    }

    // can see if that parent node is visible. If it is _not_, but is a details element, we open that details element.
    // Then we move on to its parent until we arrive at a visible element
    while (!isVisible(target)) {
      if (target.nodeName.toLowerCase() == 'details') {
        target.setAttribute('open', 'true');
      }
      target = target.parentNode;
    }

    // That last visible element might be a details element, so we need to make sure to open it as well.
    if (target.nodeName.toLowerCase() == 'details') {
      target.setAttribute('open', 'true');
    }
  }

}());
// Shared helpers for BobbyDev demo sites: hide broken images, mobile nav toggle.
document.querySelectorAll('img').forEach(function (img) {
  function hide() { img.style.visibility = 'hidden'; }
  if (img.complete && img.naturalWidth === 0) hide();
  else img.addEventListener('error', hide);
});
document.querySelectorAll('[data-nav-toggle]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelector(btn.getAttribute('data-nav-toggle')).classList.toggle('open');
  });
});

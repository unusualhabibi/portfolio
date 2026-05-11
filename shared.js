// shared.js — inject nav + footer into every page
(function(){
  const depth = document.currentScript?.dataset.depth || '';
  const root = depth;

  // NAV
  document.body.insertAdjacentHTML('afterbegin', `
  <nav id="nav">
    <a href="${root}index.html" class="nav-logo">Abdullah Ishaq</a>
    <ul class="nav-links">
      <li><a href="${root}index.html#domains">Work</a></li>
      <li><a href="${root}index.html#about">About</a></li>
      <li><a href="${root}cv/cv.html">CV</a></li>
      <li><a href="${root}index.html#contact" class="nav-cta">Contact</a></li>
    </ul>
    <div class="nav-ham" onclick="toggleMob()" id="ham">
      <span></span><span></span><span></span>
    </div>
  </nav>
  <div class="mob-menu" id="mobMenu">
    <a href="${root}index.html" onclick="closeMob()">Home</a>
    <a href="${root}index.html#domains" onclick="closeMob()">Work</a>
    <a href="${root}index.html#about" onclick="closeMob()">About</a>
    <a href="${root}cv/cv.html" onclick="closeMob()">CV</a>
    <a href="${root}index.html#contact" onclick="closeMob()">Contact</a>
  </div>`);

  // FOOTER
  document.body.insertAdjacentHTML('beforeend', `
  <footer>
    <p>© 2025 Abdullah Ishaq · Obafemi Awolowo University · Ile-Ife, Nigeria</p>
    <div class="foot-links">
      <a href="${root}index.html">Home</a>
      <a href="${root}index.html#domains">Work</a>
      <a href="${root}cv/cv.html">CV</a>
      <a href="${root}index.html#contact">Contact</a>
    </div>
  </footer>`);

  // NAV scroll
  window.addEventListener('scroll', () => {
    document.getElementById('nav').style.background =
      window.scrollY > 10 ? 'rgba(255,255,255,.94)' : 'rgba(255,255,255,.88)';
  });

  // Reveal on scroll
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target);} });
  },{threshold:.07,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
})();

function toggleMob(){
  const m=document.getElementById('mobMenu');
  const h=document.getElementById('ham').querySelectorAll('span');
  m.classList.toggle('open');
  const o=m.classList.contains('open');
  h[0].style.transform=o?'rotate(45deg) translate(5px,6px)':'';
  h[1].style.opacity=o?'0':'';
  h[2].style.transform=o?'rotate(-45deg) translate(5px,-6px)':'';
}
function closeMob(){document.getElementById('mobMenu').classList.remove('open');}

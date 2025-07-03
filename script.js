const menu = document.getElementById('menu');
const telaJogo = document.getElementById('jogo');
var count = 200;
let intervalId = null;
let nuvens = null;
const container = document.getElementById('nuvens-container');


function mostrarTela() {
  if (menu.classList.contains('ativa')) {
    intervalId = setInterval(atualizaCount, 1000);
    nuvens = setInterval(criarNuvemAleatoria, 500);
    menu.classList.remove('ativa');
    telaJogo.classList.add('ativa');
  } else {
    telaJogo.classList.remove('ativa');
    menu.classList.add('ativa');
    clearInterval(intervalId);
    intervalId = null;
    clearInterval(nuvens);
    nuvens = null;
    count = 200;
    atualizarDisplayCount();
    if (container) {
      Array.from(container.getElementsByClassName('nuvem')).forEach(nuvem => nuvem.remove());
    }
  }
}



function criarNuvemAleatoria() {
  const container = document.getElementById('nuvens-container');
  const nuvem = document.createElement('img');
  const nuvemIndex = Math.floor(Math.random() * 3) + 1;
  nuvem.src = `imagens/nuvem${nuvemIndex}.png`;
  nuvem.className = 'nuvem';
  nuvem.onclick = function () { clickNuvem(this); };

  const centro = 210;
  const raioMax = 280;
  const t = 2 * Math.PI * Math.random();
  const r = Math.sqrt(Math.random()) * raioMax;
  const x = centro + r * Math.cos(t) - 40;
  const y = centro + r * Math.sin(t) - 40;

  nuvem.style.left = x + 'px';
  nuvem.style.top = y + 'px';
  nuvem.style.width = '160px';
  nuvem.style.height = '160px';

  container.appendChild(nuvem);
}

function clickNuvem(nuvemElem) {
  nuvemElem.onclick = null;
  const nuvemIndex = Math.floor(Math.random() * 3) + 1;
  nuvemElem.style.zIndex = 1;
  nuvemElem.src = `imagens/nuvemclicada${nuvemIndex}.png`;

  setTimeout(() => {
    nuvemElem.style.opacity = '0';
  }, 150);

  count = count - (Math.floor(Math.random() * (40 - 20 + 1)) + 20);
  if (count <= 0) {
    count = 0;

    mostrarPopup('popup-ganhou');
    atualizarDisplayCount();
    return;
  }
  atualizarDisplayCount();

  setTimeout(() => {
    if (nuvemElem.parentNode) {
      nuvemElem.parentNode.removeChild(nuvemElem);
    }
  }, 850);
}

function atualizarDisplayCount() {
  const display = document.getElementById('contador');
  if (display) display.textContent = count;
}

function atualizaCount() {
  count = count + (Math.floor(Math.random() * (70 - 30 + 1)) + 30);
  if (count >= 400) {
    mostrarPopup('popup-perdeu');
  }

  atualizarDisplayCount();
}

function fecharPopup(id) {
  const popup = document.getElementById(id);
  if (popup) popup.style.display = 'none';
  if (!intervalId) {
    intervalId = setInterval(atualizaCount, 1000);
    nuvens = setInterval(criarNuvemAleatoria, 500);
  }
}
function mostrarPopup(id) {
  const popup = document.getElementById(id);
  if (popup) popup.style.display = 'flex';
  count = 200;
  if (container) {
    Array.from(container.getElementsByClassName('nuvem')).forEach(nuvem => nuvem.remove());
  }
  clearInterval(intervalId);
  intervalId = null;
  clearInterval(nuvens);
  nuvens = null;
}
atualizarDisplayCount();
document.addEventListener('mousemove', function(event) {
  console.log('x:', event.clientX, 'y:', event.clientY);
});
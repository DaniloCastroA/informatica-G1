const menu = document.getElementById('menu');
const telaJogo = document.getElementById('jogo');
var count = 200;
let intervalId = null;
let nuvens = null;
const container = document.getElementById('nuvens-container');
const audioMenu = document.getElementById('meuAudio');
const audioGame = document.getElementById('meuAudioGame');
const audioPerdeu = document.getElementById('audioPerdeu');
const audioVitoria = document.getElementById('audioVitoria');

audioMenu.volume = 0.3;
audioGame.volume = 0.3;
audioPerdeu.volume = 0.3;
audioVitoria.volume = 0.3;


function mostrarTela() {
  if (menu.classList.contains('ativa')) {
    intervalId = setInterval(atualizaCount, 1000);
    nuvens = setInterval(criarNuvemAleatoria, 500);
    menu.classList.remove('ativa');
    telaJogo.classList.add('ativa');
    audioMenu.pause();
    audioGame.currentTime = 0;
    audioGame.play();
  } else {
    audioGame.pause();
    audioMenu.currentTime = 0;
    audioMenu.play();
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

  const audioIndex = Math.floor(Math.random() * 4) + 1;
  const audio = document.getElementById('audioNuvem' + audioIndex);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
  const nuvemIndex = Math.floor(Math.random() * 3) + 1;
  nuvemElem.style.zIndex = 1;
  nuvemElem.src = `imagens/nuvemclicada${nuvemIndex}.png`;


  const valorRetirado = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
  count = count - valorRetirado;


  const span = document.createElement('span');
  span.textContent = `-${valorRetirado}`;
  span.className = 'nuvem-dano';

  const container = document.getElementById('nuvens-container');
  container.appendChild(span);


  span.style.left = (nuvemElem.offsetLeft + nuvemElem.offsetWidth - 20) + 'px';
  span.style.top = (nuvemElem.offsetTop + 10) + 'px';


  setTimeout(() => {
    span.classList.add('hide');
  }, 50);

  setTimeout(() => {
    if (span.parentNode) span.parentNode.removeChild(span);
  }, 800);

  setTimeout(() => {
    nuvemElem.style.opacity = '0';
  }, 150);

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

function mostrarPopupSimples(id) {
  document.getElementById(id).style.display = 'flex';
}

function fecharPopupSimples(id) {
  document.getElementById(id).style.display = 'none';
}

function fecharPopup(id) {
  const popup = document.getElementById(id);
  audioGame.currentTime = 0;
  audioGame.play();
  if (popup) popup.style.display = 'none';
  if (!intervalId) {
    intervalId = setInterval(atualizaCount, 1000);
    nuvens = setInterval(criarNuvemAleatoria, 500);
  }
}
function mostrarPopup(id) {
  const popup = document.getElementById(id);
  audioMenu.pause();
  audioGame.pause();
  if (id === 'popup-perdeu-id') {
    audioPerdeu.play();
  }
  else {
    audioVitoria.play();
  }
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

function fecharPopupEVoltar(id) {
  fecharPopup(id);
  mostrarTela();
}

//ajuda a posicionar objetos
document.addEventListener('mousemove', function (event) {
  console.log('x:', event.clientX, 'y:', event.clientY);
});


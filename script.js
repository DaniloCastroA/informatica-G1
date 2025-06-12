const menu = document.getElementById('menu');
const telaJogo = document.getElementById('jogo');

function mostrarTela() {
  if (menu.classList.contains('ativa')) {
    menu.classList.remove('ativa');
    telaJogo.classList.add('ativa');
  } else {
    telaJogo.classList.remove('ativa');
    menu.classList.add('ativa');
  }
}
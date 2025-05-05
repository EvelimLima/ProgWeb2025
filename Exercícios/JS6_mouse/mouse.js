const rastros = [];

  document.addEventListener('mousemove', (e) => {
    const ponto = document.createElement('div');
    ponto.className = 'ponto';
    ponto.style.left = e.pageX + 'px';
    ponto.style.top = e.pageY + 'px';
    document.body.appendChild(ponto);
    rastros.push(ponto);

    // limita a 8 pontos no rastro
    if (rastros.length > 8) {
      const removido = rastros.shift(); // Remove o mais antigo
      removido.remove();
    }
  });

// public/js/escore.js

function endGame() {
  console.log("⚠️ endGame() foi chamado"); // <-- importante

  isRunning = false;
  isGameOver = true;
  document.getElementById("game-over").classList.remove("hidden");
  document.getElementById("final-score").textContent = `Score: ${score}`;


  fetch('/game/score', {
  
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ score }),
  credentials: 'include'
})
.then(res => {
  if (!res.ok) throw new Error('Erro ao salvar score');
  return res.json(); // <- já retorna o objeto JSON
})
.then(data => {
  console.log(data.message);
  window.parent.postMessage({ type: 'scoreSaved', message: data.message }, '*');
})
.catch(err => {
  console.error('Erro ao enviar score:', err);
  window.parent.postMessage({ type: 'scoreError', message: err.message }, '*');
});

}




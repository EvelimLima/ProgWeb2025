let selectedMajorId = null;

const confirmModal = document.getElementById('confirmModal');
const modalMajorName = document.getElementById('modalMajorName');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

confirmModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget;
  selectedMajorId = button.getAttribute('data-id');
  const majorName = button.getAttribute('data-name');
  
  modalMajorName.textContent = majorName;
});

confirmDeleteBtn.addEventListener('click', () => {
  if (selectedMajorId) {
    fetch(`/major/remove/${selectedMajorId}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          window.location.reload();
        } else {
          alert('Erro ao deletar.');
        }
      })
      .catch(() => alert('Erro na requisição.'));
  }
});

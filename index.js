const dragBoxes = document.querySelectorAll('.drag-box');
const dropBox = document.querySelector('.drop-box');

let isDragging = false;

dragBoxes.forEach(dragBox => {
  dragBox.addEventListener('dragstart', e => {
    isDragging = true;
    e.dataTransfer.setData('text/plain', null);
    dragBox.classList.add('dragging');
  });

  dragBox.addEventListener('dragend', () => {
    isDragging = false;
    dragBox.classList.remove('dragging');
  });

  dragBox.addEventListener('mousemove', e => {
    if (isDragging) {
      const rect = dragBox.getBoundingClientRect();
      const x = e.clientX - rect.width / 2;
      const y = e.clientY - rect.height / 2;
      dragBox.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
});

dropBox.addEventListener('dragover', e => {
  e.preventDefault();
  dropBox.classList.add('dragover');
});

dropBox.addEventListener('dragleave', () => {
  dropBox.classList.remove('dragover');
});

dropBox.addEventListener('drop', () => {
  isDragging = false;
  dragBoxes.forEach(dragBox => {
    if (dragBox.classList.contains('dragging')) {
      dragBox.style.transform = '';
      dropBox.appendChild(dragBox);
      dropBox.classList.remove('dragover');
    }
  });
});

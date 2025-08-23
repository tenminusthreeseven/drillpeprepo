// Select all checkboxes
const checkboxes = document.querySelectorAll('.topic');
const progressBar = document.getElementById('overall-progress');
const progressText = document.getElementById('progress-text');

// Function to calculate progress
function updateProgress() {
  const total = checkboxes.length;
  const checked = document.querySelectorAll('.topic:checked').length;
  const percent = Math.round((checked / total) * 100);

  progressBar.style.width = percent + '%';
  progressText.textContent = `Progress: ${percent}%`;
}

// Attach event listener to all checkboxes
checkboxes.forEach(cb => {
  cb.addEventListener('change', updateProgress);
});

// Initialize on page load
updateProgress();

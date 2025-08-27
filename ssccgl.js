// Select all topic checkboxes
const checkboxes = document.querySelectorAll(".topic");
const progressBar = document.getElementById("progress-bar");

function updateProgress() {
  const total = checkboxes.length;
  const checked = document.querySelectorAll(".topic:checked").length;
  const percent = Math.round((checked / total) * 100);
  progressBar.style.width = percent + "%";
  progressBar.textContent = percent + "%";
}

// Attach listener to every checkbox
checkboxes.forEach(cb => cb.addEventListener("change", updateProgress));


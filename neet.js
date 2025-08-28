// Wait until page is loaded
document.addEventListener("DOMContentLoaded", () => {
  const subjects = ["physics", "chemistry", "biology"];

  // Update subject progress
  function updateSubjectProgress(subject) {
    const checkboxes = document.querySelectorAll(`.topic.${subject}`);
    const total = checkboxes.length;
    const checked = document.querySelectorAll(`.topic.${subject}:checked`).length;

    const percent = total > 0 ? ((checked / total) * 100).toFixed(1) : 0;

    document.getElementById(`${subject}-percent`).textContent = `${percent}% Complete`;
    document.getElementById(`${subject}-progress`).style.width = `${percent}%`;

    return { checked, total };
  }

  // Update overall progress
  function updateOverallProgress() {
    let total = 0;
    let checked = 0;

    subjects.forEach(sub => {
      const res = updateSubjectProgress(sub);
      total += res.total;
      checked += res.checked;
    });

    const percent = total > 0 ? ((checked / total) * 100).toFixed(1) : 0;
    document.getElementById("overall-percent").textContent = `Progress: ${percent}%`;
    document.getElementById("overall-progress").style.width = `${percent}%`;
  }

  // Add listeners to all checkboxes
  document.querySelectorAll(".topic").forEach(box => {
    box.addEventListener("change", updateOverallProgress);
  });

  // Initialize
  updateOverallProgress();
});

document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".topic");
  const progressBar = document.getElementById("progress");
  const progressText = document.getElementById("progress-text");

  checkboxes.forEach(box => {
    box.addEventListener("change", updateProgress);
  });

  function updateProgress() {
    let checked = document.querySelectorAll(".topic:checked").length;
    let total = checkboxes.length;
    let percent = Math.round((checked / total) * 100);

    progressBar.style.width = percent + "%";
    progressText.innerText = percent + "% Complete";

    checkboxes.forEach(cb => {
      if (cb.checked) {
        cb.parentElement.classList.add("completed");
      } else {
        cb.parentElement.classList.remove("completed");
      }
    });
  }
});

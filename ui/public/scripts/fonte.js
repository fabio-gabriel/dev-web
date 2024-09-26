document.addEventListener("DOMContentLoaded", () => {
  const increaseButton = document.getElementById("increase-font");
  const decreaseButton = document.getElementById("decrease-font");

  // Defina o limite mínimo e máximo do tamanho da fonte em pixels
  const MIN_FONT_SIZE = 12; // Tamanho mínimo em pixels
  const MAX_FONT_SIZE = 32; // Tamanho máximo em pixels

  function applyStoredFontSize() {
    const storedSize = localStorage.getItem("fontSize");
    if (storedSize) {
      const parsedSize = parseFloat(storedSize);
      if (parsedSize >= MIN_FONT_SIZE && parsedSize <= MAX_FONT_SIZE) {
        // Aplicar tamanho da fonte armazenado
        document.body.style.fontSize = storedSize;
        document.querySelectorAll("h2, h3").forEach((el) => {
          el.style.fontSize = storedSize;
        });
        document.querySelectorAll(".btn").forEach((el) => {
          el.style.fontSize = storedSize;
        });
      }
    }
  }

  function updateFontSize(change) {
    const currentSize = window.getComputedStyle(document.body).fontSize;
    const currentSizeNumber = parseFloat(currentSize);
    let newSize = currentSizeNumber + change;

    // Garantir que o novo tamanho esteja dentro dos limites
    if (newSize < MIN_FONT_SIZE) newSize = MIN_FONT_SIZE;
    if (newSize > MAX_FONT_SIZE) newSize = MAX_FONT_SIZE;

    newSize += "px";
    document.body.style.fontSize = newSize;

    // Aplicar novo tamanho a todos os cabeçalhos e botões
    document.querySelectorAll("h2, h3").forEach((el) => {
      el.style.fontSize = newSize;
    });
    document.querySelectorAll(".btn").forEach((el) => {
      el.style.fontSize = newSize;
    });

    localStorage.setItem("fontSize", newSize);
  }

  applyStoredFontSize();

  increaseButton.addEventListener("click", () => updateFontSize(2));
  decreaseButton.addEventListener("click", () => updateFontSize(-2));
});

document.addEventListener("DOMContentLoaded", () => {
  const increaseButton = document.getElementById("increase-font");
  const decreaseButton = document.getElementById("decrease-font");

  // Defina o limite mínimo e máximo do tamanho da fonte em 'rem'
  const MIN_FONT_SIZE = 0.75; // 0.75 rem (12px se o tamanho base for 16px)
  const MAX_FONT_SIZE = 2;    // 2 rem (32px se o tamanho base for 16px)

  // Função para aplicar o tamanho de fonte armazenado no localStorage
  function applyStoredFontSize() {
    const storedSize = localStorage.getItem("fontSize");
    if (storedSize) {
      const parsedSize = parseFloat(storedSize);
      if (parsedSize >= MIN_FONT_SIZE && parsedSize <= MAX_FONT_SIZE) {
        // Aplicar tamanho da fonte armazenado
        document.documentElement.style.fontSize = `${parsedSize}rem`;
      }
    }
  }

  // Função para atualizar o tamanho da fonte
  function updateFontSize(change) {
    const currentSize = window.getComputedStyle(document.documentElement).fontSize;
    const currentSizeRem = parseFloat(currentSize) / 16; // Convertendo px para rem
    let newSizeRem = currentSizeRem + change;

    // Garantir que o novo tamanho esteja dentro dos limites
    if (newSizeRem < MIN_FONT_SIZE) newSizeRem = MIN_FONT_SIZE;
    if (newSizeRem > MAX_FONT_SIZE) newSizeRem = MAX_FONT_SIZE;

    // Aplicar o novo tamanho da fonte ao documento
    document.documentElement.style.fontSize = `${newSizeRem}rem`;

    // Armazenar o novo tamanho no localStorage
    localStorage.setItem("fontSize", newSizeRem);
  }

  // Aplicar o tamanho armazenado no carregamento
  applyStoredFontSize();

  // Adicionar eventos aos botões
  increaseButton.addEventListener("click", () => updateFontSize(0.1)); // Aumenta em 0.1 rem
  decreaseButton.addEventListener("click", () => updateFontSize(-0.1)); // Diminui em 0.1 rem
});

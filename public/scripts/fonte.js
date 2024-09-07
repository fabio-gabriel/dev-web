document.addEventListener('DOMContentLoaded', () => {
    const increaseButton = document.getElementById('increase-font');
    const decreaseButton = document.getElementById('decrease-font');
    
    function applyStoredFontSize() {
        const storedSize = localStorage.getItem('fontSize');
        if (storedSize) {
            document.body.style.fontSize = storedSize;
        }
    }

    function updateFontSize(change) {
        const currentSize = window.getComputedStyle(document.body).fontSize;
        const currentSizeNumber = parseFloat(currentSize);
        const newSize = (currentSizeNumber + change) + 'px';
        document.body.style.fontSize = newSize;
        localStorage.setItem('fontSize', newSize);
    }

    applyStoredFontSize();

    increaseButton.addEventListener('click', () => updateFontSize(2));
    decreaseButton.addEventListener('click', () => updateFontSize(-2));
});

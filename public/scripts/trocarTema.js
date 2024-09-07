document.addEventListener('DOMContentLoaded', function () {
    const lightThemeBtn = document.getElementById('light-theme');
    const darkThemeBtn = document.getElementById('dark-theme');
    const body = document.body;
  
    function updateTextClasses() {
        const textDarkElements = document.querySelectorAll('.text-dark');
        const textLightElements = document.querySelectorAll('.text-light');
      
        // Atualiza os elementos text-dark para text-light se estiver no modo escuro
        textDarkElements.forEach(element => {
            if (body.classList.contains('dark-mode')) {
                element.classList.remove('text-dark');
                element.classList.add('text-light');
            }
        });
      
        // Atualiza os elementos text-light para text-dark se estiver no modo claro
        textLightElements.forEach(element => {
            if (!body.classList.contains('dark-mode')) {
                element.classList.remove('text-light');
                element.classList.add('text-dark');
            }
        });
    }
  
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
  
    updateTextClasses();
  
    lightThemeBtn.addEventListener('click', function () {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        updateTextClasses();
    });
  
    darkThemeBtn.addEventListener('click', function () {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateTextClasses();
    });
});

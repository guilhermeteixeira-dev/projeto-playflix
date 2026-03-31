// Seleciona o botão de alternância de tema
const themeToggle = document.getElementById('themeToggle');

// Se o botão existir, aplica o tema salvo e configura o texto
if (themeToggle) {
    // Lê o tema salvo no localStorage (padrão dark)
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Define o modo atual (claro ou escuro) ao carregar a página
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode'); // classe para modo claro
        themeToggle.textContent = 'Modo Escuro'; // texto do botão
    } else {
        document.body.classList.remove('light-mode'); // mantém modo escuro
        themeToggle.textContent = 'Modo Claro';
    }

    // Evento do clique no botão, alterna entre claro e escuro
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode'); // alterna classe
        const isLight = document.body.classList.contains('light-mode');
        themeToggle.textContent = isLight ? 'Modo Escuro' : 'Modo Claro';
        localStorage.setItem('theme', isLight ? 'light' : 'dark'); // salva escolha
    });
}

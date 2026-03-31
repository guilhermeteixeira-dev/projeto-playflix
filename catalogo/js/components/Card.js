// Importa funções utilitárias do arquivo utils.js
import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

// Função que cria um cartão de filme com imagem, vídeo e detalhes
export function createCard(item) {
    // Cria o elemento div principal do cartão
    const card = document.createElement('div');
    card.className = 'movie-card';
    // Adiciona classe se o item tiver progresso (assistido parcialmente)
    if (item.progress) {
        card.classList.add('has-progress');
    }

    // Cria a imagem de capa do filme
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = `Movie cover`;

    // Cria o iframe para o vídeo do YouTube
    const iframe = document.createElement('iframe');
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; encrypted-media";

    // Extrai o ID do vídeo do YouTube da URL
    const videoId = getYouTubeId(item.youtube);

    // Adiciona o iframe e a imagem ao cartão
    card.appendChild(iframe);
    card.appendChild(img);

    // Gera um badge de idade aleatório
    const ageBadge = getRandomAgeBadge();

    // Cria a seção de detalhes do cartão com botões e informações
    const details = document.createElement('div');
    details.className = 'card-details';
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                ${item.progress ? '<button class="btn-icon"><i class="fas fa-check"></i></button>' : '<button class="btn-icon"><i class="fas fa-plus"></i></button>'}
                <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match-score">${getRandomMatchScore()}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span class="duration">${getRandomDuration(item.progress)}</span>
            <span class="resolution">HD</span>
        </div>
        <div class="details-tags">
            <span>Empolgante</span>
            <span>Animação</span>
            <span>Ficção</span>
        </div>
    `;
    // Adiciona os detalhes ao cartão
    card.appendChild(details);

    // Adiciona ouvinte de evento ao botão de play para reprodução com áudio
    const playButton = details.querySelector('.btn-play-icon');
    playButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede eventos de hover do cartão
        clearTimeout(playTimeout); // Para qualquer reprodução pendente de hover
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&loop=1&playlist=${videoId}`;
        iframe.classList.add('playing');
        img.classList.add('playing-video');
    });

    // Se o item tiver progresso, adiciona uma barra de progresso
    if (item.progress) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`;
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    // Variável para controlar o timeout de reprodução no hover
    let playTimeout;
    // Evento de entrada do mouse: prepara para reproduzir vídeo após 600ms
    card.addEventListener('mouseenter', () => {
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        
        // Adiciona classes para posicionamento baseado na localização do cartão
        if (rect.left < 100) {
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            card.classList.add('origin-right');
        }

        // Inicia reprodução com áudio após delay
        playTimeout = setTimeout(() => {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
            iframe.classList.add('playing');
            img.classList.add('playing-video');
        }, 600);
    });

    // Evento de saída do mouse: para a reprodução e limpa o cartão
    card.addEventListener('mouseleave', () => {
        clearTimeout(playTimeout);
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = "";
        card.classList.remove('origin-left');
        card.classList.remove('origin-right');
    });

    // Retorna o cartão criado
    return card;
}

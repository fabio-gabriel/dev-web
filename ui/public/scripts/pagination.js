function createCard(auction) {
    return `
        <div class="col-12 col-md-4 mb-4">
            <a href="/leilao/${auction.id}" class="card-link">
                <div class="card p-2">
                    <img src="${auction.images[0]}" class="card-img-crop" alt="Card Image 1">
                    <div class="container border py-2 my-3 px-2">
                        <div class="row">
                            <div class="col-6 text-center border-end">
                                Lance:
                                <div class="bid-text">
                                    R$${auction.highestBid.value}
                                </div>
                            </div>
                            <div class="container col-6 text-center">
                                Finaliza em:
                                <div class="row" id="countdown-${auction.id}">
                                    <div class="col-3 border-end g-0">
                                        <strong class="clock-number" id="days-${auction.id}">00</strong><br>
                                        D
                                    </div>
                                    <div class="col-3 border-end g-0">
                                        <strong class="clock-number" id="hours-${auction.id}">00</strong><br>
                                        H
                                    </div>
                                    <div class="col-3 border-end g-0">
                                        <strong class="clock-number" id="minutes-${auction.id}">00</strong><br>
                                        M
                                    </div>
                                    <div class="col-3 g-0">
                                        <strong class="clock-number" id="seconds-${auction.id}">00</strong><br>
                                        S
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <strong>${auction.name}</strong>
                    <p class="card-text">${auction.location}<br>${auction.category}</p>
                </div>
            </a>
        </div>`;
}

function displayLeiloes(auctions, page, itemsPerPage) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedLeiloes = auctions.slice(startIndex, endIndex);

    const container = document.getElementById('leiloes-container');
    container.innerHTML = '';

    paginatedLeiloes.forEach(auction => {
        container.innerHTML += createCard(auction);
        setupCountdown(auction);
    });
}

function setupPagination(auctions, itemsPerPage) {
    const paginationUl = document.getElementById('pagination');
    const totalPages = Math.ceil(auctions.length / itemsPerPage);

    paginationUl.innerHTML = '';  // Limpa a paginação anterior

    // Botão "Anterior"
    if (currentPage > 1) {
        const prevLi = document.createElement('li');
        prevLi.className = 'page-item';
        prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(currentPage - 1)">\u00AB Anterior</a>`;
        paginationUl.appendChild(prevLi);
    }

    // Adiciona os botões de páginas
    for (let i = 1; i <= totalPages; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        paginationUl.appendChild(pageLi);
    }

    // Botão "Próxima"
    if (currentPage < totalPages) {
        const nextLi = document.createElement('li');
        nextLi.className = 'page-item';
        nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(currentPage + 1)">Próxima \u00BB</a>`;
        paginationUl.appendChild(nextLi);
    }
}

function changePage(page) {
    currentPage = page;
    displayLeiloes(auctions, currentPage, itemsPerPage);
    setupPagination(auctions, itemsPerPage);
}

function setupCountdown(auction) {
    const auctionEndDate = new Date(auction.auctionDetails.endDate);

    function updateCountdown() {
        const now = new Date();
        const timeDifference = auctionEndDate - now;

        if (timeDifference <= 0) {
            document.getElementById(`days-${auction.id}`).textContent = '00';
            document.getElementById(`hours-${auction.id}`).textContent = '00';
            document.getElementById(`minutes-${auction.id}`).textContent = '00';
            document.getElementById(`seconds-${auction.id}`).textContent = '00';
            return;
        }

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;

        document.getElementById(`days-${auction.id}`).textContent = String(days).padStart(2, '0');
        document.getElementById(`hours-${auction.id}`).textContent = String(remainingHours).padStart(2, '0');
        document.getElementById(`minutes-${auction.id}`).textContent = String(remainingMinutes).padStart(2, '0');
        document.getElementById(`seconds-${auction.id}`).textContent = String(remainingSeconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    displayLeiloes(auctions, currentPage, itemsPerPage);
    setupPagination(auctions, itemsPerPage);
});

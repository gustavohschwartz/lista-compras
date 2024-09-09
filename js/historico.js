document.addEventListener('DOMContentLoaded', () => {
    const historicoContainer = document.getElementById('historico-lista');
    carregarHistorico();

    function carregarHistorico() {
        let historicoLivros = JSON.parse(localStorage.getItem('historico')) || [];

        historicoContainer.innerHTML = '';

        if (historicoLivros.length === 0) {
            historicoContainer.innerHTML = '<li>Nenhum histórico encontrado</li>';
        } else {
            historicoLivros.forEach(item => {
                let li = document.createElement('li');
                li.textContent = `${item.nome}`;

                const botaoRemover = document.createElement("button");
                botaoRemover.textContent = "Remover";
                botaoRemover.onclick = function () {
                    removerItemDoHistorico(item.nome, li);
                };

                li.appendChild(botaoRemover);
                historicoContainer.appendChild(li);
            });
        }
    }

    function removerItemDoHistorico(nomeItem, itemLista) {
        itemLista.remove();

        let historicoLivros = JSON.parse(localStorage.getItem('historico')) || [];
        historicoLivros = historicoLivros.filter(item => item.nome !== nomeItem);
        localStorage.setItem('historico', JSON.stringify(historicoLivros));

        if (historicoLivros.length === 0) {
            historicoContainer.innerHTML = '<li>Nenhum histórico encontrado</li>';
        }
    }
});

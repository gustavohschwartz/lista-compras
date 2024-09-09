document.addEventListener("DOMContentLoaded", carregarItens);
document.getElementById("formulario").addEventListener("submit", adicionarItem);
document.getElementById("reset-lista").addEventListener("click", resetarLista);
document.getElementById("limpar-lista").addEventListener("click", limparLista);
document.getElementById("historico-lista").addEventListener("click", historico);

function carregarItens() {
    const itens = JSON.parse(localStorage.getItem("itens")) || [];
    itens.forEach(adicionarItemNaDOM);
}

function adicionarItem(e) {
    e.preventDefault();
    const input = document.getElementById("input-item");
    const nomeItem = input.value.trim();

    if (nomeItem !== "") {
        adicionarItemNaDOM({ nome: nomeItem, comprado: false });
        salvarItemNoLocalStorage({ nome: nomeItem, comprado: false });
        input.value = "";
    }
}

function adicionarItemNaDOM(item) {
    const listaItens = document.getElementById("lista-itens");
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.comprado;
    checkbox.onclick = function () {
        atualizarStatusNoLocalStorage(item.nome, checkbox.checked);
        atualizarEstiloItem(li, checkbox.checked);
    };

    const textoItem = document.createElement("span");
    textoItem.textContent = item.nome;
    if (item.comprado) {
        textoItem.classList.add("riscado");
    }

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    itemContainer.appendChild(checkbox);
    itemContainer.appendChild(textoItem);

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.onclick = function () {
        removerItem(item.nome, li);
    };

    li.appendChild(itemContainer);
    li.appendChild(botaoRemover);
    listaItens.appendChild(li);
}


function salvarItemNoLocalStorage(item) {
    const itens = JSON.parse(localStorage.getItem("itens")) || [];
    itens.push(item);
    localStorage.setItem("itens", JSON.stringify(itens));

    const historicoItens = JSON.parse(localStorage.getItem("historico")) || [];
    
    const itemJaNoHistorico = historicoItens.some(historicoItem => historicoItem.nome === item.nome);
    if (!itemJaNoHistorico) {
        historicoItens.push(item);
        localStorage.setItem("historico", JSON.stringify(historicoItens));
    }
}


function atualizarStatusNoLocalStorage(nomeItem, comprado) {
    let itens = JSON.parse(localStorage.getItem("itens")) || [];
    itens = itens.map((item) =>
        item.nome === nomeItem ? { ...item, comprado } : item
    );
    localStorage.setItem("itens", JSON.stringify(itens));
}

function atualizarEstiloItem(li, comprado) {
    const textoItem = li.querySelector("span");
    if (comprado) {
        textoItem.classList.add("riscado");
    } else {
        textoItem.classList.remove("riscado");
    }
}

function removerItem(nomeItem, itemLista) {
    itemLista.remove();
    let itens = JSON.parse(localStorage.getItem("itens")) || [];
    itens = itens.filter((item) => item.nome !== nomeItem);
    localStorage.setItem("itens", JSON.stringify(itens));
}

function resetarLista() {
    const checkboxes = document.querySelectorAll('#lista-itens input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));

    let itens = JSON.parse(localStorage.getItem("itens")) || [];
    itens = itens.map((item) => ({ ...item, comprado: false }));
    localStorage.setItem("itens", JSON.stringify(itens));

    const listaItens = document.getElementById("lista-itens");
    listaItens.querySelectorAll("span").forEach((span) => {
        span.classList.remove("riscado");
    });
}

function limparLista() {
    const listaItens = document.getElementById("lista-itens");
    listaItens.innerHTML = ""; 

    localStorage.removeItem("itens");
}

function historico(){
    const historico = document.getElementById("historico-lista");
    window.location.href = '/lista-compras/html/historico.html'
}

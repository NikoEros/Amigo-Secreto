// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar um amigo à lista
function adicionar() {
  const nome = document.getElementById('nome-amigo').value.trim();
  
  // Verifica se o campo não está vazio
  if (nome !== '') {
    // Verifica se o nome contém apenas números
    if (/^\d+$/.test(nome)) {
      alert('Por favor, digite um nome válido (não pode ser apenas números).');
    } else {
      // Verifica se o nome já está na lista
      if (amigos.includes(nome)) {
        alert('Este nome já foi adicionado à lista de amigos.');
      } else {
        amigos.push(nome);
        atualizarListaAmigos();
        document.getElementById('nome-amigo').value = ''; // Limpa o campo de entrada após adicionar
      }
    }
  } else {
    alert('Por favor, digite um nome de amigo válido.');
  }
}

// Função para atualizar a lista de amigos incluídos
function atualizarListaAmigos() {
  const listaAmigos = document.getElementById('lista-amigos');
  listaAmigos.textContent = amigos.join(', ');
}

// Função para sortear os amigos e exibir o resultado
function sortear() {
    if (amigos.length < 2) {
      alert('Você precisa adicionar pelo menos dois amigos para realizar o sorteio.');
      return;
    }
  
    // Clona o array de amigos para evitar alterações na lista original
    const listaSorteio = amigos.slice();
    const listaEmbaralhada = embaralhar(listaSorteio);
  
    const listaSorteioHTML = listaSorteio.map((amigo, index) => {
      const proximoAmigo = listaEmbaralhada[(index + 1) % listaEmbaralhada.length];
      return `<span class="amigo-nome" onclick="alternarNome(this)">${amigo} --> <span class="amigo-oculto" style="visibility: hidden">${proximoAmigo}</span></span>`;
    }).join('<br>');
  
    const listaSorteioElement = document.getElementById('lista-sorteio');
    listaSorteioElement.innerHTML = listaSorteioHTML;
  }

// Função para embaralhar a ordem dos amigos
function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Variável para controlar se um nome está atualmente visível
let nomeVisivel = false;

// Função para alternar a visibilidade do nome oculto
function alternarNome(element) {
  if (!nomeVisivel) {
    const amigoOculto = element.querySelector('.amigo-oculto');
    if (amigoOculto.style.visibility === 'visible') {
      amigoOculto.style.visibility = 'hidden';
    } else {
      amigoOculto.style.visibility = 'visible';
      nomeVisivel = true;
      setTimeout(() => {
        amigoOculto.style.visibility = 'hidden';
        nomeVisivel = false;
      }, 1500); // 1500 milissegundos = 1.5 segundos
    }
  }
}

// Função para reiniciar o sorteio
function reiniciar() {
  amigos = [];
  document.getElementById('lista-amigos').textContent = '';
  document.getElementById('lista-sorteio').textContent = '';
}

// Definições
const baseUrl = "https://tmdb-proxy.cubos-academy.workers.dev/3/";
const baseParams = "?language=pt-BR&include_adult=false";
const todosFilmes = [];
let i = 0;
let n;

// Carregamento da página
renderizarPagina();
definirTema();
obterFilmesIniciais();
obterFilmeDoDia();

// Navegação filmes
btnNext.addEventListener("click", next);
btnPrevious.addEventListener("click", previous);
document.addEventListener("keydown", navegar);

// Pesquisa
input.addEventListener("keydown", pesquisarFilmes);

// Modal
modal.addEventListener("click", fecharModal);
document.addEventListener("keydown", fecharModal);

// Tema
btnTheme.addEventListener("click", definirTema);

// Atualizar layout
window.addEventListener("resize", atualizarLayout);

async function fetchMoviesJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function obterTema() {
  return localStorage.getItem("data-theme") ?? "light";
}

function fecharModal(event) {
  if (
    (event.target.classList.contains("modal") ||
      event.target.classList.contains("modal__close") ||
      event.key === "Escape") &&
    document.body.classList.contains("modal__open")
  ) {
    modal.classList.add("hidden");
    document.body.classList.remove("modal__open");
  }
}

function renderizarPagina() {
  const tamX = document.documentElement.clientWidth;
  let nNovo = Math.floor((tamX - 82 - 30) / 192);
  if (nNovo === 0) nNovo = 1;
  // if (nNovo === n) return;
  n = nNovo;

  highLight.style.marginLeft = (tamX - 192 * n) / 2 + "px";
  highLight.style.marginRight = (tamX - 192 * n) / 2 + "px";

  // Caso tenha mais de 3 filmes
  if (n > 3) {
    imagemVideo.style.width = 192 * n * 0.55 + "px";
    imagemVideo.style.height = "100%";
    highLight.style.flexDirection = "row";
    highLight.style.gap = "24px";
    return;
  }

  // Caso tenha 2 a 3 filmes
  highLight.style.flexDirection = "column";
  highLight.style.gap = "0px";
  if (n > 1) {
    imagemVideo.style.width = "auto";
    imagemVideo.style.height = "300px";
    return;
  }

  // Caso tenha 1 filme
  highLight.style.marginLeft = "10px";
  highLight.style.marginRight = "10px";
  imagemVideo.style.width = "auto";
  imagemVideo.style.height = "200px";
}

function atualizarLayout() {
  renderizarPagina();
  exibirFilmes(i, n, todosFilmes);
}

function obterFilmesIniciais() {
  fetchMoviesJSON(baseUrl + "discover/movie" + baseParams).then((data) => {
    const filmes = data.results;
    todosFilmes.push(...filmes);
    exibirFilmes(i, n, filmes);
  });
}

function definirTema(acao) {
  let tema;
  const local = obterTema();
  if (!acao) tema = local;
  else tema = local === "light" ? "dark" : "light";
  if (tema === "light") {
    btnTheme.src = "./assets/light-mode.svg";
    btnPrevious.src = "./assets/seta-esquerda-preta.svg";
    btnNext.src = "./assets/seta-direita-preta.svg";
    document.body.classList.remove("dark");
    document
      .querySelectorAll(".movie")
      .forEach((m) => m.classList.remove("dark"));
    localStorage.setItem("data-theme", "light");
  } else if (tema === "dark") {
    btnTheme.src = "./assets/dark-mode.svg";
    btnPrevious.src = "./assets/seta-esquerda-branca.svg";
    btnNext.src = "./assets/seta-direita-branca.svg";
    document.body.classList.add("dark");
    document.querySelectorAll(".movie").forEach((m) => m.classList.add("dark"));
    localStorage.setItem("data-theme", "dark");
  }
}

function pesquisarFilmes(event) {
  if (event.key !== "Enter") return;
  i = 0;

  if (!input.value) {
    fetchMoviesJSON(baseUrl + "discover/movie" + baseParams).then((data) => {
      todosFilmes.length = 0;
      todosFilmes.push(...data.results);
      exibirFilmes(i, n, todosFilmes);
    });
    return;
  }

  const baseUrlBusca = baseUrl + "search/movie" + baseParams + "&query=";

  fetchMoviesJSON(baseUrlBusca + input.value).then((data) => {
    todosFilmes.length = 0;
    todosFilmes.push(...data.results);
    exibirFilmes(i, n, todosFilmes);
  });

  input.value = "";
}

function next() {
  if (todosFilmes.length < n) return;
  if (i < todosFilmes.length - n) {
    i += n;
  } else {
    i = 0;
  }
  exibirFilmes(i, n, todosFilmes);
}

function previous() {
  if (todosFilmes.length < n) return;
  if (i >= n) {
    i -= n;
  } else {
    i = todosFilmes.length - n;
  }
  exibirFilmes(i, n, todosFilmes);
}

function navegar(event) {
  if (document.body.classList.contains("modal__open")) return;
  if (event.key === "ArrowLeft") previous();
  else if (event.key === "ArrowRight") next();
}

function obterFilmeDoDia() {
  const vid = 436969 ?? Math.floor(Math.random() * (500000 - 1)) + 1;
  const videoUrl = baseUrl + "movie/" + vid + "/videos" + baseParams;
  fetchMoviesJSON(videoUrl).then((data) => {
    const videoDoDia = data.results;
    linkVideo.href = "https://www.youtube.com/watch?v=" + videoDoDia[0].key;
  });
  const highlightUrl = baseUrl + "movie/" + vid + baseParams;

  fetchMoviesJSON(highlightUrl).then((data) => {
    const imagemDoDia = data.backdrop_path;
    imagemVideo.style.backgroundImage = "url('" + imagemDoDia + "')";
    highlight__title.textContent = data.title;
    highlight__rating.textContent = data.vote_average.toFixed(1);
    highlight__genres.textContent = data.genres.map((g) => g.name).join(", ");
    highlight__launch.textContent = new Date(
      data.release_date
    ).toLocaleDateString("pt-br", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    highlight__description.textContent = data.overview;
  });
}

function exibirFilmes(i, n, filmes) {
  movies.innerHTML = "";
  for (let j = i; j < i + n; j++) {
    const filme = filmes[j];
    if (!filme) return;

    // Create movie;
    const movie = document.createElement("div");
    movie.classList.add("movie");
    if (filme.backdrop_path)
      movie.style.backgroundImage = "url('" + filme.backdrop_path + "')";
    else movie.style.backgroundImage = "url('./assets/blank.png')";
    movies.appendChild(movie);

    // Create movie info
    const movie__info = document.createElement("div");
    movie__info.classList.add("movie__info");
    movie.appendChild(movie__info);

    // Create movie title
    const movie__title = document.createElement("span");
    movie__title.classList.add("movie__title");
    movie__title.textContent = filme.original_title;
    movie__info.appendChild(movie__title);

    // Create movie rating
    const movie__rating = document.createElement("span");
    movie__rating.classList.add("movie__rating");
    const img = document.createElement("img");
    img.src = "./assets/estrela.svg";
    img.alt = "Estrela";
    movie__rating.append(filme.vote_average.toFixed(1), img);
    movie__info.appendChild(movie__rating);

    // Define theme
    if (obterTema() === "dark") movie.classList.add("dark");

    // Modal
    movie.addEventListener("click", () => {
      modal.classList.remove("hidden");
      document.body.classList.add("modal__open");
      modal__title.textContent = filme.original_title; // Título
      if (filme.backdrop_path) modal__img.src = filme.backdrop_path;
      else modal__img.src = "./assets/blank.png"; // Imagem
      modal__description.textContent = filme.overview; // Descrição
      modal__average.textContent = filme.vote_average; // Nota
      const urlGenre = baseUrl + "movie/" + filme.id + baseParams; // Gêneros
      fetchMoviesJSON(urlGenre).then((data) => {
        const genres = data.genres.map((g) => g.name);
        if (!genres) return;
        modal__genres.innerHTML = "";
        genres.forEach((genre) => {
          const genero = document.createElement("span");
          genero.classList.add("modal__genre");
          genero.textContent = genre;
          modal__genres.appendChild(genero);
        });
      });
    });
  }
}

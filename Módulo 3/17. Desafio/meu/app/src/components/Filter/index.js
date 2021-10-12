import "./index.css";
import plus from "./imgs/plus.svg";

function toggle(collection, item) {
  var idx = collection.indexOf(item);
  if (idx !== -1) {
    collection.splice(idx, 1);
  } else {
    collection.push(item);
  }
}

function Filter({ filtro, setFiltro, lista, setListaFiltrada, categorias }) {
  function handleChange({ target: t }) {
    if (t.type === "checkbox") {
      const array = filtro[t.name];
      toggle(array, t.value);
      setFiltro({ ...filtro, [t.name]: array });
      return;
    }
    setFiltro({ ...filtro, [t.name]: t.value });
  }

  function handleReset() {
    setFiltro({ ...filtro, semana: [], categoria: [], min: "", max: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setListaFiltrada(
      lista.filter((item) => {
        if (filtro.min && filtro.min * 100 > item.value) return false;
        if (filtro.max && filtro.max * 100 < item.value) return false;

        if (filtro.semana.length && !filtro.semana.includes(item.week_day))
          return false;
        if (
          filtro.categoria.length &&
          !filtro.categoria.includes(item.category)
        )
          return false;

        return true;
      })
    );
  }

  return (
    <form className="container-filters box" onSubmit={handleSubmit}>
      <div className="container-filters-div">
        <div className="container-filters-title">Dia da Semana</div>
        <div className="container-filters-group">
          {[
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
            "Domingo",
          ].map((item, index) => {
            return (
              <label
                key={index}
                className={`container-chip box ${
                  filtro.semana.includes(item) ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="semana"
                  value={item}
                  onChange={handleChange}
                />
                <div className="text-filter">{item}</div>
                <div className="icon-filter">
                  <img src={plus} alt="" />
                </div>
              </label>
            );
          })}
        </div>
      </div>
      <div className="container-filters-div">
        <div className="container-filters-title">Categoria</div>
        <div className="container-filters-group">
          {categorias.map((item, index) => {
            return (
              <label
                key={index}
                className={`container-chip box ${
                  filtro.categoria.includes(item) ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="categoria"
                  value={item}
                  onChange={handleChange}
                />
                {item}
                <div className="icon-filter">
                  <img src={plus} alt="" />
                </div>
              </label>
            );
          })}
        </div>
      </div>
      <div className="container-filters-div">
        <div className="container-filters-title">Valor</div>
        <div className="container-filters-group">
          <div className="container-filters-form">
            <label htmlFor="min">Min</label>
            <input
              id="min"
              name="min"
              value={filtro.min}
              onChange={handleChange}
            ></input>
            <label htmlFor="max">Max</label>
            <input
              id="max"
              name="max"
              value={filtro.max}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="buttons-group">
          <button type="reset" onClick={handleReset}>
            Limpar Filtros
          </button>
          <button className="apply" type="submit">
            Aplicar Filtros
          </button>
        </div>
      </div>
    </form>
  );
}

export default Filter;

function Card(props) {
  return (
    <div className="Card">
      <picture className={props.liked ? "liked" : ""}>
        <img onClick={props.click} src={props.img} alt={props.id}></img>
      </picture>
      <div className="Card__desc">
        <div className="desc__title">{props.children}</div>
        <div className="desc__time">Há {props.time} mês</div>
      </div>
    </div>
  );
}

export default Card;
function Modal(props) {
  return (
    <div
      onClick={props.handleClick}
      className={`Modal ${props.visibility ? "" : "hidden"}`}
    >
      <div className="image__area">
        <picture className={props.state ? "liked" : ""}>
          <img
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={props.action}
            src={props.src}
            alt={props.alt}
          ></img>
        </picture>
      </div>
    </div>
  );
}

export default Modal;

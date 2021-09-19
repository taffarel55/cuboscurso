function Modal(props) {
  return (
    <div
      onClick={props.handleClick}
      className={`Modal ${props.visibility ? "" : "hidden"}`}
    >
      <img
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={props.action}
        src={props.src}
        alt={props.alt}
      ></img>
    </div>
  );
}

export default Modal;
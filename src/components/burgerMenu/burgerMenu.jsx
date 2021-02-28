import "./burgerMenu.css";

export default function BurgerMenu(props) {
  return (
    <div
      className="burger-menu"
      onClick={() => {
        props.handleClick();
      }}
    >
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
}

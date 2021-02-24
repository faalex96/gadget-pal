import "./banner.css";

export default function Banner(props) {
  const purpose = props.purpose;
  let element;
  switch (purpose) {
    case "header":
      element = (
        <header>
          <h1>Gadget Pal</h1>
          <h4>Where all your needs are met in one place</h4>
        </header>
      );
      break;
    case "footer":
      element = (
        <footer>
          <h1>Gadget Pal</h1>
          <p>&copy; Created by Aleksandar Fa</p>
        </footer>
      );
      break;
  }
  return element;
}

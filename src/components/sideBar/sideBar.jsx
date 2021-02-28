import "./sidebar.css";

function Button(props) {
  return (
    <button
      type="button"
      id={props.id}
      onClick={(e) => {
        return props.onClick(e);
      }}
    >
      {props.name}
    </button>
  );
}

export default function SideBar(props) {
  return (
    <div id="sidebar" className={props.activity}>
      {props.apps.map((app) => {
        return (
          <Button
            key={app.id}
            onClick={props.handleClick}
            name={app.title}
            id={app.id}
          />
        );
      })}
    </div>
  );
}

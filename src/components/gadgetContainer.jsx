import SideBar from "./sideBar/sideBar";

export default function GadgetContainer(props) {
  return (
    <div className="gadget-contianer">
      <div className="left-side">
        <SideBar
          apps={props.apps}
          handleClick={props.handleClick}
          activity={props.activity}
        />
      </div>
      <div className="right-side">
        <div className="gadget-header">
          <h3>{props.title}</h3>
          <p>{props.note}</p>
        </div>
        <div className="gadget-body">{props.children}</div>
      </div>
    </div>
  );
}

export default function GadgetContainer(props) {
  return (
    <div className="gadget-contianer">
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

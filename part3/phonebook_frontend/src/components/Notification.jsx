const Notification = ({ message, err }) => {
  const style = {
    color: err == null ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (message === null) {
    if (err === null) {
      return null;
    } else return <div style={style}>{err}</div>;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;

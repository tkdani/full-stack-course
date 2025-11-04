const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  if (message === "wrong credentials")
    return <div className="error">{message}</div>;
  return <div className="correct">{message}</div>;
};

export default Notification;

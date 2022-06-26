import { Alert } from "react-bootstrap";
const Error = (props) => {
  return (
    <div>
      <Alert variant="danger">{props.error}</Alert>
    </div>
  );
};

export default Error;

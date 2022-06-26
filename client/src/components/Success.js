import { Alert } from "react-bootstrap";

const Success = (props) => {
  return (
    <div>
      <Alert variant="success">{props.success}</Alert>
    </div>
  );
};

export default Success;

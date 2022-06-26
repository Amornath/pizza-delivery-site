import { Spinner } from "react-bootstrap";
const Loading = () => {
  return (
    <div>
      <Spinner animation="border" size="lg" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;

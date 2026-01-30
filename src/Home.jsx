import { useParams } from "react-router-dom";

const Home = () => {
  const { moduleName } = useParams();

  return <h2 className="fw-bold">Module: {moduleName}</h2>;
};

export default Home;

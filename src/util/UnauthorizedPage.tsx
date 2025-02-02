import { Link } from "react-router";

const UnauthorizedPage: React.FC = () => {
  return (
    <main>
      <section className="main-container">
        <h1 className="header-text">You are not authorized to view this page, please login.</h1>
        <Link to="/">Go back to Home</Link>
      </section>
    </main>
  );
};

export default UnauthorizedPage;

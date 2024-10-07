import "./FourOFour.css";
import { Link } from "react-router-dom";

export default function FourOFour() {
  return (
    <div className="error-page">
      <h1>404 - Lost Your Appetite?</h1>
      <p>
        Looks like this page is as empty as a fridge before grocery day!
      </p>
      <p>
        How about heading back to <Link to="/">our homepage</Link> or checking out some <Link to="/dishes">delicious dishes</Link> instead?
      </p>
      <img src="src/assets/images/empty-plate.png" alt="Empty plate" />
    </div>
  );
}

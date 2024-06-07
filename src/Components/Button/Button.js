import { Link } from 'react-router-dom';
import './Button.css';

function Button(props) {
  return (
    <Link to={props.path} className="Btn">{props.children}</Link>
  );
}

export default Button;
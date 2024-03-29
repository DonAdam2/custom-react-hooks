import { NavLink } from 'react-router-dom';

const NavigationItem = ({ url, label, clicked }) => (
  <li className="navigation-item">
    <NavLink to={url} onClick={clicked}>
      {label}
    </NavLink>
  </li>
);

export default NavigationItem;

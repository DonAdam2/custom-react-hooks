import { Link } from 'react-router-dom';

const Logo = ({ url, logoType, logoLabel, logoUrl, logoSvg }) => {
  let typeOfLogo = '';
  switch (logoType) {
    case 'text':
      typeOfLogo = logoLabel;
      break;
    case 'image':
      typeOfLogo = <img src={logoUrl} alt="logo" />;
      break;
    case 'svg':
      typeOfLogo = logoSvg;
      break;
    default:
      typeOfLogo = '';
      break;
  }
  return (
    <Link to={url} className="logo-wrapper">
      {typeOfLogo}
    </Link>
  );
};

export default Logo;

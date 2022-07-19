import Image from 'next/image';
import logo from '../../public/logo.png';

const Footer = () => {
  return (
    <div className="flex flex-col items-center bg-slate-200 h-28">
      <Image src={logo} height="30" width="120" alt="logo" />
      <p>summas 2022</p>
    </div>
  );
};

export default Footer;

import Link from "next/link";
import Button from "./Button";
type Props = {};

const Navbar: React.FC<Props> = () => {
  return (
    <header className='h-16 border-b border-slate-200 flex items-center justify-between px-24'>
      <Link href='/'>
        <img src='/images/logo-with-text.svg' alt='logo' />
      </Link>
      <Link href='/auth/sign-in'>
        <Button>Sign In</Button>
      </Link>
    </header>
  );
};

export default Navbar;

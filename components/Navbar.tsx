import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import AccountDropdown from "./AccountDropdown";
import Button from "./Button";

type Props = {
  hasSearchInput?: boolean;
};

const Navbar: React.FC<Props> = ({ hasSearchInput = true }) => {
  const [keyword, setKeyword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const router = useRouter();

  const isLoggedIn = true;

  useEffect(() => {
    setKeyword((router.query.keyword as string) || "");
  }, [router.query.keyword]);
  return (
    <header className='h-16 border-b border-slate-200 flex items-center justify-between px-24'>
      <Link href='/'>
        <img src='/images/logo-with-text.svg' alt='logo' />
      </Link>
      {hasSearchInput && (
        <div className='w-[720px] absolute left-1/2 -translate-x-1/2 flex items-center'>
          <MdSearch size={24} className='text-slate-400 mr-4' />
          <input
            className='font-sans text-sm placeholder-slate-400 text-slate-900 outline-none'
            type='text'
            placeholder='Search'
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                router.push(`/search?keyword=${keyword}`);
              }
            }}
          />
        </div>
      )}
      {isLoggedIn && (
        <div className='relative'>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Image
              width={40}
              height={40}
              className='w-10 h-10 rounded-full object-cover'
              src='/images/dummy-avatar.png'
              alt='John Doe'
            />
          </button>
          {isDropdownOpen && <AccountDropdown />}
        </div>
      )}
      {!isLoggedIn && (
        <Link href='/auth/sign-in'>
          <Button>Sign In</Button>
        </Link>
      )}
    </header>
  );
};

export default Navbar;

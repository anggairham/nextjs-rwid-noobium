import Link from "next/link";

type Props = {};

const AccountDropdown: React.FC<Props> = ({}) => {
  const user = {
    name: "John Doe",
    email: "JohnDoe@gmailcom",
  };
  return (
    <div className='w-48 rounded-md border border-x-slate-200 absolute bg-white right-0 top-full'>
      <div className='p-4 border-b border-slate-200'>
        <p className='font-sans text-slate-900 font-bold'>{user.name}</p>
        <p className='font-sanst text-slate-400 text-sm'>{user.email}</p>
      </div>
      <div className='p-4'>
        <ul>
          <li className='mb-3'>
            <Link href='/my-profile'>
              <p className='font-sans text-slate-900 text-xs'>My Profile</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/my-articles'>
              <p className='font-sans text-slate-900 text-xs'>My Article</p>
            </Link>
          </li>
          <li>
            <Link href='#'>
              <button
                className='h-4 font-sans text-red-500 text-xs'
                type='button'
              >
                Sign Out
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountDropdown;

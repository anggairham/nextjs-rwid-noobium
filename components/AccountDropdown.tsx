import Link from "next/link";
import { useRouter } from "next/router";
import useSignOutMutation from "../hooks/mutations/user-sign-out-mutation";
import useUserQuery from "../hooks/query/use-user-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
type Props = {};

const AccountDropdown: React.FC<Props> = ({}) => {
  const userQuery = useUserQuery();
  const signOutMutation = useSignOutMutation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const signOut = async () => {
    try {
      await signOutMutation.mutateAsync();

      queryClient.removeQueries(["user"]);
      toast.success("Sign out Succesfully");
      localStorage.removeItem("access_token");
      router.push("/");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };
  return (
    <div className='w-48 rounded-md border border-x-slate-200 absolute bg-white right-0 top-full'>
      <div className='p-4 border-b border-slate-200'>
        <p className='font-sans text-slate-900 font-bold'>
          {userQuery.data?.name || ""}
        </p>
        <p className='font-sanst text-slate-400 text-sm'>
          {userQuery.data?.email || ""}
        </p>
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
                onClick={signOut}
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

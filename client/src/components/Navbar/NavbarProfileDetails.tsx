"use client";
import { getAuthKey } from "@/helpers/config/envConfig";
import { isLoggedIn, removeUserInfo } from "@/hooks/services/auth.service";
import { useGetMyProfileQuery } from "@/redux/api/features/userApi";
import Link from "next/link";

const NavbarProfileDetails = ({ setOpen }: any) => {
  const userLoggedIn = isLoggedIn();

  const { data, isLoading, isError, refetch, isFetching } =
    useGetMyProfileQuery(
      {},
      {
        skip: !userLoggedIn,
      }
    );

  return (
    <div>
      {/* if logged in */}
      {userLoggedIn && !isLoading && !isError && (
        <div className="flex justify-between border-t pt-5 px-5 items-center ">
          <div>
            <h2 className="font-semibold font-mono">
              Name : {data?.data?.profile?.firstName || "N/A"}{" "}
              {data?.data?.profile?.lastName}{" "}
            </h2>
            <h2 className="text-xs font-semibold font-sans">
              Email : {data?.data?.email}
            </h2>
          </div>
          <div>
            <button
              onClick={() => {
                removeUserInfo(getAuthKey());
                refetch();
              }}
              className="rounded-full px-4 bg-red-400 text-white font-bold hover:bg-red-600 hover:shadow-lg duration-300 transition-all py-1"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* if loading */}

      {(isLoading || isFetching) && (
        <div className="flex justify-center items-center">Loading...</div>
      )}
      {/* if not logged in */}
      {!userLoggedIn && (!isLoading || !isFetching) && (
        <div className="flex justify-center items-center gap-5 lg:gap-10">
          <Link
            onClick={() => setOpen(false)}
            href="/sign-in"
            className="inline-flex items-center rounded-full justify-center px-8 py-3  border-primary border-2  text-black shadow hover:text-gray-100 hover:bg-primary"
          >
            Sign In
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/sign-up"
            className="inline-flex items-center rounded-full justify-center px-8 py-3  border-primary border-2  text-black shadow hover:text-gray-100 hover:bg-primary"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavbarProfileDetails;

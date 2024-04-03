"use client";

import { getAuthKey } from "@/helpers/config/envConfig";
import { isLoggedIn, removeUserInfo } from "@/hooks/services/auth.service";
import { useGetMyProfileQuery } from "@/redux/api/features/userApi";
import { useRouter } from "next/navigation";
import { SlOptions } from "react-icons/sl";
import { Dropdown } from "rsuite";

const KidLayoutNavbar = () => {
  const userLoggedIn = isLoggedIn();
  const renderIconButton = (props: any, ref: any) => {
    return (
      <button className=" bg-white px-2 py-1 rounded-lg " {...props} ref={ref}>
        <SlOptions size={25} />
      </button>
    );
  };
  const router = useRouter();

  const { data, isLoading, isError } = useGetMyProfileQuery(
    {},
    {
      skip: !userLoggedIn,
    }
  );

  return (
    <div className="flex max-w-2xl mx-auto justify-between w-full items-center  h-10     px-4 sm:px-6 lg:px-8">
      <div className="">
        <Dropdown suppressHydrationWarning renderToggle={renderIconButton}>
          {!isLoading && data && (
            <>
              <Dropdown.Item panel style={{ padding: 10, width: 170 }}>
                <p>Signed in as</p>
                <strong className="text-wrap">
                  {data?.data?.profile?.fullName}
                </strong>
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item onClick={() => router.push("/my-account")}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item>Contact Info</Dropdown.Item>
              <Dropdown.Separator />
            </>
          )}

          <Dropdown.Item>FAQ</Dropdown.Item>
          <Dropdown.Item onClick={() => router.push("/")}>Shop</Dropdown.Item>
          {!isLoading && data && (
            <Dropdown.Item
              onClick={() => {
                removeUserInfo(getAuthKey());
                router.push("/sign-in");
              }}
            >
              Sign out
            </Dropdown.Item>
          )}

          {!isLoading && !data && (
            <>
              <Dropdown.Item onClick={() => router.push("/sign-in")}>
                Login
              </Dropdown.Item>
              <Dropdown.Item onClick={() => router.push("/sign-up")}>
                Registration
              </Dropdown.Item>
            </>
          )}
        </Dropdown>
      </div>
      {!isLoading && data && <div className=""> hello</div>}
    </div>
  );
};
export default KidLayoutNavbar;

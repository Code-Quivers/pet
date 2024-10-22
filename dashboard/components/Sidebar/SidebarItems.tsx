"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";

interface SidebarItemProps {
  active?: boolean;
  icon: React.ReactNode;
  text: string;
  url?: string | undefined;
  expanded: boolean;
  subMenu?: SubMenuItemProps[] | null;
}

// We're assuming that the sub-menu items will not have further sub-menu items therefore, it cannot be expanded
interface SubMenuItemProps extends Omit<SidebarItemProps, "expanded"> {
  expanded?: never;
  subMenu?: never;
}

// This component is used to render the sub-menu items when hovered
function HoveredSubMenuItem({ icon, text, active, url }: SubMenuItemProps) {
  return (
    <div
      className={`my-2 rounded-md p-2 ${
        active ? "bg-gray-300" : " hover:bg-indigo-50"
      }`}
    >
      <div>
        <Link
          href={`${url as string}`}
          className="flex items-center justify-center "
        >
          <span className="text-secondary h-6 w-6">{icon}</span>
          <span className="text-red-600 ml-3 w-28 text-start">{text}</span>
          <div className="bg-primary-200 h-1" />
        </Link>
      </div>
    </div>
  );
}

export default function SidebarItem({
  icon,
  url,
  active = false,
  text,
  expanded = false,
  subMenu = null,
}: SidebarItemProps) {
  const [expandSubMenu, setExpandSubMenu] = useState(false);
  const router = useRouter();

  // Calculate the height of the sub-menu assuming each item is 40px tall
  const subMenuHeight = expandSubMenu
    ? `${((subMenu?.length || 0) * 40 + (subMenu! && 15)).toString()}px`
    : 0;

  //
  useEffect(() => {
    if (!expanded) {
      setExpandSubMenu(false);
    }
  }, [expanded]);
  return (
    <>
      <li className="">
        <button
          className={`
         group relative my-1 flex w-full cursor-pointer
         items-center rounded-md px-2 focus-within:outline-none
         py-2  transition-colors
         ${active ? "text-primary-500 bg-[#f1f1f1]" : "hover:bg-[#f1f1f1]"}
         ${!expanded && "hidden sm:flex"}
         ${active && subMenu && "border-l-[3px] border-primary"}
         ${subMenu && !active && "border-l-[3px] border-transparent"}
     `}
          onClick={() => {
            setExpandSubMenu((curr) => expanded && !curr);
            // if no submenu it should go to the parent menu url
            if (!subMenu && url) router.push(url as any);
          }}
        >
          {/* left icon */}
          <span>{icon}</span>
          {/* middle text */}
          <span
            className={`overflow-hidden text-xs text-start transition-all ${
              expanded ? "ml-2 w-44" : "w-0"
            }  ${active ? "font-semibold" : "font-normal"}
            ${subMenu && "!font-medium"}
            `}
          >
            {text}
          </span>
          {/* right icon */}
          {subMenu && (
            <div
              className={`absolute right-2 h-4 w-4${
                expanded ? "" : "top-2"
              } transition-all ${expandSubMenu ? "rotate-90" : "rotate-0"}`}
            >
              <BiChevronRight />
            </div>
          )}

          {/* 
            display item text or sub-menu items when hovered
          */}
        </button>
      </li>
      <ul className="sub-menu pl-6 " style={{ height: subMenuHeight }}>
        {/* 
          Render the sub-menu items if the item has a sub-menu
          The sub-menu items are rendered as SidebarItem components
        */}
        {expanded &&
          subMenu?.map((item, index) => (
            <SidebarItem key={index} {...item} expanded={expanded} />
          ))}
      </ul>
    </>
  );
}

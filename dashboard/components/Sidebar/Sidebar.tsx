import { useEffect, useRef, useState } from "react";
import { BiHome } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { HiEllipsisVertical } from "react-icons/hi2";
import { TbCategory2, TbListDetails, TbReport } from "react-icons/tb";
import SidebarItem from "./SidebarItems";
import {
  RiFileList3Line,
  RiListIndefinite,
  RiUserSettingsLine,
} from "react-icons/ri";
import { LuImagePlus, LuUsers2 } from "react-icons/lu";
import { IoQrCodeSharp } from "react-icons/io5";
import { FcAdvertising, FcList } from "react-icons/fc";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import {
  PiCirclesThreeBold,
  PiSealPercentBold,
  PiSealQuestionBold,
} from "react-icons/pi";
import { MdOutlineFeedback } from "react-icons/md";
import { BsPatchPlus } from "react-icons/bs";
import { VscPreview } from "react-icons/vsc";
import { FaBlog, FaCog } from "react-icons/fa";
import { CgComment } from "react-icons/cg";
import { FaUsersGear } from "react-icons/fa6";
import { usePathname } from "next/navigation";

// This sidebar component is for both mobile and desktop
function Sidebar({ children, expanded, setExpanded }: any) {
  const sidebarRef = useRef<HTMLUListElement | null>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  // Check if the content overflows
  useEffect(() => {
    const checkOverflow = () => {
      if (sidebarRef.current) {
        const hasOverflow =
          sidebarRef.current.scrollHeight > sidebarRef.current.clientHeight;

        setIsOverflow(hasOverflow);
      }
    };

    // Check on load
    checkOverflow();

    // Check on window resize
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);
  return (
    <div className="relative">
      <aside
        className={`box-border h-screen transition-all ${
          expanded ? "w-5/6 sm:w-64" : "w-0 sm:w-20"
        }`}
      >
        <nav className="flex h-full flex-col    ">
          <div
            className={`flex px-2 sticky top-0 py-5 items-center justify-between ${
              !expanded ? "flex-col-reverse" : "flex-row pl-4 "
            }`}
          >
            <div>
              <h2 className="font-bold">E.T Home</h2>
            </div>
          </div>

          <ul
            ref={sidebarRef}
            className={`flex-1 p-2.5 sidebar-list overflow-y-auto space-y-2 ${
              isOverflow ? "scrollbar-visible" : "scrollbar-hidden"
            }`}
          >
            {children}
          </ul>

          {/* footer */}
          <div className="flex  bg-white sticky bottom-0 border-t p-3">
            <div
              className={`
              flex items-center justify-between
              overflow-hidden transition-all ${expanded ? "ml-3 w-52" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Shafin Rahman</h4>
                <span className="text-xs text-gray-600">
                  shafinur512@gmail.com
                </span>
              </div>
              <HiEllipsisVertical className="h-6 w-6" />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default function MakeSidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathName = usePathname();
  const navBarItems = [
    {
      icon: <BiHome size={20} />,
      text: "Dashboard",
      url: "/",
      active: pathName === "/",
    },

    {
      icon: <AiOutlineProduct size={20} />,
      text: "Products Management",
      active: pathName.startsWith("/products"),
      subMenu: [
        {
          icon: <RiListIndefinite size={20} />,
          text: "All Products",
          url: "/products",
          active: pathName === "/products",
        },
        {
          icon: <LuImagePlus size={20} />,
          text: "Add New Product",
          url: "/products/add-products",
          active: pathName === "/products/add-products",
        },
        {
          icon: <IoQrCodeSharp size={20} />,
          text: "Products & Barcode",
          url: "/products/products-barcode",
          active: pathName === "/products/products-barcode",
        },
        {
          icon: <TbCategory2 size={20} />,
          text: "Category Management",
          url: "/products/category",
          active: pathName === "/products/category",
        },
      ],
    },
    {
      icon: <TbReport size={20} />,
      text: "Order & Reports",
      active: pathName.startsWith("/orders"),
      subMenu: [
        {
          icon: <FcList size={20} />,
          text: "Order Reports",
          url: "/orders/order-reports",
          active: pathName === "/orders/order-reports",
        },
        {
          icon: <LiaFileInvoiceDollarSolid size={20} />,
          text: "Payment List",
          url: "/orders/payment-list",
          active: pathName === "/orders/payment-list",
        },
      ],
    },
    {
      icon: <MdOutlineFeedback size={20} />,
      text: "Campaigns & Insights",
      active: pathName.startsWith("/insights"),
      subMenu: [
        {
          icon: <PiSealQuestionBold size={20} />,
          text: "Add Product Q&A",
          url: "/insights/product-qa",
          active: pathName === "/insights/product-qa",
        },
        {
          icon: <BsPatchPlus size={20} />,
          text: "Add Promo Code",
          url: "/insights/promo-code",
          active: pathName === "/insights/promo-code",
        },
        {
          icon: <VscPreview size={20} />,
          text: "Testimonials",
          url: "/testimonial",
          active: pathName === "/insights/testimonial",
        },
        {
          icon: <RiFileList3Line size={20} />,
          text: "Product Reviews",
          url: "/insights/product-reviews",
          active: pathName === "/insights/product-reviews",
        },
        {
          icon: <FcAdvertising size={20} />,
          text: "Advertisement Settings",
          url: "/products/ad",
          active: pathName === "/insights/advertisement",
        },
        {
          icon: <PiSealPercentBold size={20} />,
          text: "Tax Settings",
          url: "/insights/tax-settings",
          active: pathName === "/insights/tax-settings",
        },
      ],
    },
    {
      icon: <TbListDetails size={20} />,
      text: "Content Management",
      subMenu: [
        {
          icon: <FaBlog size={20} />,
          text: "Blogs",
          url: "/contents/blogs",
          active: pathName === "/contents/blogs",
        },
        {
          icon: <CgComment size={20} />,
          text: "Blog Comments",
          url: "/contents/blogs/comments",
          active: pathName === "/contents/blogs/comments",
        },
        {
          icon: <PiCirclesThreeBold size={20} />,
          text: "Band List",
          url: "/contents/bands",
          active: pathName === "/contents/bands",
        },
      ],
    },

    {
      icon: <FaUsersGear size={20} />,
      text: "User Management",
      active: pathName.startsWith("/users"),
      subMenu: [
        {
          icon: <LuUsers2 size={20} />,
          text: "Clients",
          url: "/users/client-list",
          active: pathName === "/users/client-list",
        },
        {
          icon: <RiUserSettingsLine size={20} />,
          text: "User Settings",
          url: "/users/user-managements",
          active: pathName === "/users/user-managements",
        },
        {
          icon: <FaCog size={20} />,
          text: "Account Settings",
          url: "/users/account-settings",
          active: pathName === "/users/account-settings",
        },
      ],
    },
  ];

  // Desktop Sidebar
  return (
    <div className="bg-gradient-to-r from-blue-50/70 via-blue-50/40 to-cyan-50/40 animate-gradient-morph bg-[length:200%_200%]">
      <Sidebar expanded={expanded} setExpanded={setExpanded}>
        <div className="text-[10px] text-gray-400 mt-3">
          <p>Main Menu</p>
        </div>
        {navBarItems.map((item, index) => (
          <SidebarItem key={index} expanded={expanded} {...item} />
        ))}
      </Sidebar>
    </div>
  );
}

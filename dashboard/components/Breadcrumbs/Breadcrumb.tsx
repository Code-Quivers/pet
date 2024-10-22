"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface BreadcrumbProps {
  pageName?: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav>
        <ol className="flex items-center gap-2">
          <li className="font-normal text-sm">
            {pathName === "/" ? (
              ""
            ) : (
              <>
                <Link
                  href="/"
                  className={
                    pathName !== "/"
                      ? "text-[#acaaad] hover:underline"
                      : "text-menu_black"
                  }
                >
                  Dashboard
                </Link>{" "}
                {pathName !== "/" &&
                  pathName
                    .split("/")
                    .filter(Boolean) // Remove empty strings from the split
                    .map((segment, index, arr) => {
                      const isLast = index === arr.length - 1; // Check if it's the last segment
                      const fullPath = `/${arr.slice(0, index + 1).join("/")}`; // Construct the URL up to the current segment

                      // Capitalize each word in the segment split by '-'
                      const capitalizedSegment = segment
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ");

                      return isLast ? (
                        // If it's the last segment, render text instead of a link
                        <span key={fullPath} className="text-black font-medium">
                          &nbsp; <span className="text-[#acaaad]">/ </span>
                          {capitalizedSegment}
                        </span>
                      ) : (
                        // Render a link for all segments except the last
                        <Link href={fullPath} key={fullPath}>
                          &nbsp; <span className="text-[#acaaad]">/ </span>
                          <span className="text-[#acaaad]  hover:underline">
                            {capitalizedSegment}
                          </span>
                        </Link>
                      );
                    })}
              </>
            )}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;

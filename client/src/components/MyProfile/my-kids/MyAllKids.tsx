"use client";

import { fileUrlKey } from "@/helpers/config/envConfig";
import { useGetMyAllKidsQuery } from "@/redux/api/features/kids/kidApi";
import Image from "next/image";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Pagination, Placeholder } from "rsuite";
import DeleteKidConfirmationModal from "./DeleteKidConfirmationModal";
import { useState } from "react";
import { formatDuration } from "@/utils/kids/kidsAgeFormatDuration";

const MyAllKids = () => {
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetMyAllKidsQuery({});

  // ! delete kid
  const [deleteData, setDeleteData] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const handleClose = () => setIsOpenDelete(false);

  return (
    <div className="py-5">
      {/*  */}
      <div className="my-2">
        {/* if loading */}
        {isLoading && (
          <div>
            <Placeholder.Graph active height={450} />
          </div>
        )}
        {/* if no data */}
        {!isLoading && !data?.data?.length && (
          <div className="flex justify-center items-center min-h-[50vh]">
            <h2>No Data Available</h2>
          </div>
        )}

        {/*   if data retrieved */}
        {!isLoading &&
          data?.data?.map((singleKid: any) => (
            <div
              key={singleKid?.id}
              className="border shadow-lg border-gray-300 rounded-lg md:rounded-3xl   "
            >
              <div className=" p-1 space-y-3">
                {/* Image */}
                <div className="flex justify-center items-center p-1 lg:p-4">
                  <Image
                    width={1000}
                    height={1000}
                    alt="Kid Photo"
                    // src={`${fileUrlKey()}/${singleKid?.kidImage}`}
                    src={
                      singleKid?.kidImage
                        ? `${fileUrlKey()}/${singleKid?.kidImage}`
                        : "/images/defaultPhoto.webp"
                    }
                    className="h-[300px] sm:h-[400px] md:h-[500px] w-full object-center object-cover rounded-lg md:rounded-3xl"
                  />
                </div>

                <div className="space-y-2 md:pt-3 md:pb-5 ">
                  {/* Name */}
                  <div className="flex justify-center items-center text-center  ">
                    <h2 className="text-3xl md:text-5xl font-bold">
                      {singleKid?.firstName} {singleKid?.lastName}
                    </h2>
                  </div>

                  {/* Age */}
                  <div className="flex justify-center items-center text-center  ">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {formatDuration(singleKid?.kidAge)}
                    </h2>
                  </div>

                  {/* Contacts */}
                  <div className="flex  justify-center items-center text-center  ">
                    <h2 className="md:text-xl font-semibold">
                      Total Contacts: {singleKid?.relations?.length}
                    </h2>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex justify-center border-t  items-center p-2 md:py-5 md:px-5">
                  <div className="flex justify-between w-full items-center gap-2 md:gap-5">
                    {/* View */}
                    <div>
                      <Link
                        href={`/tag/${singleKid?.barCode?.code}`}
                        className="text-green-600"
                      >
                        <LuEye size={30} />
                      </Link>
                    </div>
                    {/* Edit */}
                    <div>
                      <Link
                        href={`/my-account/edit/${singleKid?.barCode?.code}`}
                        className="text-blue-600"
                      >
                        <FiEdit size={30} />
                      </Link>
                    </div>
                    {/* Delete */}
                    <div>
                      <button
                        className="text-[#eb0712db]"
                        onClick={() => {
                          setIsOpenDelete(true);
                          setDeleteData(singleKid);
                        }}
                      >
                        <RiDeleteBin5Line size={30} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* table */}

      <div className="mt-10">
        <Pagination
          total={data?.data?.length || 0}
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="md"
          layout={["total", "-", "limit", "skip"]}
          limitOptions={[10, 20, 30, 50, 100, 150, 200]}
          limit={10}
          // onChangeLimit={(limitChange) => setSize(limitChange)}
          // activePage={page}
          // onChangePage={setPage}
        />
      </div>
      <>
        {/* delete kid modal */}
        <DeleteKidConfirmationModal
          handleClose={handleClose}
          open={isOpenDelete}
          deleteData={deleteData}
        />
      </>
    </div>
  );
};

export default MyAllKids;

import React from "react";

const AlwaysAdventure = () => {
  return (
    <div className="md:pb-20  ">
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="w-full  md:w-1/2 bg-gray-100 flex flex-col justify-center items-center py-6">
          <div className="flex flex-col justify-center items-center px-4">
            <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-5xl text-center">
              Always Adventure Ready. How Does It Work?
            </h2>
            <p className="mb-6 font-medium tracking-wide text-gray-600   text-xl text-center">
              Finding the line between safe phone exposure and emergency
              connection. A bright yellow yield symbol and clear communication
              on the band face ensures that anyone can easily and quickly
              understand and assist. When tapped to a smartphone or scanned by
              the camera your E.T Phone Home band instantly loads your secure
              profile with all your contact information. With clear and simple
              options to call, text, video call or share accurate GPS location,
              connection is instant and unlimited with as many contacts as you
              choose. So simple a toddler can do it. Easy as 1, 2, 3
            </p>
            <ul className="list-decimal list-inside mb-6 text-xl font-semibold tracking-tight text-gray-500   max-w-5xl leading-8 mx-auto pt-4 text-center ">
              <li>Order & Receive your band </li>
              <li>Upload your contact information</li>
              <li>
                Wear your band and enjoy worry free adventures knowing
                connection is just a tap away
              </li>
            </ul>
            <a
              href="#"
              className="inline-flex items-center rounded-full justify-center px-8 py-3  border-primary border-2 hover:border-blue-500 text-black shadow hover:text-gray-100 hover:bg-blue-500 "
            >
              Shop Now
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:mb-0 mb-8">
          <div className="relative  md:mr-0 w-full">
            <div className="relative overflow-hidden rounded-7xl">
              <img
                src="https://i.ibb.co/m47x7rx/phone2-540x.jpg"
                alt=""
                className="relative z-10 object-cover w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlwaysAdventure;

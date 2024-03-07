import React from "react";

const SingleBlogComment = () => {
  return (
    <div className=" flex justify-start items-center ">
      <div className="w-full">
        <form
          className=" w-full p-4 rounded shadow-md"
          action="/submit-comment"
          method="post"
        >
          <h2 className="text-xl mb-4 tracking-wider font-lighter text-gray-900 ">
            Leave a Comment
          </h2>
          <p className="text-gray-600 mb-4">
            Your email address will not be published. Required fields are marked
            *
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="mb-4 col-span-1 md:col-span-3">
              <textarea
                id="comment"
                name="comment"
                className="w-full px-3 py-2 
                 rounded-sm border  border-gray-300 focus:outline-none border-solid focus:border-dashed resize-none"
                placeholder="Type Comment...*"
                rows="5"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 
                 rounded-sm border 
                  border-gray-300 focus:outline-none border-solid focus:border-dashed"
                placeholder="Name*"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 
                 rounded-sm border 
                  border-gray-300 focus:outline-none border-solid focus:border-dashed"
                placeholder="Email*"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="website"
                name="website"
                className="w-full px-3 py-2 
                 rounded-sm border 
                 border-gray-300 focus:outline-none border-solid focus:border-dashed"
                placeholder="Website"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-4 px-6 bg-blue-950 text-white rounded-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
            >
              Post Comment →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleBlogComment;

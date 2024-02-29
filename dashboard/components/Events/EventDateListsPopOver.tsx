// "use client";

// import moment from "moment";
// import { useState } from "react";
// import { Accordion, InlineEdit, List, Placeholder, TagPicker } from "rsuite";

// const EventDateListsPopOver = ({ rowData }: { rowData: any }) => {
//   // console.log("rowData......", rowData);

//   // Hall List map
//   // const halls = rowData?.hallList?.map((hall: any) => ({
//   //   label: hall.hallName,
//   //   value: hall.hallId,
//   // }));

//   // console.log("hallList....", halls);

//   return (
//     <div>
//       <div className="p-3">
//         <div>
//           <h3 className="font-medium text-base">
//             Event Name : {rowData?.name}
//           </h3>
//           <h2 className="text-base font-medium">Halls Name :</h2>
//           {rowData?.EventDate?.length ? (
//             <div>
//               <div className="flex flex-wrap gap-2 mt-2 border rounded-lg border-[#e5e5ea] p-3 ">
//                 {/* {rowData?.hallList?.map((hall: any) => (
//                   <div key={Math.random()}>
//                     <p className="bg-primary rounded-full text-white px-3 py-0.5">
//                       {hall?.hallName}
//                     </p>
//                   </div>
//                 ))} */}
//                 <InlineEdit
//                   placeholder="Click to edit ..."
//                   style={{ width: 300 }}
//                   defaultValue={["Bryan", "Linda", "Nancy", "Lloyd"]}
//                 >
//                   <TagPicker data={data} block className="!z-99999" />
//                 </InlineEdit>
//               </div>
//             </div>
//           ) : (
//             <p className="text-md font-medium p-5">No Halls Found</p>
//           )}
//         </div>
//         {/* accordion */}
//         <div className="mt-3">
//           <div className="overflow-y-scroll  max-h-[300px]  ">
//             <div className="  p-2 border-[##e5e5ea]">
//               <p className="font-medium text-base">Event Date: </p>
//               <p>
//                 {rowData?.EventDate?.length ? (
//                   rowData?.EventDate?.map((single: any, index: number) => (
//                     <List hover key={Math.random()}>
//                       <List.Item className="flex justify-between px-3 text-lg ">
//                         <div>{moment(single?.eventDate).format("l")}</div>
//                         <div> {single?.title}</div>
//                       </List.Item>
//                       {/* <div key={Math.random()}>
//                         <h2 className="text-base font-medium">
//                           Halls Name : -
//                         </h2>
//                         <div className="flex flex-wrap gap-2 mt-2 border rounded-lg border-[#e5e5ea] p-3">
//                           {single?.halls?.map((hall: any) => (
//                             <div key={Math.random()}>
//                               <p className="bg-primary rounded-full text-white px-3 py-0.5">
//                                 {hall?.hallName}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </div> */}
//                     </List>
//                   ))
//                 ) : (
//                   <p className="text-md font-medium p-5">No Event Date Found</p>
//                 )}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDateListsPopOver;

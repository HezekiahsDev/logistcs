import { ShipmentsDetail, ShipmetsNotification } from "./ShipmentsComponents";

const Shipments = () => {
  return (
    <div className="mt-20 flex items-start flex-col lg:flex-row w-full gap-2 lg:gap-6">
      <div className="w-full lg:w-[70%] bg-[#FFFFFF] rounded-xl shadow-md p-4">
        <ShipmentsDetail />
      </div>
      <div className="w-full lg:w-[30%] bg-[#FFFFFF] rounded-xl shadow-md p-4">
        <ShipmetsNotification />
      </div>
    </div>
  );
};

export default Shipments;

import Image from "next/image";
import { shipmentsData, messageData } from "./shipmentsData";
import StarRating from "./StarRating";

export const ShipmentsDetail = () => {
  return (
    <div className="text-[#323F4B] space-y-4">
      <h3 className="font-semibold">Requests {`(${shipmentsData.length})`}</h3>
      {shipmentsData.map(
        ({ id, name, date, room, star, quantity, weight, price, avatar }) => (
          <div
            key={id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 py-2 border-b lg:border-none"
          >
            <div className="flex items-start space-x-3">
              <Image
                src={avatar}
                alt={name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h6 className="font-poppins text-sm font-semibold">{name}</h6>
                  <StarRating rating={star} />
                </div>
                <p className="text-xs text-[#7B8794]">{date}</p>
                <p className="font-semibold text-xs bg-[#F5F7FA] p-1 rounded-full inline-block">
                  {room}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div>
                <p className="text-xs font-medium text-[#9BA9BB]">Quantity</p>
                <p className="text-sm font-bold text-[#192A3E]">
                  {quantity} Package
                </p>
              </div>

              <div className="md:border-l md:pl-3">
                <p className="text-xs font-medium text-[#9BA9BB]">Weight</p>
                <p className="text-sm font-bold text-[#192A3E]">{weight} Kg</p>
              </div>

              <div className="md:border-l md:pl-3">
                <p className="text-xs font-medium text-[#9BA9BB]">Price</p>
                <p className="text-sm font-bold text-[#192A3E]">${price}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="text-xs font-semibold text-[#1F2933] hover:text-[#DA127D] transition-all">
                Decline
              </button>
              <button className="border border-[#DA127D] text-[#DA127D] font-semibold text-xs rounded px-3 py-1 hover:bg-[#DA127D] hover:text-white transition-all">
                Accept
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export const ShipmetsNotification = () => {
  return (
    <div className="text-[#323F4B] space-y-4">
      <h3 className="font-semibold"></h3>
      {messageData.map(({ id, name, message, time, status, avatar }) => (
        <div
          key={id}
          className="flex items-center p-2 space-x-2 hover:bg-[#F5F7FA] rounded-md transition-all cursor-pointer"
        >
          <div className="relative">
            {status === "unread" && (
              <div className="absolute top-4 -left-3 bg-[#BA2525] w-2 h-2 rounded-full"></div>
            )}
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm">
              <Image
                src={avatar}
                alt={name}
                width={30}
                height={30}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-1 w-full">
            <div className="flex items-center justify-between">
              <h6 className="text-sm text-[#1F2933] font-medium">{name}</h6>
              <p className="text-xs font-normal text-[#7B8794]">{time}</p>
            </div>
            <p
              className={`text-xs ${
                status === "unread"
                  ? "text-[#52606D] font-semibold"
                  : "font-normal text-[#7B8794]"
              }`}
            >
              {message.length > 30 ? message.substring(0, 30) + "..." : message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

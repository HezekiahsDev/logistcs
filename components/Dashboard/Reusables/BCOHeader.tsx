import Image from "next/image";

const BCOHeader = () => {
  return (
    <div className="w-[100%] bg-[#A5C4D4] px-10 py-4 h-[10vh] md:h-[5vh] lg:h-[10vh]">
      <Image
        src="/ubuntu-logo.png"
        width={100}
        height={100}
        alt="Ubuntu Logo"
      />
    </div>
  );
};

export default BCOHeader;

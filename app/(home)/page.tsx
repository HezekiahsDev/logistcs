import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Info, services } from "@/constants/constants";
import FeatureNews from "@/components/home/Feature-news";

function Home() {
  return (
    <div className="min-h-screen bg-[url(/sky.png)]">
      <main className="">
        {/* Hero Section */}
        <section className="relative h-[500px]">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/herovid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl text-center font-bold text-white mb-6">
                Welcome to The UBUNTU LOGISTICS
              </h1>
              <p className="w-[50%] mx-auto text-center text-white text-lg font-semibold">
                The THE UBUNTU LOGISTICS is a big BU of Indo-Trans Logistics
                Corporation and ITL Logistics to tap into Africa fast growing
                market and increasing needs for integrated logistics solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="container px-24 sm:px-2 md:px-16 lg:px-52 mx-auto -mt-20 relative z-10">
          <div className="grid sm:grid-cols-3 gap-6">
            {Info.map((info) => (
              <Card className="p-6 bg-white shadow-lg " key={info.title}>
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-[#4a2828] p-3 rounded-full">
                    <info.icon className="h-9 w-9 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
        <section className="container mt-5 mx-auto">
          <div className="flex place-content-center">
            <Image src="/Banner.png" alt="Banner" width={900} height={800} />
          </div>
        </section>
        <section className="container mx-auto mt-8">
          <div className="flex gap-3 flex-col w-full lg:flex-row md:max-w-[100%] lg:max-w-[60%] px-2 md:px-16">
            <div className="mx-auto pt-1.5">
              <Image src="/LogoU.png" alt="Logo" width={100} height={100} />
            </div>
            <div className="space-y-2 text-center md:text-start">
              <h1 className="font-bold text-xl  md:text-3xl text-[#4a2828]">
                Introduction The UBUNTU LOGISTICS
              </h1>
              <p>
                ITL Logistics is a big BU of Indo-Trans Logistics Corporation
                and ITL Logistics to tap into Vietnam’s fast growing market and
                increasing needs for integrated logistics solutions.
              </p>
              <p>
                ITL Logistics combines the expertise and experience that both
                have built up over many years in South East Asia to offer
                integrated logistics solutions and strategic value to our
                clients.
              </p>
              <p>
                ITL Logistics is one of the market leaders in Integrated
                Logistics Service, delivering high quality services to satisfy
                clients’ complex logistics needs to grow your business.
              </p>
            </div>
          </div>
          <Image
            src="/BannerTruck.png"
            alt="good"
            width={1300}
            height={500}
            className="object-cover mx-auto"
          />
        </section>
        <section className="bg-white pb-8">
          <div className="text-center py-4 pt-8 px-4">
            <div className="mb-4">
              <Image
                src="/LogoU.png"
                alt="Ubuntu Logistics Logo"
                width={60}
                height={60}
                className="mx-auto"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1">
              Service The Ubuntu Logistics
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              The first modern LOGISTICS is a hub for all of East Africa&apos;s
              logistics operations and it&apos;s objective is to run a network
              that provides superior service.
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-2 md:px-20 ">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#4a2828]">
                    <h3 className="text-white text-center text-lg font-medium">
                      {service.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-10">
          <Image
            src="/upl.png"
            alt="UPL"
            priority
            width={1300}
            height={500}
            className="object-cover mx-auto"
          />
        </section>

        <section className="bg-white">
          <FeatureNews />
        </section>
      </main>
    </div>
  );
}

export default Home;

'use client'
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';

interface SiteConfigurationState {
  name: string;
  visibility: boolean;
  subdomain: string;
  customDomain: string;
  logo: File | null;
  favicon: File | null;
}

const SiteConfiguration = () => {
  const [config, setConfig] = useState<SiteConfigurationState>({
    name: 'SaaS Design Studio Knowledge',
    visibility: true,
    subdomain: 'saas-design',
    customDomain: '',
    logo: null,
    favicon: null,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleVisibilityChange = (checked: boolean) => {
    setConfig((prev) => ({ ...prev, visibility: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'favicon') => {
    if (e.target.files && e.target.files.length > 0) {
      setConfig((prev) => ({ ...prev, [field]: e.target.files?.[0] || null }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 border-2 border-white bg-white">
      <Head>
        <title>Site Configuration</title>
      </Head>

      <div className="space-y-10">
        {/* Basics Section */}
        <section>
          <h2 className="text-xl font-medium text-[#171A1F] mb-6">Basics</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-32 text-sm  text-[#171A1F]">Name</div>
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  value={config.name}
                  onChange={handleTextChange}
                  className="w-80 px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100"
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-32 text-sm text-[#171A1F]">Visibility</div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={config.visibility}
                  onCheckedChange={handleVisibilityChange}
                  className="data-[state=checked]:bg-green-500"
                />
                <Link 
                  href="#" 
                  className="text-blue-600 text-sm hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Visit site
                </Link>
              </div>
            </div>
            <div className="flex items-start pt-1 pb-3">
              <div className="w-32"></div>
              <div className="text-xs text-gray-500">
                Turns your site on or off to visitors.
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-32 text-sm text-[#171A1F]">Sub-domain</div>
              <div className="flex items-center">
                <input
                  type="text"
                  name="subdomain"
                  value={config.subdomain}
                  onChange={handleTextChange}
                  className="w-40 px-3 py-2 rounded-l-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100"
                />
                <span className="px-3 py-2 bg-[#DEE6EA] border border-l-0 border-gray-300 rounded-r-md text-[#171A1F]">
                  .helpscoutdocs.com
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-32 text-sm text-[#171A1F]">Custom Domain</div>
              <div className="flex-1">
                <input
                  type="text"
                  name="customDomain"
                  value={config.customDomain}
                  onChange={handleTextChange}
                  placeholder="optional"
                  className="w-80 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-32"></div>
              <div className="text-xs text-gray-500">
                <Link 
                  href="#" 
                  className="text-blue-600 hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Follow these instructions
                </Link>
                {" to point a custom domain to Help Scout."}
                <div className="mt-1">
                  Domains and SSL certificates can take up to 24 hours to take effect.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Branding Section */}
        <section>
          <h2 className="text-xl font-medium text-gray-700 mb-6">Branding</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-32 text-sm text-[#171A1F] pt-2">Logo</div>
              <div className="flex-1">
                <label className="inline-block px-4 py-1 bg-[#EFEFEF] border-2 border-gray-400 rounded-md cursor-pointer hover:bg-gray-50">
                  <span className="text-sm  text-[#171A1F]">Choose file</span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'logo')}
                  />
                </label>
                <span className="ml-3 text-sm text-[#171A1F]">
                  {config.logo ? config.logo.name : 'No file chosen'}
                </span>
                <div className="mt-2 text-xs text-gray-500">
                  Will be re-sized to 75px height. JPG, GIF and PNG are accepted
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-32 text-sm text-[#171A1F] pt-2">Favicon</div>
              <div className="flex-1">
                <div className="mb-2">
                  
                    <Image
                    src='/file.svg'
                    alt='file'
                    width={40}
                    height={40}
                    />
                  {/* </div> */}
                </div>
                <label className="inline-block px-4 py-1 bg-[#EFEFEF] border-2 border-gray-400  rounded-md cursor-pointer hover:bg-gray-50">
                  <span className="text-sm text-[#171A1F]">Choose file</span>
                  <input
                    type="file"
                    accept=".ico,.png"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'favicon')}
                  />
                </label>
                <span className="ml-3 text-sm text-[#171A1F]">
                  {config.favicon ? config.favicon.name : 'No file chosen'}
                </span>
                <div className="mt-2 text-xs text-gray-500">
                  This icon is used in the browser to identify your website.
                  <div>32x32 ICO and PNG file types are accepted.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SiteConfiguration;
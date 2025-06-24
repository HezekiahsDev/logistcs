"use client"

import { FileText } from "lucide-react"
import Image from "next/image"

export default function DocumentsTab() {
  return (
    <div className="flex gap-6">
      {/* Documents Section */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <img src="/icons/info.svg" alt="" className="w-5 h-5 text-[#000]" />
          <span className="text-[#000] font-semibold">Shipment Details</span>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <div className="text-[#000] font-medium mb-2">Commercial Invoice</div>
            <div className="flex items-center gap-6 p-3">
              <FileText className="w-5 h-5 text-[#000]" />
              <div>
                <div className="text-[#000] font-bold">Document.Jpg</div>
                <a href="#" className="text-[#000] text-sm underline">
                  View File
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[#000] font-medium mb-2">Packing List</div>
            <div className="flex items-center gap-2 p-3">
              <FileText className="w-5 h-5 text-[#000]" />
              <div>
                <div className="text-[#000] font-bold">Document.Jpg</div>
                <a href="#" className="text-[#000] underline text-sm">
                  View File
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-[#000] font-medium mb-2">Bill of Loading</div>
          <div className="text-[#000] font-bold">N/A</div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <img src="/icons/info.svg" alt="" className="w-5 h-5 text-[#000]" />
            <span className="text-[#000] font-semibold">Other Documents</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[#000] font-medium mb-2">Document Title</div>
              <div className="flex items-center gap-2 p-3 ">
                <FileText className="w-5 h-5 text-[#000]" />
                <div>
                  <div className="text-[#000] font-bold">Document.Jpg</div>
                  <a href="#" className="text-[#000] text-sm underline">
                    View File
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[#000] font-medium mb-2">Document Title</div>
              <div className="flex items-center gap-2 p-3">
                <FileText className="w-5 h-5 text-[#000]" />
                <div>
                  <div className="text-[#000] font-bold">Document.Jpg</div>
                  <a href="#" className="text-[#000] text-sm underline">
                    View File
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Document Section */}
      <div className="w-[350px] bg-[#C0DBFB5E] rounded-lg p-6">
        <h2 className="text-[#000] text-center text-lg font-bold mb-2">Upload Document</h2>
        <p className="text-[#000] text-center text-sm mb-6">Upload the specified and approved document format.</p>

        <div className="bg-[#C0DBFB5E] border-2 border-dashed border-[#C0DBFB5E] rounded-lg p-6 flex flex-col items-center justify-center mb-6">
          <div className="text-center">
            <Image src="/icons/downloadimg.svg" alt="Upload" width={60} height={60} className="mx-auto mb-2" />
            <div className="text-[#2d9cdb] font-bold">Document.pdf</div>
            <button className="text-[#2d9cdb] text-sm">Select File</button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[#000] font-bold mb-2">
            Document Title <span className="text-[#969ba0] text-sm font-bold">Optional</span>
          </label>
          <input
            type="text"
            placeholder="Please Enter"
            className="w-full p-3 border border-[#d0d6de] rounded-md focus:outline-none focus:border-[#2d9cdb]"
          />
        </div>

        <button className="w-full py-3 bg-[#a5c4d4] text-white rounded-md font-medium hover:bg-[#8bc5e3] transition-colors">
          PROCEED
        </button>
      </div>
    </div>
  )
}

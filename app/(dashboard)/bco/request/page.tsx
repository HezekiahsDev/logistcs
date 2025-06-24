import MessageBar from "@/components/bco/MessageBar";
import RequestsTable from "./RequestsTable";
import MultiStepDialog from "./muilti-steps";
// import RequestsTable from "@/components/bco/RequestsTable";

const BcoRequest = () => {
  return (
    <div className="p-4 pt-20 h-screen flex flex-col w-full gap-4 bg-gray-50">
      <div className="flex justify-end">
        {/*
          Wrap the button with the Dialog component.
          The MultiStepDialog will now control the button's behavior.
        */}
        <MultiStepDialog />
      </div>

      <div className="flex-1 w-full bg-white rounded-xl shadow-md overflow-hidden">
        <RequestsTable />
      </div>

      <div className="h-fit w-full bg-white rounded-xl shadow-md px-4 py-2">
        <MessageBar />
      </div>
    </div>
  );
};

export default BcoRequest;

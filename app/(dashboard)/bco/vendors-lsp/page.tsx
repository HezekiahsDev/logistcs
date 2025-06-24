import { VendorForm, VendorsButton, VendorTable } from "./VendorsComponents";

const VendorsLsp = () => {
  return (
    <div className="p-4 mt-10">
      <VendorsButton />
      <VendorForm />
      <VendorTable />
    </div>
  );
};

export default VendorsLsp;

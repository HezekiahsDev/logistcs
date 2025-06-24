import { VendorForm, VendorsButton, VendorTable } from "./VendorsComponents";

const VendorsLsp = async () => {
  return (
    <div className="p-4">
      <VendorsButton />
      <VendorForm />
      <VendorTable />
    </div>
  );
};

export default VendorsLsp;

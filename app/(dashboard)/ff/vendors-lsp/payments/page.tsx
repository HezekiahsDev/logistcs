import { PaymentsData, ShippingDetails } from "./PaymentComponents";

const page = () => {
  return (
    <div className="lg:ml-12 lg:mr-4">
      <ShippingDetails />
      <PaymentsData />
    </div>
  );
};

export default page;

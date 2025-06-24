import { useState } from "react";
import { X } from "lucide-react";


// Interface for the payment data
interface PaymentFormData {
  paymentType?: string;
  amountPaid?: string;
  email?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  rememberMe?: boolean;
}



interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      <div className="bg-white rounded-lg w-full max-w-md relative z-10 border-2 border-blue-300">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-center flex-1">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PaymentFormData) => void;
}

export function RecordPaymentModal({ isOpen, onClose, onSubmit }: RecordPaymentModalProps) {
  const [paymentType, setPaymentType] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  
  const handleSubmit = () => {
    onSubmit({ paymentType, amountPaid });
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Payment">
      <p className="text-sm text-gray-600 mb-2">Record payment made to the vendor</p>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-2">Payment Type</label>
        <div className="relative">
          <select 
            className="w-full p-3 border border-gray-300 rounded-md appearance-none pr-10"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="" disabled>Please Enter</option>
            <option value="credit">Credit Card</option>
            <option value="bank">Bank Transfer</option>
            <option value="cash">Cash</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-2">Amount Paid</label>
        <div className="flex">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-l-md"
            placeholder="Please Enter"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />
          <div className="relative">
            <select className="p-3 border border-gray-300 rounded-r-md border-l-0 bg-white appearance-none pr-10">
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-2">Payment Receipt <span className="text-gray-400 text-xs">Optional</span></label>
        <div className="border-2 border-gray-300 rounded-md p-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="relative w-12 h-12 mx-auto mb-2">
              
              <div className="absolute -bottom-1 right-1  rounded-full w-6 h-6 flex items-center justify-center text-white">
                
                <img src="/icons/downloadimg.svg" alt="" className=" w-8 h-10"/>
              </div>
            </div>
          </div>
          <p className="text-[#A5C4D4] text-sm mb-1">Drag your file to upload</p>
          <button className="text-[#A5C4D4] text-sm underline">Select File</button>
        </div>
      </div>
      
      <button 
        onClick={handleSubmit}
        className="w-full p-3 bg-[#A5C4D4] text-white font-medium rounded-md hover:bg-[#A5C4D4] transition-colors"
      >
        RECORD PAYMENT
      </button>
    </Modal>
  );
}

interface MakePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PaymentFormData) => void;
}

export function MakePaymentModal({ isOpen, onClose, onSubmit }: MakePaymentModalProps) {
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSubmit = () => {
    onSubmit({ email, cardNumber, expiry, cvc, rememberMe });
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment">
      <p className="text-sm text-gray-600 mb-6">Record payment made to the vendor</p>
      
      <div className="mb-4">
        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>
      
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="remember-me"
          className="h-4 w-4 text-blue-300 border-gray-300 rounded"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
          Remember me
        </label>
      </div>
      
      <button 
        onClick={handleSubmit}
        className="w-full p-3 bg-[#A5C4D4] text-white font-medium rounded-md hover:bg-[#A5C4D4] transition-colors"
      >
        PAY $US
      </button>
    </Modal>
  );
}



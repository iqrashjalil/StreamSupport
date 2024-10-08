import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWithdrawRequest,
  getUserWithdrawRequests,
  resetMessage,
} from "../../store/slices/Withdraw_Slice";
import { toast } from "react-toastify";

const Withdraw = () => {
  const dispatch = useDispatch();
  const { userWithdrawRequests, success, error } = useSelector(
    (state) => state.withdraws
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData(e.target);

    // Extract values from the formData
    const accountTitle = formData.get("accountTitle");
    const cnic = formData.get("cnic");
    const bankAccountNumber = formData.get("bankAccountNumber");
    const withdrawAmount = formData.get("withdrawAmount");
    const bankName = formData.get("bankName");

    // Create an object to dispatch
    const withdrawData = {
      accountTitle,
      cnic,
      bankAccountNumber,
      withdrawAmount,
      bankName,
    };

    dispatch(addWithdrawRequest(withdrawData));
    dispatch(getUserWithdrawRequests());
  };

  useEffect(() => {
    if (success) {
      toast.success("Withdraw Rquest Successfully Added");
      dispatch(resetMessage());
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error, success]);

  useEffect(() => {
    dispatch(getUserWithdrawRequests());
  }, [dispatch]);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-50">
          Add <span className="text-redMain">Bank</span> Details
        </h1>
      </div>
      <div>
        <form className="w-full mt-10" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-[4%]">
            <div className="sm:w-[48%] w-full flex flex-col gap-10">
              <div className="flex flex-col mt-1">
                <Label className="text-neutral-50">
                  Select beneficiary From Added Banks
                </Label>
                <select
                  className="p-2 mt-1 bg-transparent border-2 border-gray-600 focus:bg-gray-600 text-neutral-50"
                  id="beneficiaryBanks"
                  name="beneficiaryBanks"
                >
                  <option value="">Select Bank</option>
                </select>
              </div>
              <div>
                <Label className="text-neutral-50">Account Title</Label>
                <Input name="accountTitle" />
              </div>
              <div>
                <Label className="text-neutral-50">CNIC</Label>
                <Input name="cnic" />
              </div>
            </div>
            <div className="sm:w-[48%] w-full flex flex-col gap-10">
              <div>
                <Label className="text-neutral-50">Account Number</Label>
                <Input name="bankAccountNumber" />
              </div>
              <div>
                <Label className="text-neutral-50">Withdraw Amount</Label>
                <Input name="withdrawAmount" />
              </div>
              <div className="flex flex-col mt-1">
                <Label className="text-neutral-50">Select Bank</Label>
                <select
                  className="p-2 mt-1 bg-transparent border-2 border-gray-600 focus:bg-gray-600 text-neutral-50"
                  id="bankName"
                  name="bankName"
                >
                  <option value="" disabled selected>
                    Select a bank
                  </option>
                  <option value="JazzCash">JazzCash</option>
                  <option value="Easypaisa">Easypaisa</option>
                  <option value="National Bank of Pakistan">
                    National Bank of Pakistan (NBP)
                  </option>
                  <option value="United Bank Limited">
                    United Bank Limited (UBL)
                  </option>
                  <option value="Habib Bank Limited">
                    Habib Bank Limited (HBL)
                  </option>
                  <option value="Muslim Commercial Bank">
                    Muslim Commercial Bank (MCB)
                  </option>
                  <option value="Bank Alfalah">Bank Alfalah</option>
                  <option value="Askari Bank">Askari Bank</option>
                  <option value="Standard Chartered Bank">
                    Standard Chartered Bank
                  </option>
                  <option value="Meezan Bank">Meezan Bank</option>
                  <option value="Faysal Bank">Faysal Bank</option>
                  <option value="Silk Bank">Silk Bank</option>
                  <option value="Bank Islami">Bank Islami</option>
                  <option value="Soneri Bank">Soneri Bank</option>
                  <option value="Summit Bank">Summit Bank</option>
                  <option value="Al Baraka Bank">Al Baraka Bank</option>
                  <option value="Bank of Punjab">Bank of Punjab (BOP)</option>
                  <option value="Bank Al Habib">Bank Al Habib</option>
                  <option value="JS Bank">JS Bank</option>
                  <option value="Samba Bank">Samba Bank</option>
                  <option value="UBL Asset Management">
                    UBL Asset Management
                  </option>
                  <option value="Zarai Taraqiati Bank">
                    Zarai Taraqiati Bank
                  </option>
                  <option value="Apna Microfinance Bank">
                    Apna Microfinance Bank
                  </option>
                  <option value="Mobilink Microfinance Bank">
                    Mobilink Microfinance Bank
                  </option>
                  <option value="FINCA Microfinance Bank">
                    FINCA Microfinance Bank
                  </option>
                  <option value="U Microfinance Bank">
                    U Microfinance Bank
                  </option>
                  <option value="Khushhali Microfinance Bank">
                    Khushhali Microfinance Bank
                  </option>
                  <option value="First Women Bank">First Women Bank</option>
                  <option value="Habib Metropolitan Bank">
                    Habib Metropolitan Bank
                  </option>
                  <option value="Dubai Islamic Bank">Dubai Islamic Bank</option>
                  <option value="Allied Bank Limited">
                    Allied Bank Limited (ABL)
                  </option>
                  <option value="Mobicash">Mobicash</option>
                  <option value="UPaisa">UPaisa</option>
                  <option value="PayMax">PayMax</option>
                </select>
              </div>
            </div>
          </div>
          <div className="justify-end sm:flex">
            <Button
              className="w-full p-5 mt-6 rounded sm:w-auto"
              variant="secondary"
            >
              Submit Withdraw Request
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-10 border-t-2 border-gray-600">
        <h1 className="mt-10 text-3xl font-extrabold text-neutral-50">
          Withdraw <span className="text-redMain">Requests</span>
        </h1>
      </div>
      <div className="p-5 mt-10 bg-gray-600 rounded">
        <div>
          <Table>
            <TableCaption>List of Superchats Received.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%]">CNIC</TableHead>
                <TableHead className="w-[10%]">Bank</TableHead>
                <TableHead className="w-[10%]">Account Title</TableHead>
                <TableHead className="w-[10%]">Account Number</TableHead>
                <TableHead className="w-[10%]">Withdraw Amount</TableHead>
                <TableHead className="w-[10%]">Withdraw Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userWithdrawRequests?.map((withdraw, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{withdraw.cnic}</TableCell>
                  <TableCell className="font-medium">
                    {withdraw.bankName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {withdraw.accountTitle}
                  </TableCell>
                  <TableCell className="font-medium">
                    {withdraw.bankAccountNumber}
                  </TableCell>
                  <TableCell className="flex gap-2 text-lg font-medium">
                    {new Intl.NumberFormat().format(withdraw.withdrawAmount)}
                  </TableCell>
                  <TableCell className="font-medium">
                    <span
                      className={`${
                        withdraw.status === "Pending"
                          ? "bg-yellow-500"
                          : withdraw.status === "Rejected"
                          ? "bg-redMain"
                          : "bg-green-500"
                      } text-neutral-50 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300`}
                    >
                      {withdraw.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;

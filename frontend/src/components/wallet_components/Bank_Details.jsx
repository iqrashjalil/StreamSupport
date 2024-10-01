import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
  addBankdetail,
  deleteBankdetail,
  getBankdetail,
  resetMessage,
} from "../../store/slices/Bankdetail_Slice";
import { useEffect } from "react";
import { toast } from "react-toastify";
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

const Bank_Details = () => {
  const dispatch = useDispatch();
  const { message, error, bankDetails } = useSelector(
    (state) => state.bankdetails
  );

  const isNumeric = (input) => {
    const regex = /^\d+$/;
    return regex.test(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const bankDetails = {
      accountNumber: formData.get("accountNumber"),
      accountTitle: formData.get("accountTitle"),
      bankName: formData.get("bankName"),
      cnic: formData.get("cnic"),
    };

    // Check if CNIC is numeric
    if (!isNumeric(bankDetails.cnic)) {
      toast.error("Write CNIC Without Dashes (-) e.g:1234567891011 ");
      return; // Prevent form submission if CNIC is invalid
    }

    dispatch(addBankdetail(bankDetails));
    dispatch(getBankdetail());
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBankdetail(id)).unwrap(); // Wait for delete to complete
      dispatch(getBankdetail()); // Fetch updated bank details after deletion
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetMessage());
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getBankdetail());
  }, [dispatch]);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-50">
          Add <span className="text-redMain">Bank</span> Details
        </h1>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row w-full gap-10 sm:gap-[4%] mt-10"
        >
          <div className="sm:w-[48%] w-full flex flex-col gap-10">
            <div>
              <Label className="text-neutral-50">Account Number</Label>
              <Input name="accountNumber" />
            </div>
            <div>
              <Label className="text-neutral-50">Account Title</Label>
              <Input name="accountTitle" />
            </div>
          </div>
          <div className="sm:w-[48%] w-full flex flex-col gap-10">
            <div>
              <Label className="text-neutral-50">CNIC</Label>
              <Input name="cnic" />
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
                <option value="U Microfinance Bank">U Microfinance Bank</option>
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
            <div className="justify-end sm:flex">
              <Button
                type="submit"
                className="w-full p-5 rounded sm:w-auto"
                variant="secondary"
              >
                Add Bank Details
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-10 border-t-2 border-gray-600">
        <h1 className="mt-10 text-3xl font-extrabold text-neutral-50">
          Added <span className="text-redMain">Banks</span>
        </h1>
      </div>
      <div className="p-5 mt-10 bg-gray-600 rounded">
        <div>
          <Table>
            <TableCaption>List of Added Withdraw Options</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Bank Name</TableHead>
                <TableHead>Account Title</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>CNIC</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankDetails?.map((bank, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{bank.bankName}</TableCell>
                  <TableCell className="flex gap-2 font-medium">
                    {bank.accountTitle}
                  </TableCell>

                  <TableCell className="font-medium">
                    {bank.accountNumber}
                  </TableCell>
                  <TableCell className="font-medium">{bank.cnic}</TableCell>
                  <TableCell className="font-medium ">
                    <Button
                      onClick={() => handleDelete(bank._id)}
                      variant="secondary"
                    >
                      Delete
                    </Button>
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

export default Bank_Details;

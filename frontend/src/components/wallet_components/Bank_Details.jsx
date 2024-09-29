import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Bank_Details = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-50">
          Add <span className="text-redMain">Bank</span> Details
        </h1>
      </div>
      <div>
        <form className="flex w-full gap-[5%] mt-10">
          <div className="w-[45%] flex flex-col gap-10">
            <div>
              <Label className="text-neutral-50">Account Number</Label>
              <Input name="userName" />
            </div>
            <div>
              <Label className="text-neutral-50">Account Title</Label>
              <Input name="userName" />
            </div>
          </div>
          <div className="w-[45%] flex flex-col gap-10">
            <div>
              <Label className="text-neutral-50">CNIC</Label>
              <Input name="userName" />
            </div>
            <div className="flex flex-col mt-1">
              <Label className="text-neutral-50">Select Bank</Label>
              <select
                className="p-2 mt-1 bg-transparent border-2 border-gray-600 focus:bg-gray-600 text-neutral-50"
                id="banks"
                name="banks"
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
          </div>
        </form>
      </div>
      <div className="mt-10 border-t-2 border-gray-600">
        <h1 className="mt-10 text-3xl font-extrabold text-neutral-50">
          Added <span className="text-redMain">Banks</span>
        </h1>
      </div>
    </div>
  );
};

export default Bank_Details;

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
const Received_Superchats = ({ allDonations }) => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-50">
          Received Superchats
        </h1>
      </div>
      <div className="p-5 mt-10 bg-gray-600 rounded">
        <div>
          <Table>
            <TableCaption>List of Superchats Received.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%]">Name</TableHead>
                <TableHead className="w-[10%]">Amount Superchated</TableHead>
                <TableHead className="w-[70%]">Message</TableHead>
                <TableHead className="w-[10%]">Transaction Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allDonations?.map((donator, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {donator.donatorName}
                  </TableCell>
                  <TableCell className="flex gap-2 font-medium">
                    Rs:
                    <span className="bg-green-500 text-neutral-50 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      {donator.amount}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    {donator.message}
                  </TableCell>

                  <TableCell className="font-medium">
                    {donator.transactionStatus}
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

export default Received_Superchats;

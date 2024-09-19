import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Skeleton } from "@/ui/skeleton";

interface LoadingTableProps {
  header: string[];
  row: Number;
}

const LoadingTable: React.FC<LoadingTableProps> = ({ header, row }) => {
  return (
    <div className="border-t border-gray-200 max-h-full overflow-y-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            {header.map((head, index) => (
              <TableHead key={index} className="text-center">
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(row)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {header.map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="w-[150px] h-[20px] rounded-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoadingTable;

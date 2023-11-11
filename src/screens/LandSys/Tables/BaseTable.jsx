import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { supabase } from '@/contexts/SupabaseClient';

const BaseTable = ({
  fields,
  entity
}) => {

  const { data, isLoading } = useQuery({
    queryKey: [entity],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(entity)
        .select('*')
      if (error) throw error
      return data.data ?? [];
    }
  });

  if (isLoading || data == null) return <p>Loading...</p>

  return (
    <Table>
      <TableHeader>
        {fields.map((field) => (
          <TableColumn key={field}>{field}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {fields.map((field) => (
              <TableCell key={item[field]}>{item[field]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BaseTable;

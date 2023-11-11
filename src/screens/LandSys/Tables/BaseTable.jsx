import {
  useState,
} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@nextui-org/react";
import {
  useQuery,
} from '@tanstack/react-query';
import { supabase } from '@/contexts/SupabaseClient';
import AddEntityModal from "./AddEntityModal";
import ModifyEntityModal from "./ModifyEntityModal";
import DeleteEntityModal from "./DeleteEntityModal";

const DeleteEntityButton = ({
  entity,
  id,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="flex align-items-end justify-start w-full"
    >
      <Button
        className="align-self-end"
        onClick={() => setOpen(true)}
        color="danger"
      >
        Borrar
      </Button>
      <DeleteEntityModal
        entity={entity}
        isOpen={open}
        setOpen={setOpen}
        id={id}
      />
    </div>
  );
}

const AddEntityButton = ({
  entity,
  fields,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="flex align-items-end justify-start w-full"
    >
      <Button
        className="align-self-end"
        onClick={() => setOpen(true)}
      >
        Añadir {entity.slice(0, -1)}
      </Button>
      <AddEntityModal
        entity={entity}
        open={open}
        setOpen={setOpen}
        fields={fields}
      />
    </div>
  );
};

const ModifyEntityButton = ({
  entity,
  fields,
  id,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="flex align-items-end justify-start w-full"
    >
      <Button
        className="align-self-end"
        onClick={() => setOpen(true)}
      >
        Modificar {entity.slice(0, -1)}
      </Button>
      <ModifyEntityModal
        entity={entity}
        open={open}
        setOpen={setOpen}
        fields={fields}
        id={id}
      />
    </div>
  );
}

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
      if (error) throw error;
      return data ?? [];
    }
  });
  const extra_fields = fields?.concat(['id']); // Adds ID and the modify dropdown
  if (isLoading || data == null) return <p>Loading...</p>
  return (
    <div className="flex flex-col gap-2 items-center">
      <AddEntityButton
        entity={entity}
        fields={fields ?? []}
      />
      <Table>
        <TableHeader>
          {extra_fields.concat(['modificar', 'borrar']).map((field) => (
            <TableColumn key={field}>{field}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {extra_fields.map((field) => (
                <TableCell key={field}>{item[field]}</TableCell>
              ))}
              <TableCell key={"modificar"}>
                <ModifyEntityButton
                  entity={entity}
                  fields={fields}
                  id={item.id}
                />
              </TableCell>
              <TableCell key={"borrar"}>
                <DeleteEntityButton
                  entity={entity}
                  id={item.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BaseTable;

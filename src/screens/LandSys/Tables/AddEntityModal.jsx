import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { supabase } from '@/contexts/SupabaseClient';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import AsyncButton from '@/components/AsyncButton';

const AddEntityModal = ({
  entity,
  fields,
  open,
  setOpen,
}) => {

  const [values, setValues] = useState(fields?.reduce((acc, field) => {
    acc[field] = '';
    return acc;
  }, {}));

  const queryClient = useQueryClient();

  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
    >
      <ModalContent>
        <ModalHeader>Añadir {entity.slice(0, -1)}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
            {fields.map((field) => (
              <div key={field}>
                <Input
                  label={field}
                  onValueChange={(value) => setValues({
                    ...values,
                    [field]: value
                  })}
                  value={values[field]}
                  placeholder={field}
                />
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            auto
            color="danger"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <AsyncButton
            auto
            color="primary"
            onClick={async () => {
              await supabase
                .from(entity)
                .insert(values)
                .then((res) => console.log(res))
                .catch((err) => {
                  console.log(err);
                  toast.error('Error al añadir: ' + err.message);
                });
              await queryClient.invalidateQueries(entity);
              setOpen(false);
            }}
          >
            Añadir
          </AsyncButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddEntityModal;

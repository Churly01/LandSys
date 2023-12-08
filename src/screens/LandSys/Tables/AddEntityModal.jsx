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
  singular_entity,
}) => {

  const [values, setValues] = useState(fields?.reduce((acc, field) => {
    acc[field] = '';
    return acc;
  }, {}));

  const queryClient = useQueryClient();

  const is_wrong_input = Object.values(values).some((value) => value === '');

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
          {is_wrong_input && <p className="text-red-500 text-xl text-center">Por favor, rellena todos los campos</p>}
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
            isDisabled={is_wrong_input}
            onClick={async () => {
              const res = await supabase
                .from(entity)
                .insert(values);
              if (res.error) {
                toast.error('Error al añadir: ' + res.error.message);
                return;
              }
              toast.success(`${singular_entity} añadido con éxito`);
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

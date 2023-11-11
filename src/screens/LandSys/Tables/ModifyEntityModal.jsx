import {
  useState,
  useEffect,
} from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
} from "@nextui-org/react";
import { supabase } from '@/contexts/SupabaseClient';
import toast from 'react-hot-toast';
import {
  useQueryClient,
  useQuery,
} from '@tanstack/react-query';
import AsyncButton from '@/components/AsyncButton';

const ModifyEntityModal = ({
  entity,
  fields,
  open,
  setOpen,
  id,
}) => {

  const [values, setValues] = useState(fields?.reduce((acc, field) => {
    acc[field] = '';
    return acc;
  }, {}));

  // Fetches the data from the entity and updates the values
  const {data, isLoading} = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(entity)
        .select('*')
        .match({ id })
      if (error) throw error;
      return data[0] ?? null;
    }
  });

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  const queryClient = useQueryClient();


  const handleModify = async () => {
    try {
      await supabase
        .from(entity)
        .update(values)
        .match({ id });
      toast.success('Modificado correctamente');
      await queryClient.invalidateQueries([entity]);
      setOpen(false);

    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const wrong_input = Object.values(values).some((value) => value === '');

  if (isLoading) return (
    <Spinner />
  );

  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
    >
      <ModalContent>
        <ModalHeader>Modificar</ModalHeader>
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
            onClick={handleModify}
            color="primary"
            auto
            isDisabled={wrong_input}
          >
            Modificar
          </AsyncButton>

        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default ModifyEntityModal;

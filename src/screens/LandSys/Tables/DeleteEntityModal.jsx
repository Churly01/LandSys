import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { supabase } from '@/contexts/SupabaseClient';
import toast from 'react-hot-toast';
import {
  useQueryClient,
} from '@tanstack/react-query';
import AsyncButton from '@/components/AsyncButton';

const DeleteEntityModal = ({
  entity,
  isOpen,
  setOpen,
  id,
}) => {

  const queryClient = useQueryClient();
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      size="small"
    >
      <ModalContent>
        <ModalHeader>Borrar {entity.slice(0, -1)}</ModalHeader>
        <ModalBody>
          <p>Estás seguro de que quieres borrar esta {entity.slice(0, -1)} con id {id}?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            auto
            color="primary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>

          <AsyncButton
            auto
            color="danger"
            onClick={async () => {
              try {
                await supabase
                  .from(entity)
                  .delete()
                  .match({ id });
                toast.success(`${entity.slice(0, -1)} borrada con éxito`);
                queryClient.invalidateQueries([entity]);
              } catch (error) {
                toast.error(error.message);
              }
            }}
          >
            Borrar
          </AsyncButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteEntityModal;

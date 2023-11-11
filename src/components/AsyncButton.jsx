import { useState } from 'react';
import {
  Spinner,
  Button
} from '@nextui-org/react'
import toast from 'react-hot-toast';

const AsyncButton = ({
  children,
  onClick,
  onError,
  ...props }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    try {
      setLoading(true);
      await onClick(e);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (onError) {
        onError(err);
        console.error(err);
        toast.error(err.message);
      }
    }
  };

  return (
    <Button color="primary"
      onPress={(e) => { void (handleClick(e)) }}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </Button>
  );
};

export default AsyncButton;

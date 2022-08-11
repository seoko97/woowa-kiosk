import { useCallback, useState } from "react";

type CallbackFC = () => void;
type ReturnTypes = [boolean, CallbackFC, CallbackFC, CallbackFC];

const useModal = (): ReturnTypes => {
  const [isOpen, setter] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setter(true);
  }, []);

  const onClose = useCallback(() => {
    setter(false);
  }, []);

  const handler = useCallback(() => {
    setter(!isOpen);
  }, [isOpen]);

  return [isOpen, onOpen, onClose, handler];
};

export default useModal;

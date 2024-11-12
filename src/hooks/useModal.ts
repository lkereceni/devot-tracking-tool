import { useCallback, useState } from "react";

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);

  return { isVisible, show, hide };
};

export default useModal;

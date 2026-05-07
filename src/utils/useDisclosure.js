import { useCallback, useReducer } from "react";

const defaultReducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, open: true };
    case "close":
      return { ...state, open: false };
    case "toggle":
      return { ...state, open: !state.open };
    default:
      return state;
  }
};

export function useDisclosure(options = {}) {
  const {
    defaultOpen = false,
    isOpen, // control prop (optional)
    onOpenChange, // change handler (optional)
    stateReducer, // custom reducer (optional)
  } = options;

  const reducer = stateReducer || defaultReducer;

  const [state, dispatch] = useReducer(reducer, { open: defaultOpen });

  const isControlled = typeof isOpen === "boolean";
  const open = isControlled ? isOpen : state.open;

  const setOpen = useCallback(
    (next) => {
      const nextOpen = typeof next === "function" ? next(open) : !!next;
      if (!isControlled) dispatch({ type: nextOpen ? "open" : "close" });
      onOpenChange?.(nextOpen);
    },
    [isControlled, open, onOpenChange]
  );

  const api = {
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen((o) => !o),
  };

  const getToggleProps = (props = {}) => ({
    "aria-pressed": open,
    role: props.role ?? "button",
    tabIndex: props.tabIndex ?? 0,
    ...props,
    onClick: (e) => {
      props.onClick?.(e);
      api.toggle();
    },
  });

  const getContentProps = (props = {}) => ({
    hidden: !open,
    ...props,
  });

  return { open, setOpen, ...api, getToggleProps, getContentProps };
}

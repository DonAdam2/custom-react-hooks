const ConditionalWrapper = ({ initialWrapper, condition, wrapper, children }) =>
  condition ? wrapper(children) : initialWrapper(children);

export default ConditionalWrapper;

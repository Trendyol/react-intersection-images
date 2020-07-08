import { LazyLoadProps } from "../interface";

export const getReturnProps = (props: LazyLoadProps) => {
  const returnProps = { ...props };
  delete returnProps.onVisible;
  delete returnProps.force;

  return returnProps;
}
import { ImgHTMLAttributes } from "react";

export interface LazyLoadProps extends Partial<ImgHTMLAttributes<any>> {
  ratio: number;
  src: string;
  placeholder: string;
  force?: boolean;
  onVisible?: Function;
}

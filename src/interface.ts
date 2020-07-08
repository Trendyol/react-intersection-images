import { ImgHTMLAttributes } from "react";

export interface LazyLoadProps extends Partial<ImgHTMLAttributes<any>> {
  ratio: number;
  placeholder: string;
  force?: boolean;
  onVisible?: Function;
}
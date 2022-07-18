export interface Props {
  title: string;
  subTitle: string;
}

export interface IBrand {
  nome: string;
  codigo: string;
}

export interface IBrandField {
  label: string;
  id: number;
}

export interface IModel {
  nome: string;
  codigo: string;
}

export interface IModelField {
  label: string;
  id: number;
}

export interface IYear {
  nome: string;
  codigo: string;
}

export interface IYearField {
  label: string;
  id: number;
}

export interface IModelResponse {
  anos: IYear[];
  modelos: IModel[];
}

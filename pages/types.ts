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
  id: string;
}

export interface IModelResponse {
  anos: IYear[];
  modelos: IModel[];
  price: IPriceCars[];
}

export interface IPriceCars {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}

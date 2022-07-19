import axios, {
    AxiosResponse,
} from 'axios';
import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    Alert,
    Autocomplete,
    Button,
    TextField,
} from '@mui/material';

import styles from '../styles/Home.module.css';
import {
    IBrand,
    IBrandField,
    IModel,
    IModelField,
    IModelResponse,
    IPriceCars,
    IYear,
    IYearField,
    Props,
} from './types';

const Home = ({
  title = "Tabela Fipe",
  subTitle = "Consulte o valor um veículo de forma gratuita",
}: Props) => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [models, setModels] = useState<IModel[]>([]);
  const [years, setYears] = useState<IYear[]>([]);
  const [price, setPrice] = useState<IPriceCars[]>();
  const [showPrice, setShowPrice] = useState(false);

  const [isBrandsLoading, setIsBrandsLoading] = useState(true);
  const [isModelsLoading, setIsModelsLoading] = useState(true);
  const [isYearsLoading, setIsYearsLoading] = useState(true);
  const [isPriceLoading, setIsPriceLoading] = useState(true);

  const [selectedBrand, setSelectedBrand] = useState<IBrandField | null>();
  const [selectedModel, setSelectedModel] = useState<IModelField | null>();
  const [selectedYear, setSelectedYear] = useState<IYearField | null>();

  useEffect(() => {
    const handleBrands = async () => {
      axios
        .get<IBrand[]>("https://parallelum.com.br/fipe/api/v1/carros/marcas")
        .then((response) => {
          return response.data;
        })
        .then((data: IBrand[]) => {
          setBrands(data);
          setIsBrandsLoading(false);
        });
    };

    const handleModels = async (brandId: number) => {
      axios
        .get<IModelResponse>(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos`
        )
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          return data.modelos;
        })
        .then((modelos: IModel[]) => {
          setModels(modelos);
          setIsModelsLoading(false);
        });
    };

    const handleYears = async (brandId: number, modelId: number) => {
      axios
        .get<IYear[]>(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${modelId}/anos`
        )
        .then((response) => {
          return response.data;
        })
        .then((data: IYear[]) => {
          setYears(data);
          setIsYearsLoading(false);
        });
    };

    if (brands.length == 0) {
      handleBrands();
    }

    if (selectedBrand != null) {
      handleModels(selectedBrand.id);
    }

    if (selectedBrand != null && selectedModel != null) {
      handleYears(selectedBrand.id, selectedModel.id);
    }
  }, [brands.length, selectedBrand, selectedModel]);

  const brandWrapper = (brands: IBrand[]): IBrandField[] => {
    return brands.map((brand) => ({
      label: brand.nome,
      id: parseInt(brand.codigo),
    }));
  };

  const modelWrapper = (models: IModel[]): IModelField[] => {
    return models.map((model) => ({
      label: model.nome,
      id: parseInt(model.codigo),
    }));
  };

  const yearWrapper = (years: IYear[]): IYearField[] => {
    return years.map((year) => ({
      label: year.nome,
      id: parseInt(year.codigo),
    }));
  };

  const handlePrice = async (brandId: number, modelId: number, yearId: number) => {
    axios
      .get<IPriceCars[]>(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`
      )
      .then((response) => {
        return response.data;
      })
      .then((data: IPriceCars[]) => {
        data.map((values) => ({
          valor: values.Valor,
          marca: values.Marca,
          modelo: values.Modelo,
          ano: values.AnoModelo,
        }));
        setPrice(data);
        setIsPriceLoading(false);
      });
  };

  const brand = selectedBrand?.label;
  const model = selectedModel?.label;
  const year = selectedYear?.label;

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
      <div>
        <Autocomplete
          disablePortal
          id="cars-marc"
          options={brandWrapper(brands)}
          disabled={isBrandsLoading}
          onChange={(event: any, newBrand: IBrandField | null) => {
            setSelectedBrand(newBrand);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Marca" />}
        />
        <Autocomplete
          disablePortal
          id="carrs-model"
          options={modelWrapper(models)}
          disabled={selectedBrand == null}
          onChange={(event: any, newModel: IModelField | null) => {
            setSelectedModel(newModel);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Modelo" />}
        />
        {selectedModel != null && (
          <Autocomplete
            disablePortal
            id="carrs-years"
            options={yearWrapper(years)}
            onChange={(event: any, newYear: IYearField | null) => {
              setSelectedYear(newYear);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Ano" />}
          />
        )}

        <Button
          variant="contained"
          disabled={selectedYear == null}
          onClick={() =>
            handlePrice(
              Number(selectedBrand?.id),
              Number(selectedModel?.id),
              Number(selectedYear?.id)
            )
          }
        >
          Consultar preço
        </Button>
        <div className={styles.result}>
          <h3>Resultado</h3>
          <div className={styles.contentPreco}>
            <h4>
              Tabela Fipe: Preço {brand} {model} {year}
            </h4>
            <div>
              <p>R$ 91.618</p>
            </div>
            <p>Este é o preço de compra deste veículo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

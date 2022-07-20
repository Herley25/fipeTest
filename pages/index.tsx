import axios from 'axios';
import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    Autocomplete,
    Button,
    TextField,
} from '@mui/material';

import styles from '../styles/Home.module.css';
import Result from './components/Result';
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

  const [price, setPrice] = useState<IPriceCars | null>();

  const [isBrandsLoading, setIsBrandsLoading] = useState(true);
  const [isModelsLoading, setIsModelsLoading] = useState(true);
  const [isYearsLoading, setIsYearsLoading] = useState(true);

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

  const brandWrapper = useCallback((brands: IBrand[]): IBrandField[] => {
    return brands.map((brand) => ({
      label: brand.nome,
      id: parseInt(brand.codigo),
    }));
  }, []);

  const modelWrapper = useCallback((models: IModel[]): IModelField[] => {
    return models.map((model) => ({
      label: model.nome,
      id: parseInt(model.codigo),
    }));
  }, []);

  const yearWrapper = useCallback((years: IYear[]): IYearField[] => {
    return years.map((year) => ({
      label: year.nome,
      id: year.codigo,
    }));
  }, []);

  const handlePrice = async (brandId: number, modelId: number, yearId: string) => {
    axios
      .get<IPriceCars>(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`
      )
      .then((response) => {
        return response.data;
      })
      .then((data: IPriceCars) => {
        setPrice(data);
      })
      .catch((error) => console.error(error));
  };

  const brand = selectedBrand?.label;
  const model = selectedModel?.label;
  const year = selectedYear?.label;
  const text = "Tabela Fipe: Preço";

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>{title}</h1>
        <h2 className={styles.text2}>{subTitle}</h2>
      </div>
      <div className={styles.container_input}>
        <Autocomplete
          disablePortal
          id="cars-marc"
          options={brandWrapper(brands)}
          disabled={isBrandsLoading}
          onChange={(event: any, newBrand: IBrandField | null) => {
            setSelectedBrand(newBrand);
            setSelectedModel(null);
            setSelectedYear(null);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Marca" />}
        />
        <div className={styles.input}>
          <Autocomplete
            disablePortal
            inputValue={selectedModel?.label || ""}
            id="carrs-model"
            options={modelWrapper(models)}
            disabled={selectedBrand == null || isModelsLoading}
            onChange={(event: any, newModel: IModelField | null) => {
              setSelectedModel(newModel);
              setSelectedYear(null);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Modelo" />}
          />
        </div>
        {selectedModel != null && (
          <Autocomplete
            disablePortal
            disabled={isYearsLoading}
            id="carrs-years"
            options={yearWrapper(years)}
            onChange={(event: any, newYear: IYearField | null) => {
              setSelectedYear(newYear);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Ano" />}
          />
        )}
        <div className={styles.button}>
          <Button
            variant="contained"
            disabled={selectedYear == null}
            onClick={() =>
              handlePrice(Number(selectedBrand?.id), Number(selectedModel?.id), selectedYear!.id)
            }
          >
            Consultar preço
          </Button>
        </div>
        {price != null && (
          <>
            <Result
              title={text + " " + brand + " " + model + " " + year}
              price={price.Valor}
              text="Este é o preço de compra deste veículo"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

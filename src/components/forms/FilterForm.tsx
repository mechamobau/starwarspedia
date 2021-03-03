import React, { useEffect, useMemo } from "react";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

import { NumericPlanetValues } from "../../models/Planet";

import ComparisonEnum from "../../models/enum/Comparison.enum";

import { Form, Formik } from "formik";

import { object, string, number } from "yup";

type NumericColumnLabels = {
  [key in keyof NumericPlanetValues]: string;
};

type Props = {
  onSubmit: (values: Values) => void;
  columnLabels: Partial<NumericColumnLabels>;
};

type Values = {
  column: keyof NumericPlanetValues;
  operation: ComparisonEnum;
  value: number;
};

const initialValues: Values = {
  column: "diameter",
  operation: ComparisonEnum.EQUALS,
  value: 0,
};

const schema = object({
  column: string().required(),
  operation: string().required(),
  value: number().min(0).required(),
});

const FilterForm = ({ columnLabels, onSubmit }: Props) => {
  const operations = useMemo(
    () => ({
      [ComparisonEnum.EQUALS]: "Igual a",
      [ComparisonEnum.GREATER_THAN]: "Maior que",
      [ComparisonEnum.LOWER_THAN]: "Menor que",
    }),
    []
  );

  return (
    <Formik<Values>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        dirty,
        errors,
        values,
        isValid,
      }) => (
        <Form onSubmit={handleSubmit}>
          <div className="px-3 py-2">
            <FormControl
              as="select"
              autoFocus
              className="w-100"
              name="column"
              placeholder="Coluna a ser comparada"
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={dirty && Boolean(errors.column)}
              value={values.column}
            >
              {Object.entries(columnLabels).map((item) => (
                <option value={item[0]}>{item[1]}</option>
              ))}
            </FormControl>
            <FormControl.Feedback type="invalid">
              {errors.column}
            </FormControl.Feedback>
          </div>
          <div className="px-3 py-2">
            <FormControl
              as="select"
              autoFocus
              className="w-100"
              name="operation"
              placeholder="Operação"
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={dirty && Boolean(errors.operation)}
              value={values.operation}
            >
              {Object.entries(operations).map((item) => (
                <option value={item[0]}>{item[1]}</option>
              ))}
            </FormControl>
            <FormControl.Feedback type="invalid">
              {errors.operation}
            </FormControl.Feedback>
          </div>
          <FormControl
            type="number"
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Valor"
            name="value"
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={dirty && Boolean(errors.value)}
            value={values.value}
          />
          <FormControl.Feedback className="mx-3" type="invalid">
            {errors.value}
          </FormControl.Feedback>

          <div className="px-3 py-2">
            <Button
              disabled={!dirty || !isValid}
              type="submit"
              className="w-100"
            >
              Incluir filtro
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;

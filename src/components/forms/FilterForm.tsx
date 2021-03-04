import { Form, Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { number, object, string } from "yup";

import operationsLabels from "../../constants/operationsLabels";
import ComparisonEnum from "../../models/enum/Comparison.enum";

import type { NumericPlanetValues } from "../../models/Planet";

type NumericColumnLabels = {
  [key in keyof NumericPlanetValues]: string;
};

type Props = {
  onSubmit: (values: Values) => void;
  columnLabels: Partial<NumericColumnLabels>;
};

type Values = {
  column: keyof NumericPlanetValues;
  comparison: ComparisonEnum;
  value: number;
};

const initialValues: Values = {
  column: "diameter",
  comparison: ComparisonEnum.EQUALS,
  value: 0,
};

const schema = object({
  column: string().required(),
  comparison: string().required(),
  value: number().min(0).required(),
});

const FilterForm = ({ columnLabels, onSubmit }: Props) => (
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
        <div className="px-3 py-2" key="column-control">
          <FormControl
            as="select"
            className="w-100"
            name="column"
            placeholder="Coluna a ser comparada"
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={dirty && Boolean(errors.column)}
            value={values.column}
          >
            {Object.entries(columnLabels).map((item) => (
              <option key={item[0]} value={item[0]}>
                {item[1]}
              </option>
            ))}
          </FormControl>
          <FormControl.Feedback type="invalid">
            {errors.column}
          </FormControl.Feedback>
        </div>
        <div className="px-3 py-2" key="operation-control">
          <FormControl
            as="select"
            className="w-100"
            name="comparison"
            placeholder="Operação"
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={dirty && Boolean(errors.comparison)}
            value={values.comparison}
          >
            {Object.entries(operationsLabels).map((item) => (
              <option key={item[0]} value={item[0]}>
                {item[1]}
              </option>
            ))}
          </FormControl>
          <FormControl.Feedback type="invalid">
            {errors.comparison}
          </FormControl.Feedback>
        </div>
        <FormControl
          type="number"
          key="value-control"
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
          <Button disabled={!dirty || !isValid} type="submit" className="w-100">
            Incluir filtro
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default FilterForm;

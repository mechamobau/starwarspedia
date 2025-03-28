import { Form, Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import orderLabels from '../../constants/orderLabels';
import { initialValues } from '../../hooks/useSort';
import OrderEnum from '../../models/enum/Order.enum';

import type Item from '../../models/Item';

type PlanetLabels = {
  [key in keyof Item]: string;
};

type Props = {
  onSubmit: (values: Values) => void;
  columnLabels: Partial<PlanetLabels>;
  disabled?: boolean;
};

export type Values = {
  column: keyof PlanetLabels;
  order: OrderEnum;
};

const SortForm = ({ columnLabels, disabled = false, onSubmit }: Props) => (
  <Formik<Values> initialValues={initialValues} onSubmit={onSubmit}>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <Form onSubmit={handleSubmit}>
        <div className="px-3 py-2" key="column-control">
          <FormControl
            disabled={disabled}
            as="select"
            className="w-100"
            name="column"
            // placeholder="Coluna a ser comparada"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.column}
          >
            {Object.entries(columnLabels).map((item) => (
              <option key={item[0]} value={item[0]}>
                {item[1]}
              </option>
            ))}
          </FormControl>
        </div>
        <div className="px-3 py-2" key="operation-control">
          <FormControl
            disabled={disabled}
            as="select"
            className="w-100"
            name="order"
            // placeholder="Ordenação"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.order}
          >
            {Object.entries(orderLabels).map((item) => (
              <option key={item[0]} value={item[0]}>
                {item[1]}
              </option>
            ))}
          </FormControl>
        </div>

        <div className="px-3 py-2">
          <Button disabled={disabled} type="submit" className="w-100">
            Definir ordem
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default SortForm;

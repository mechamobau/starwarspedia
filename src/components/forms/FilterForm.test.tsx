import {
  screen,
  render,
  act,
  fireEvent,
  prettyDOM,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import FilterForm from './FilterForm';
import App from '../../App';
import userEvent from '@testing-library/user-event';

describe('Filter Form Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should have a submit button and it should be disabled', async () => {
    render(
      <FilterForm
        onSubmit={jest.fn()}
        columnLabels={{ rotation_period: 'rotation_period' }}
      />
    );
    const buttonEl = screen.getByRole('button', { name: /incluir filtro/i });
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toBeDisabled();
  });

  it('should enable button when operation is changed', async () => {
    render(
      <FilterForm
        onSubmit={jest.fn()}
        columnLabels={{ rotation_period: 'rotation_period' }}
      />
    );

    const selectEl = screen.getByPlaceholderText(/operação/i);
    userEvent.selectOptions(selectEl, 'GREATER_THAN');

    const buttonEl = screen.getByRole('button', { name: /incluir filtro/i });

    await waitFor(() => expect(buttonEl).toBeEnabled());
  });

  it('should enable button when value is changed', async () => {
    const { container } = render(
      <FilterForm
        onSubmit={jest.fn()}
        columnLabels={{ rotation_period: 'rotation_period' }}
      />
    );

    let buttonEl = screen.getByRole('button', { name: /incluir filtro/i });
    await waitFor(() => expect(buttonEl).toBeDisabled());

    const inputEl = screen.getByPlaceholderText(/Valor/i);
    userEvent.type(inputEl, '10');

    buttonEl = screen.getByRole('button', { name: /incluir filtro/i });
    await waitFor(() => expect(buttonEl).toBeEnabled());

    // console.log(prettyDOM(container))
  });
  it('should call handleSubmit when clicked', async () => {
    const onSubmitMock = jest.fn();
    expect(onSubmitMock).toBeCalledTimes(0);

    render(
      <FilterForm
        onSubmit={onSubmitMock}
        columnLabels={{ rotation_period: 'rotation_period' }}
      />
    );

    const inputEl = screen.getByPlaceholderText(/Valor/i);
    userEvent.type(inputEl, '10');
    let buttonEl = screen.getByRole('button', { name: /incluir filtro/i });
    await waitFor(() => {
      expect(buttonEl).toBeEnabled();
      userEvent.click(buttonEl);
    });

    expect(onSubmitMock).toBeCalledTimes(1);
  });
});

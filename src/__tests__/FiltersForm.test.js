import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe('Testes de integração do componente FilterForm', () => {
  const columnsOptions = [
    "Diâmetro",
    "Translação",
    "População",
    "Rotação",
    "Superfície da Água",
  ];
  const comparisonOptions = ['Igual a', 'Maior que', 'Menor que'];

  let columnInput;
  let comparisonInput;
  let valueInput;
  let submitBtn;

  beforeEach(() => {
    act(() => {
      render(<App />);
    });
    screen.getByRole('button', { name: 'Filtros' }).click();

    columnInput = screen.getByPlaceholderText('Coluna a ser comparada');
    comparisonInput = screen.getByPlaceholderText('Operação');
    valueInput = screen.getByPlaceholderText('Valor');
    submitBtn = screen.getByRole('button', {
      name: /incluir filtro/i
    })
  });

  it('Deve renderizar todos componentes corretamente', () => {
    expect(columnInput).toBeInTheDocument();
    expect(comparisonInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it('Renderiza corretamente as opções de coluna', () => {
    const options = within(columnInput).getAllByRole('option');
    expect(options).toHaveLength(columnsOptions.length);

    columnsOptions.forEach((column) => {
      const opt = within(columnInput).getByText(column);
      expect(opt).toBeInTheDocument();
    });
  })

  it('Renderiza corretamente as opções de comparação', () => {
    const options = within(comparisonInput).getAllByRole('option');
    expect(options).toHaveLength(comparisonOptions.length);

    comparisonOptions.forEach((comparison) => {
      const opt = within(comparisonInput).getByText(comparison);
      expect(opt).toBeInTheDocument();
    });
  });

  it.only('O filtro de igual a, funciona corretamente', async () => {
    act(() => {
      userEvent.selectOptions(columnInput, 'Rotação');
      userEvent.selectOptions(comparisonInput, 'Igual a');
      userEvent.type(valueInput, '24');
      userEvent.click(submitBtn);
    });

    // não faço a menor ideia do pq isso não funciona, aparece um erro de act no dispatch do setFilterByNumericValues do useFilter
    // acredito que o erro aconteça devido ao uso do constate, aparentemente tem algo que impede que o dispatch seja chamado sem o uso do act e o constate está impedindo isso
    // além disso o formik dispara erros de act também, mesmo quando comento tudo e apenas renderizo o App dentro ou fora de um act.

    expect(await screen.findByText('Rotação igual a 24')).toBeInTheDocument();

    const tr = await screen.findAllByRole('row');
    expect(tr).toHaveLength(3);
  });
})

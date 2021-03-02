import React from "react"
import { render } from "@testing-library/react"
import Table from "./Table"

describe('Table Component header', () => {
    const dataMock = [{
        name: "Jhon",
        surname: "Doe"
    },
    {
        name: "Foo",
        surname: "Bar"
    }]

    it('should display table header containing keys passed in data object', () => {
        const keys = Object.keys(dataMock[0])
    
        const { queryByTestId } = render(<Table data={dataMock} />)
    
        const tableHeaderCollection = queryByTestId("table-header-row")?.children ?? null;
    
        const tableHeaderArray = Array.from(tableHeaderCollection ?? []);
    
        expect(tableHeaderArray.map(element => element.textContent)).toStrictEqual(keys)
    
    })
    
    it('should display custom header if `columnLabels` prop is passed', () => {
        const columnLabels = {
            "name": "Nome",
            "surname": "Sobrenome"
        }

        const columnLabelsValues = Object.values(columnLabels);

        const { queryByTestId } = render(<Table data={dataMock} columnLabels={columnLabels} />)

        const tableHeaderCollection = queryByTestId("table-header-row")?.children ?? null;
    
        const tableHeaderArray = Array.from(tableHeaderCollection ?? []);
    

        expect(tableHeaderArray.map(element => element.textContent)).toStrictEqual(columnLabelsValues)
    
    })
})
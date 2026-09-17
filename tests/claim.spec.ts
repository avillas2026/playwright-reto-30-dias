import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { SidePanel, SideMenuOption } from '../components/SidePanel';

test('capture all amounts', async({ page}) => {

    await page.goto ("/web/index.php/claim/viewAssignClaim")

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    const amounts: number[] = [] 
    const rowCount = await allBodyRows.count()
    console.log ('Number of Rows: ', rowCount)

    for (let i = 0; i < rowCount; i++) {
        const amountCell = allBodyRows.nth(i).getByRole('cell').nth(7)
        const amountText = await amountCell.textContent()
        console.log ("This is the amount in text: ", amountText)

        if(amountText === null){
            continue
        }

        const convertedNumber = parseFloat(amountText?.replace(/,/g, '').trim()) 

        amounts.push(convertedNumber)

    }

    console.log("Totos los amounts: ",amounts)

        let total = 0
        for (let amount of  amounts){
            total += amount
        }
        console.log ('Total is: ', total)
    
    const promedio = total/rowCount
    console.log ('El promedio es: ', promedio)
    
    const maximo = Math.max(...amounts)
    console.log ('Valor maximo es: ', maximo)

    const minimo = Math.min(...amounts)
    console.log ('Valor minimo es: ', minimo)

    

});
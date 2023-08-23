const {test,expect} = require('@playwright/test')
import {UserManagement} from '../Page-Objects/UserManagement'

let page;
function User (page) {
return new UserManagement(page)
}

test.beforeEach(async({browser})=>{

page = await browser.newPage()  
const user =   User(page)

    await user.navigateToPage()

    await user.emailField('cbkc@dataseers.ai')

    await user.submit()

    await user.passwordField('Password@1')

    await user.submit()

    await expect(page).toHaveURL('https://dev.dataseers.in/')

    await page.waitForSelector('.ant-page-header-heading-title')
})

  test("Login", async()=>{

      const user =   User(page)

    // const user =   User(page)

    // await user.navigateToPage()

    // await user.emailField('nehemiah@dataseers.ai')

    // await user.submit()

    // await user.passwordField('Moses@1234567')

    // await user.submit()

    // await expect(page).toHaveURL('https://dev.dataseers.in/')

    // await page.waitForSelector('.ant-page-header-heading-title')

    //1: Click on the Admin& Billing Module
    await user.admin()
    //2. Click on the User Management Sub-Module
     await user.userMgmt()
     //3: Verify the Page title of the user page
     await page.waitForSelector("//span[@title='User Management']")
    //4. Click on the Add (+) button
     await user.addBtn()
    //5. Provide the necessary details
     await user.userDetais("lucas","mark","992539087","lucas@central-payments.com")
    
     await page.waitForTimeout(5000)   
    //  6. Read the Name from the listing page
    // await user.search("marcus")
    //7. Click on the download sample file on the listing page
    await user.DownloadSample()
   
})






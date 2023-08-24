const {test,expect} = require('@playwright/test')
import {UserManagement} from '../Page-Objects/UserManagement'

let page;
function User (page) {
return new UserManagement(page)
}


test.describe("Seerportal",()=> {

  test.beforeEach(async({browser})=> {

    page = await browser.newPage()  
    const user = User(page)
    
        await user.navigateToPage()
    
        await user.emailField('cbkc@dataseers.ai')
    
        await user.submit()
    
        await user.passwordField('Password@1')
    
        await user.submit()
    
    })

  test.afterEach(async()=>{
      const user = User(page)
      await user.logout()
      await page.screenshot({ path: 'UserManagement.png', fullPage: true });  
    })  

  test("Home Page", async()=>{

        const user =   User(page)
  
        await expect(page).toHaveURL("https://dev.dataseers.in/")

        await page.waitForSelector('.ant-page-header-heading-title')
    })

  test("User Management: Add", async()=>{

      const user = User(page)

      //1: Click on the Admin& Billing Module
        await user.admin()

      //2. Click on the User Management Sub-Module
        await user.userMgmt()

      //3: Verify the Page title of the user page
        await page.waitForSelector("//span[@title='User Management']")

      //4. Click on the Add (+) button
        await user.addBtn()

      //5. Provide the necessary details
        await user.userDetais("christopher","roy","543179177","christopher@central-payments.com")
        
        await page.waitForTimeout(5000)   

    })

  test("User Management: Read", async()=>{

      const user = User(page)

      //1: Click on the Admin& Billing Module
      await user.admin()

      //2. Click on the User Management Sub-Module
        await user.userMgmt()

      //3. Verify the Page title of the user page
        await page.waitForSelector("//span[@title='User Management']")

      //4. Read the Name from the listing page
      await user.search("christopher")
    })


  test("User Management: Download", async()=> {

      const user = User(page)

      //1: Click on the Admin& Billing Module
      await user.admin()

      //2. Click on the User Management Sub-Module
      await user.userMgmt()

      //3. Verify the Page title of the user page
      await page.waitForSelector("//span[@title='User Management']")

      //4. Download sample file from the listing page
      await user.download()
  })
})
















   






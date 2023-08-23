const {expect} = require('@playwright/test')

exports.UserManagement = class UserManagement {

    constructor(page) {
        this.page = page;

        // Login Details
        this.emailInput = '#email'
        this.passwordInput = '#password'
        this.submitButton='button[type="submit"]'

       // User Management Automating Scripts : -

       //1. Navigate to the user management page
        this.menu = "//img[@alt='Administration']"
        this.user = "li[id='2'] li[id='2'] a[title='User Management']"
        
        // Basic Details Tab
        this.addbtn = "//button[@title='Add new user']"
        this.userFirstNameInput ='#first_name'
        this.lastNameInput = "#last_name"
        this.selectBox = "#phone_code"
        this.phoneCode="div.ant-select-open"
        this.contactField ="#contact_number"
        this.emailInput="#email"
        this.roleInput = "#role_id"
        this.programGroupInput = "#program_group"
        this.reportGroupInput="#report_group"
        this.emailNotification = '#email_notification'
        this.DeletedButton="#is_deleted"
        this.handleSubmit = "//button[@id='handleSubmit']//*[name()='svg']"
        
        // Navigate to Advance Tab : Locator Captured
        this.advanceTab="//div[@id='rc-tabs-0-tab-4']"

        // Read 
        this.firstName="//th[@title='First Name']//span[@role='button']//*[name()='svg']//*[name()='path' and contains(@d,'M15.5 14h-')]"
        this.searchInput ="//input[@placeholder='Search first_name']"
        this.searchBtn="//span[normalize-space()='Search']"
         
        // Validate the Email Address already exists or not 
        this.emailAlreadyExists="//div[contains(text(),'Email address already exists.')]"

    }

    // Launch the Seerportal Page

    async navigateToPage(){
        await this.page.goto('https://dev.dataseers.in/')
    }

    // Fill the Login Details
    
    async emailField(email) { await this.page.locator(this.emailInput).fill(email) }
 
    async passwordField(password) { await this.page.locator(this.passwordInput).fill(password) }

    async submit() {await this.page.locator(this.submitButton).click()}

    async admin(){await this.page.locator(this.menu).click()}

    async userMgmt() { await this.page.locator(this.user).click()}

    async addBtn() {
        await this.page.locator(this.addbtn).click() 
    
        //Assertion on click without filling the inputs
        //  await this.page.locator(this.handleSubmit).click()
        //  let errorMessage = await this.page.locator("//span[normalize-space()='Please make sure all required fields are filled']")
        //  await expect(errorMessage).toHaveText("Please make sure all required fields are filled")
    }

    // Basic Details tab : Fill the Required fields
    async userDetais(firstname,lastname,phone,email) {
        await this.page.locator(this.userFirstNameInput).fill(firstname)
        await this.page.locator(this.lastNameInput).fill(lastname)
        await this.page.getByTitle("Select phone code").click()
        await this.page.getByText("93 - Afghanistan").click()
        this.page.waitForTimeout(2000)
        await this.page.locator(this.contactField).fill(phone)
        this.page.waitForTimeout(2000)
        await this.page.locator(this.emailInput).fill(email)
        
        
        await this.page.locator(this.roleInput).click()
        await this.page.getByText('Business Analyst').click();
        await this.page.locator(this.programGroupInput).click()
        await this.page.getByText('All Programs').click();
        this.page.waitForTimeout(2000)
        await this.page.locator(this.reportGroupInput).click()
        await this.page.getByText('All Reports').click();
        await this.page.locator(this.handleSubmit).click()
        const selectCard = this.page.locator("//div[@class='ant-message-notice-content']")
        await expect(selectCard).toHaveText("Please select at least 1 card element in Advance config tab")
        await this.page.locator(this.advanceTab).click()

        // Web Table : On Navigating to the Advance tab : Select the card  
     
       const table = await this.page.locator('#rc-tabs-0-panel-4 table')
       const columns =await table.locator('thead tr th')
      // console.log('No of columns', await columns.count())

      const rows = await table.locator('tbody tr')
     // console.log('No of Rows',await rows.count())


      await SelectCardMenu(rows,this.page,'Transaction monitoring panel')
      // await SelectCardMenu(rows,this.page,'Metrics')
      //await SelectCardMenu(rows,this.page,'IdentitySeer')

     await this.page.locator(this.handleSubmit).click()

    //! Validate the Email Address already exists
    // let email_exist = await this.page.locator(this.emailAlreadyExists)
    // await expect.soft(email_exist).toHaveText("Email address already exists.")
}

   //! After Success : Read Operation : Search Operation
    //   async search(name){
    //     await this.page.locator(this.firstName).click()
    //     await this.page.locator(this.searchInput).fill(name)
    //     await this.page.locator(this.searchBtn).click()
    //     this.page.waitForTimeout(2000)

    //     //  Click on the Reset Button 
    //     //await this.page.getByTitle("Reset filter").click()
        
    //     await this.page.screenshot({ path: 'UserManagement.png', fullPage: true });  
    // }

//! Download the sample file from the listing page and store it in the file
// Start waiting for download before clicking
    async DownloadSample () {
        const download = await Promise.all([
             this.page.waitForEvent('download'),
             this.page.getByTitle("Download sample file").click()

        ])
         const fileName  = download[0].suggestedFilename()
         await download[0].saveAs(fileName)
    }
}

// Select one card
async function SelectCardMenu (rows,page,name){
      // Matched Rows
      const matchedRows = rows.filter({
        has:page.locator('td'),
        hasText:name
      })
      await matchedRows.locator('input').check()
}
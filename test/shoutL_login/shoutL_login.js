const { Builder, By, Browser, until, key } = require('selenium-webdriver');
const mocha = require('mocha');
const fs = require('fs');
const path = require('path');

(async function shoutl_login() {
    let driver;
    let website_url = 'https://staging-app.shoutl.com/';
    let stg_username = 'pranjal.p+staging_Pranjal@paytunes.in';
    let stg_password = 'User@123';

    if (!stg_username || !stg_password) {
        console.log('Please provide valid staging credentials');
        return;
    }

    //Helper functions 
    //maximize the size of the window
    async function maximizeWindow(driver) {
        await driver.manage().window().maximize();
    }

    //Helper function to take the screenshot
    async function takeScreenshot(driver, filename) {
        const screenshot = await driver.takeScreenshot();
        const filepath = path.join(__dirname, filename);
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log(`Screenshot saved as ${filepath}`);
    }


    describe('Login to shoutL staging', async function () {
        try {
            this.timeout(25000); //Increase timeout to 10 seconds
            before(async function () {
                driver = await new Builder().forBrowser(Browser.CHROME).build();
                await maximizeWindow(driver);

            });
            after(async function () {
                await driver.quit();
                console.log('Test Suite completed');
            });
            //fetch the website_url
            it('should fetch the website', async function () {
                // let currentUrl = await driver.getwebsite_url();
                await driver.get(website_url);
                console.log(`Current URL: ${website_url}`);
                // expect(currentUrl).to.equal(website_url);
                await takeScreenshot(driver, 'before_login.png');
            })

            //Login to shoutl 
            it('should login with valid credentials', async function () {

                //enter email and password to login
                await driver.wait(until.elementLocated(By.id('email')), 25000);
                await driver.findElement(By.id('email')).sendKeys(stg_username);
                await driver.wait(until.elementLocated(By.id('password')), 25000);
                await driver.findElement(By.id('password')).sendKeys(stg_password);
                await takeScreenshot(driver, 'after_login.png');
            })
            //click on the submit button to submit
            it('should click on the submit button', async function () {
                await driver.wait(until.elementLocated(By.xpath("//button[@type='submit']")),3000);
                await driver.findElement(By.xpath("//button[@type='submit']")).click();
                await driver.sleep(2000);
                await takeScreenshot(driver, 'after_submit.png');
            });
            //cross the single form appearing on the screen
            //div[@class='relative']/span
            it('should click to cut the form', async function (){
                await driver.sleep(5000);
                await driver.wait(until.elementLocated(By.xpath("//div[@class='relative']/span")),10000);
                await driver.findElement(By.xpath("//div[@class='relative']/span")).click();
                
                await takeScreenshot(driver, 'after_cut.png');
            });
            

        } catch (error) {
            console.error(error.message);

        }
    })

})();



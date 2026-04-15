import  { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";


test.describe.serial('Login Test Validations', ()=>{
    let login: LoginPage;

    test.beforeEach('Navigate Page', async ({page})=>{
        login = new LoginPage(page);
        await login.verifyLoginPageLoadaded();
        await page.goto('https://www.saucedemo.com/');
    })

    test.afterEach('Close Browser', async ({page})=>{
        await page.close();
    })

    test('Login to Site',{tag: '@regression'}, async ({page})=>{
        //const login = new LoginPage(page);
        await login.loginPage('standard_user','secret_sauce');
        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
        console.log(page.url());
    })

    test('Validate Required UserName',{annotation: {
            type:'@regression',
            description: 'Perfom Regression Testing.'
            }
        }, async({page})=>{
        await login.clickButtonWithEmptyValues();
        /*const errorMessage = await login.getErrorUserName();
        console.log(errorMessage);*/
        expect(await login.getErrorUserName()).toEqual('Epic sadface: Username is required');
        console.log(await login.getErrorUserName());
    })

    test('Validate Requiered Password', async ({page})=>{
        await login.clickButtonWithOnlyUser('standard_user');
        expect(await login.getErrorPassword()).toEqual('Epic sadface: Password is required');
        console.log(await login.getErrorPassword());
    })

    test.skip('Validate wrong Credentials', async ({page})=>{
        await login.fillWrongCredentials('a','b');
        expect(await login.getErrorBothCredentials()).toEqual('Epic sadface: Username and password do not match any user in this service');
        console.log(await login.getErrorBothCredentials());
    })

})
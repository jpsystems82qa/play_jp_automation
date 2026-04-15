import { Page, Locator } from "@playwright/test";

export class LoginPage{
    private userName: Locator;
    private password: Locator;
    private loginButton: Locator;
    private errorMessageUserName: Locator;
    private errorMessagePassword: Locator;
    private errorMessageUserandPassword: Locator;

    constructor(page: Page){
        this.userName = page.getByRole('textbox',{name: 'UserName'});
        this.password = page.getByRole('textbox',{name: 'Password'});
        this.loginButton = page.getByRole('button',{name: 'Login'})
        this.errorMessageUserName = page.getByRole('heading',{name: 'Epic sadface: Username is required'});
        this.errorMessagePassword = page.getByRole('heading',{name: 'Epic sadface: Password is required'});
        this.errorMessageUserandPassword = page.getByRole('heading',{name: 'Epic sadface: Username and password do not match any user in this service'});
        //this.errorMessageUserName = page.locator('[data-test="error"]');
    }

    async verifyLoginPageLoadaded(){
        await this.userName.isVisible();
        await this.password.isVisible();
        await this.loginButton.isVisible();
    }

    async fillUserName(username: string){
        await this.userName.fill(username);
    }

    async fillPassword(password: string){
        await this.password.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.isVisible();
        await this.loginButton.click();
    }
    
    async loginPage(username: string, password: string){
        await this.fillUserName(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    async getErrorUserName(): Promise<string>{
        let name = null
        name = await this.errorMessageUserName.textContent()
        if (name?.includes('sadface')){
            console.log('Great')
        }else{
            console.log('Nothing')
        }
        return await this.errorMessageUserName.textContent() || '';
    }

    async getErrorPassword(){
        return await this.errorMessagePassword.textContent();
    }
    
    async getErrorBothCredentials(){
        return await this.errorMessageUserandPassword.textContent();
    }
    

    async clickButtonWithEmptyValues(){
        await this.clickLoginButton();
    }

    async clickButtonWithOnlyUser(userName: string){
        await this.fillUserName(userName);
        await this.clickLoginButton();
    }

    async fillWrongCredentials(userName: string, password: string){
        await this.fillUserName(userName);
        await this.fillPassword(password);
        await this.clickLoginButton();
    } 

}
package com.revature.poms;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class Employee {

	@FindBy(id="newRequest")
	static WebElement NewRequestButton;
	
	@FindBy(id="requestName")
	static WebElement RequestName;
	
	@FindBy(id="Amount")
	static WebElement Amount;
	
	@FindBy(id="submitRequest")
	static WebElement SubmbitRequestButton;
	
	@FindBy(id="tr")
	static WebElement requestname;
	
	@FindBy(id="logoutbutton")
	static WebElement logoutButton;
	
	
	public Employee(WebDriver driver) {
		PageFactory.initElements(driver, this);
	}
	
	public void newRequest(String name, String amount) {
		NewRequestButton.click();
		RequestName.sendKeys(name);
		Amount.sendKeys(amount);
		SubmbitRequestButton.click();
	}
	
	public void logout() {
		logoutButton.click();
	}

	public static WebElement getRequestname() {
		return requestname;
	}

	public static void setRequestname(WebElement requestname) {
		Employee.requestname = requestname;
	}
	
	
}

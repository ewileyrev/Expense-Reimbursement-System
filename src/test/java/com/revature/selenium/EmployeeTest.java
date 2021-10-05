package com.revature.selenium;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import com.revature.poms.Employee;
import com.revature.poms.Login;

import org.junit.Assert;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EmployeeTest {
	private static WebDriver driver;
	Employee Employee = new Employee(driver);
	
	@BeforeClass
	public static void setup() {
		System.setProperty("webdriver.chrome.driver", "drivers/chromedriver.exe");
		driver = new ChromeDriver();
		driver.get("C:\\Users\\Ethan\\Desktop\\Projects\\ReimbursementSystem\\src\\main\\java\\static\\Login.html");
		Login Login = new Login(driver);
		Login.login("Sam","Employee");
		Employee Employee = new Employee(driver);
	}
	
	
	@Test
	
	public void Test1NewRequest() {
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		Employee.newRequest("test", "0");
		Assert.assertEquals("redirected unsuccessfully", "http://localhost:7000/Employee.html", driver.getCurrentUrl());
	}
	
	@Test
	public void Test2CheckGet() {
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		WebElement requestname = Employee.getRequestname();
		System.out.println(requestname.getText());
		Assert.assertEquals("GET unsuccessfully", requestname.getText(), "test");
	}
	
	@Test
	public void Test3Logout() {
		Employee.logout();
		Assert.assertEquals("redirected unsuccessfully", "http://localhost:7000/Login.html", driver.getCurrentUrl());
	}
	
	
}
package com.revature.controller;

import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;
import static io.javalin.apibuilder.ApiBuilder.post;

import javax.servlet.http.HttpSession;

import com.revature.model.Account;
import com.revature.service.AccountService;

import io.javalin.Javalin;
import io.javalin.http.Handler;

public class AccountController {

	private AccountService accountService;
	
	public AccountController(Javalin app) {
		this.accountService = new AccountService();
		app.routes(()->{
		path("/login",()->{
			post(login);
		});	
		path("/newAccount",()->{
			post(save);
		});
		path("/logout",()->{
			post(logout);
		});
		path("/test",()->{
			get(testSession);
		});
		});
	}
	
	private Handler login = ctx->{
		Account account = new Account();
		account.setUserName(ctx.req.getParameter("username"));
		account.setPassword(ctx.req.getParameter("password"));
		Account type = this.accountService.login(account);

		if(type==null) {
			ctx.redirect("/Login.html");
			
		}else if(type.getType().equals("Manager")) {
			ctx.status(200);
			ctx.req.getSession();
			HttpSession session = ctx.req.getSession(false);
			session.setAttribute("id", type.getType());	
			session.setAttribute("name", type.getName());
			ctx.redirect("/Manager.html");
			
		}else if(type.getType().equals("Employee")) {
			ctx.req.getSession();
			HttpSession session = ctx.req.getSession(false);
			session.setAttribute("id", type.getId());
			session.setAttribute("name", type.getName());
			ctx.status(200);
			ctx.redirect("/Employee.html");
			
		}
		
		account = null;
	};
	
	private Handler save = ctx->{
		ctx.req.getSession();
		Account account = new Account();
		account.setUserName("Ashley");
		account.setPassword("Employee");
		account.setType("Employee");
		account.setId("3");
		account.setName("Ashley");
		this.accountService.save(account);
		
	};
	
	private Handler logout = ctx->{
		HttpSession session = ctx.req.getSession(false);
		ctx.redirect("/Login.html");
		if(session != null) session.invalidate();
	};
	
	private Handler testSession = ctx->{
		HttpSession session = ctx.req.getSession(false);
		Account account = new Account();
		if(session ==null) {
		account.setType("false");
		}
		ctx.json(account);
	};
	
}

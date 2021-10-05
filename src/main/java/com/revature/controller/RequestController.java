package com.revature.controller;

import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;
import static io.javalin.apibuilder.ApiBuilder.post;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.revature.model.ManagerStat;
import com.revature.model.Request;
import com.revature.service.RequestService;

import io.javalin.Javalin;
import io.javalin.http.Handler;

public class RequestController {
private RequestService requestService;

public RequestController(Javalin app) {
	this.requestService = new RequestService();
	app.routes(()->{
		path("/newRequest",()->{
			post(saveReq);
		});
		path("/update",()->{
			post(update);
		});
		path("/EmployeeRequestPending",()->{
			get(employeeRequestPending);
		});
		path("/EmployeeRequestHistory",()->{
			get(employeeRequestHistory);
		});
		path("/ManagerRequestPending",()->{
			get(managerRequestPending);
		});
		path("/ManagerRequestHistory",()->{
			get(managerRequestHistory);
		});
		path("/Stat",()->{
			get(stat);
		});
	});
}


private Handler saveReq = ctx->{
	HttpSession session = ctx.req.getSession(false);
	Request request = new Request();
	request.setId(Integer.parseInt(session.getAttribute("id").toString()));
	request.setrName(ctx.req.getParameter("rName"));
	request.setName(session.getAttribute("name").toString());
	request.setAmount(Double.parseDouble(ctx.req.getParameter("amount")));
	request.setStatus("Pending");
	this.requestService.save(request);
	ctx.redirect("/Employee.html");
};

private Handler employeeRequestPending = ctx->{
	HttpSession session = ctx.req.getSession(false);
	List<Request> request = new ArrayList<Request>();
	List<Request> pending = new ArrayList<Request>();
	if(session != null) {
		request = this.requestService.findAll();
	
		int id =Integer.parseInt(session.getAttribute("id").toString());

		for(int i =0;i<request.size();i++) {
			if(request.get(i).getId() == id) {
				if(request.get(i).getStatus().equals("Pending")) {
			pending.add(request.get(i));
				}
			}
	}

	}
	ctx.json(pending);
};

private Handler employeeRequestHistory = ctx->{
	HttpSession session = ctx.req.getSession(false);
	List<Request> request = new ArrayList<Request>();
	List<Request> history = new ArrayList<Request>();
	if(session != null) {
		request = this.requestService.findAll();
	
		int id =Integer.parseInt(session.getAttribute("id").toString());

		for(int i =0;i<request.size();i++) {
			if(request.get(i).getId() == id) {
				if(request.get(i).getStatus().equals("Pending")) {
				}else {
					history.add(request.get(i));
				}
			}
	}

	}
	System.out.println(history);
	ctx.json(history);

};	

private Handler managerRequestPending=ctx->{
	HttpSession session = ctx.req.getSession(false);
	List<Request> request = new ArrayList<Request>();
	List<Request> pending = new ArrayList<Request>();
	if(session != null) {
		request = this.requestService.findAll();
		for(int i =0;i<request.size();i++) {
		if(request.get(i).getStatus().equals("Pending")) {
			pending.add(request.get(i));
				}
	}
	}
	ctx.json(pending);
};

private Handler managerRequestHistory=ctx->{
	HttpSession session = ctx.req.getSession(false);
	List<Request> request = new ArrayList<Request>();
	List<Request> pending = new ArrayList<Request>();
	if(session != null) {
		request = this.requestService.findAll();
		for(int i =0;i<request.size();i++) {
		if(request.get(i).getStatus().equals("Pending")) {
		}else {
			pending.add(request.get(i));
				}
	}
	}
	ctx.json(pending);
};

private Handler stat = ctx->{
	HttpSession session = ctx.req.getSession(false);
	List<Request> request = new ArrayList<Request>();
	ManagerStat stat = new ManagerStat();
	double amount=0;
	
	if(session != null) {
		request = this.requestService.findAll();
		for(int i =0;i<request.size();i++) {
			double total = (double) request.get(i).getAmount();
			amount =stat.getTotal();
			//total
			if(request.get(i).getStatus().equals("Approve")) {
			stat.setTotal(total+stat.getTotal());
			//spender
			//amount
			if(total>amount) {
				stat.setHighestamount(total);
				stat.setHighestSpender(request.get(i).getName().toString());
			}
			}
		}
	}
	ctx.json(stat);
	
};

private Handler update = ctx->{
	HttpSession session = ctx.req.getSession(false);
	Request updateRequest = ctx.bodyAsClass(Request.class);
	System.out.println(updateRequest.toString());
	this.requestService.update(updateRequest);
	ctx.status(200);
	ctx.redirect("/Manager.html");
	ctx.redirect("/login");
	System.out.println("2");
	
};

}

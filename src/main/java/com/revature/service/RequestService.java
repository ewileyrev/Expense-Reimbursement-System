package com.revature.service;

import java.util.List;

import com.revature.model.Account;
import com.revature.model.Request;
import com.revature.repository.RequestRepository;

public class RequestService {

	private RequestRepository requestRepository;
	
	
	public RequestService() {
		this.requestRepository = new RequestRepository();
	}
	
	public void save(Request request) {
		this.requestRepository.save(request);
	}
	
	public List<Request> findAll(){
		return this.requestRepository.findAll();
	}
	
	public void update(Request request) {
		this.requestRepository.update(request);
	}
	
}

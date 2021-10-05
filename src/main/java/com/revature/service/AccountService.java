package com.revature.service;

import com.revature.model.Account;
import com.revature.repository.AccountRepository;

public class AccountService {

	private AccountRepository accountRepository;
	
	public AccountService() {
		this.accountRepository = new AccountRepository();
	}
	
	
	public Account login(Account account) {
		return this.accountRepository.login(account);
	}
	
public void save(Account account) {
	this.accountRepository.save(account);
}
	
}

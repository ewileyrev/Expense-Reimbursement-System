package com.revature.repository;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.revature.model.Account;
import com.revature.util.HibernateSessionFactory;


public class AccountRepository {
	
public void save(Account account) {
	Session session = null;
	Transaction tx = null;
	
	try {
		session = HibernateSessionFactory.getSession();
		tx = session.beginTransaction();
		session.save(account);
		tx.commit();
	}catch(HibernateException e) {
		tx.rollback();
		e.printStackTrace();
	}finally {

		session.close();
	}
}

public Account login(Account account) {
	Account dbaccount = new Account();
	Session session = null;
	Transaction tx = null;
	
	try {
	session = HibernateSessionFactory.getSession();
	tx = session.beginTransaction();
	
	dbaccount = (Account) session.get(Account.class,account.getUserName());
	if(dbaccount == null) {
		return null;
	}else if(dbaccount.getPassword().equals(account.getPassword())) {
		return dbaccount;
	}

	}catch(HibernateException e) {
	tx.rollback();
	e.printStackTrace();
}finally {

	session.close();
}

	return null;


}

}





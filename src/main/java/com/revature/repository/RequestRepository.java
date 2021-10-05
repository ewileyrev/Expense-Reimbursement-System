package com.revature.repository;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.revature.model.Request;
import com.revature.util.HibernateSessionFactory;

public class RequestRepository {
	
	public void save(Request request) {
		Session session = null;
		Transaction tx = null;
		
		try {
			session = HibernateSessionFactory.getSession();
			tx = session.beginTransaction();
			session.save(request);
			tx.commit();
		}catch(HibernateException e) {
			tx.rollback();
			e.printStackTrace();
		}finally {

			session.close();
		}
	}
	
	public List<Request> findAll(){
		List<Request> request = null;
		
		Session session = null;
		Transaction tx = null;
		
		try {
			session=HibernateSessionFactory.getSession();
			tx = session.beginTransaction();
			
			request = session.createQuery("FROM Request",Request.class).getResultList();
			tx.commit();
		}catch(HibernateException e) {
			tx.rollback();
			e.printStackTrace();
		}finally {
			session.close();
		}
		return request;
	}

	public void update(Request request) {
		Session session = null;
		Transaction tx = null;
		
		try {
			session = HibernateSessionFactory.getSession();
			tx = session.beginTransaction();
			session.update(request);
			tx.commit();
		}catch(HibernateException e) {
			tx.rollback();
			e.printStackTrace();
		}finally {
			session.close();
		}
	}
}

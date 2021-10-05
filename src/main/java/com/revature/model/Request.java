package com.revature.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity

@Table(name="request")

public class Request {
	@Column
	private int id;
	
	@Column
	private String name;

	@Id
	@Column
	@GeneratedValue(generator="requestid",strategy = GenerationType.AUTO)
	@SequenceGenerator(allocationSize = 1, name = "requestid")
	private int requestid;
	
	
	@Column
	private String rName;
	
	@Column
	private double amount;
	
	@Column
	private String status;

	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getrName() {
		return rName;
	}

	public void setrName(String rName) {
		this.rName = rName;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getRequestid() {
		return requestid;
	}

	public void setRequestid(int requestid) {
		this.requestid = requestid;
	}

	@Override
	public String toString() {
		return "Request [id=" + id + ", name=" + name + ", requestid=" + requestid + ", rName=" + rName + ", amount="
				+ amount + ", status=" + status + "]";
	}


	
	
	
}

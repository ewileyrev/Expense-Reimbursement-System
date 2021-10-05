package com.revature.model;

public class ManagerStat {

	private double total;
	
	private String highestSpender;
	
	private double highestamount;

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public String getHighestSpender() {
		return highestSpender;
	}

	public void setHighestSpender(String highestSpender) {
		this.highestSpender = highestSpender;
	}

	public double getHighestamount() {
		return highestamount;
	}

	public void setHighestamount(double highestamount) {
		this.highestamount = highestamount;
	}

	@Override
	public String toString() {
		return "ManagerStat [total=" + total + ", highestSpender=" + highestSpender + ", highestamount=" + highestamount
				+ "]";
	}
	
	


	
	
}

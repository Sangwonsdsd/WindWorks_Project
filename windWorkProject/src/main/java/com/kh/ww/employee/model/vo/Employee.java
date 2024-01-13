package com.kh.ww.employee.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Employee {
	private int empNo;
	private String empName;
	private String empEmail;
	private String empPwd;
	private String empPhone;
	private Date empAge;
	private String empGender;
	private String empAddress;
	private Date empEnrollDate;
	private Date empChangeDate;
	private int empStatus;
	private String empOnlineStatus;
	private	String profileFilePath;
	private String jobCode;
	private String deptCode;
	
	private String jobName;
	private String communityName;
	private String communityNo;
	private String communityPoint;
	private String deptName;
	
	private String condition;
	private String sorting;
	private String keyword;
	
	private int chatRoomNo;
	
	private String newPassword;

}

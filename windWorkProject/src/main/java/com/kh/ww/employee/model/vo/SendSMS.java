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
public class SendSMS {
	private int smsNo;
	private Date smsDate;
	private String smsName;
	private String smsPhone;
	private int smsConfirmNo;
}

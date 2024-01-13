package com.kh.ww.reservation.model.vo;


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
public class Reservation {
	private int reserNo;
	private int assNo;
	private int empNo;
	private String reserName;
	private String startTime;
	private String endTime;
	private String startDate;
	private String endDate;
	private String deleteStatus;
	private String assName;
	private String startDateTime;
	private String endDateTime;
	private String reserDate;
	private String empName;
}

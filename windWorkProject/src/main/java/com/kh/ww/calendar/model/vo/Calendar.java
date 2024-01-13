package com.kh.ww.calendar.model.vo;



import java.util.Date;

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
public class Calendar {
	private int calendarListNo;
	private int reservationNo;
	private int empNo;
	private String calendarName;
	private String calendarContent;
	private int calendarCategory;
	private Date startTime;
	private Date endTime;
}

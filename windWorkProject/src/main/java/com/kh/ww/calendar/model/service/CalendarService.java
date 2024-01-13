package com.kh.ww.calendar.model.service;

import java.util.ArrayList;

import com.kh.ww.calendar.model.vo.Calendar;

public interface CalendarService {
	
	// 일정 등록
	int insertCalendar(Calendar cal);

	// 일정 조회
	ArrayList<Calendar> selectCalendar(Calendar cal);

	// 일정 수정
	int updateCalendar(Calendar cal);

	// 일정 삭제
	int deleteCalendar(int calendarListNo);

	
	
}

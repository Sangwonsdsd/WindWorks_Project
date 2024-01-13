package com.kh.ww.calendar.model.service;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.ww.calendar.model.dao.CalendarDao;
import com.kh.ww.calendar.model.vo.Calendar;

@Service
public class CalendarServiceImpl implements CalendarService{
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Autowired
	private CalendarDao calendarDao;

	// 일정 등록
	@Override
	public int insertCalendar(Calendar cal) {
		return calendarDao.insertCalendar(sqlSession, cal);
	}

	// 일정 조회
	@Override
	public ArrayList<Calendar> selectCalendar(Calendar cal) {
		return calendarDao.selectCalendar(sqlSession, cal);
	}

	// 일정 수정
	@Override
	public int updateCalendar(Calendar cal) {
		return calendarDao.updateCalendar(sqlSession, cal);
	}

	// 일정 삭제
	@Override
	public int deleteCalendar(int calendarListNo) {
		return calendarDao.deleteCalendar(sqlSession, calendarListNo);
	}


}

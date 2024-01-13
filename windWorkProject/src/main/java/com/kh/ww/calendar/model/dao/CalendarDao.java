package com.kh.ww.calendar.model.dao;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.ww.calendar.model.vo.Calendar;

@Repository
public class CalendarDao {

	// 일정 등록
	public int insertCalendar(SqlSessionTemplate sqlSession, Calendar cal) {
		return sqlSession.insert("calendarMapper.insertCalendar", cal);
	}

	// 일정 조회
	public ArrayList<Calendar> selectCalendar(SqlSessionTemplate sqlSession, Calendar cal) {
		return (ArrayList)sqlSession.selectList("calendarMapper.selectCalendar", cal);
	}

	// 일정 수정
	public int updateCalendar(SqlSessionTemplate sqlSession, Calendar cal) {
		return sqlSession.update("calendarMapper.updateCalendar", cal);
	}

	// 일정 삭제
	public int deleteCalendar(SqlSessionTemplate sqlSession, int calendarListNo) {
		return sqlSession.delete("calendarMapper.deleteCalendar", calendarListNo);
	}

	
	
}

package com.kh.ww.calendar.controller;

import java.awt.datatransfer.SystemFlavorMap;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.kh.ww.calendar.model.service.CalendarService;
import com.kh.ww.calendar.model.vo.Calendar;
import com.kh.ww.employee.model.vo.Employee;

@Controller
public class CalendarController {

	@Autowired
	private CalendarService calendarService;
	
	// 캘린더 보여주기
	@RequestMapping("list.ca")
	public ModelAndView calendarList(ModelAndView mv, HttpSession session) {
		mv.setViewName("calendar/calendarListView");
		return mv;
	}
	
	// 일정 등록
	@ResponseBody
	@RequestMapping(value = "insert.ca", produces = "application/json; charset=UTF-8")
	public String insertCalendar(String start, String end, Calendar cal, HttpSession session) {
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		
		try {
			cal.setStartTime(dateFormat.parse(start));
			cal.setEndTime(dateFormat.parse(end));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		Employee loginUser = (Employee) session.getAttribute("loginUser");
		cal.setEmpNo(loginUser.getEmpNo());
		
		int result = calendarService.insertCalendar(cal);

		if (result > 0 && loginUser != null) {
			Gson gson = new Gson();
			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("loginUser", loginUser.getEmpNo());
			jsonObject.addProperty("result", result);
			
			return gson.toJson(jsonObject);
		} else {
			return "fail";
		}
	}
	
	// 일정 조회
	@ResponseBody
	@RequestMapping(value = "clist.ca", produces = "application/json; charset=UTF-8")
	public JSONObject ajaxSelectCalendarList(Calendar cal, HttpSession session) {
		Employee loginUser = (Employee) session.getAttribute("loginUser");
		cal.setEmpNo(loginUser.getEmpNo());
		ArrayList<Calendar> list = calendarService.selectCalendar(cal);

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("loginUser", loginUser.getEmpNo());
		jsonObject.put("list", list);
		
		return jsonObject;
		
	}
	
	// 일정 수정
	@ResponseBody
	@RequestMapping(value = "cupdate.ca")
	public String ajaxUpdateCalendar(String start, String end, Calendar cal, HttpSession session) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		try {
			cal.setStartTime(dateFormat.parse(start));
			cal.setEndTime(dateFormat.parse(end));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		int result = calendarService.updateCalendar(cal);
		
		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 일정 삭제
	@ResponseBody
	@RequestMapping(value = "cdelete.ca")
	public String ajaxDeleteCalendar(int calendarListNo, HttpSession session) {
		int result = calendarService.deleteCalendar(calendarListNo);
		
		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
}

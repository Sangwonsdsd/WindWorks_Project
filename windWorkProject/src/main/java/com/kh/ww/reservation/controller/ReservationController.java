package com.kh.ww.reservation.controller;

import java.util.Date;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.reservation.model.service.ReservationService;
import com.kh.ww.reservation.model.vo.Reservation;

@Controller
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	//예약페이지
	@RequestMapping("/reservationPage.re")
	public ModelAndView reservationPage(String reserDate, HttpSession session, ModelAndView mv) {
		System.out.println(reserDate);
		Employee e = (Employee)session.getAttribute("loginUser");
		Reservation r = new Reservation();
		r.setReserDate(reserDate);
		r.setEmpNo(e.getEmpNo());
		JSONObject result = new JSONObject();
		result.put("assetsList", reservationService.selectAssetsList());
		result.put("reservationList", reservationService.selectReservationList(r));
		result.put("reservationListDiv", reservationService.selectReservationListDiv(r));
		mv.addObject("result", new Gson().toJson(result))
			.addObject("reserDate", reserDate)
		  .setViewName("reservation/reservation");
		return mv;
	}
	
	//재물예약
	@RequestMapping("/reservation.as")
	public String reservationAssets(Reservation r, HttpSession session, Model model) {
		
		r.setStartDateTime(r.getStartDate() + " " + r.getStartTime());
		r.setEndDateTime(r.getEndDate() + " " +r.getEndTime());

		System.out.println(r.getStartDateTime());
		System.out.println(r.getEndDateTime());
		
		int result = reservationService.reservationAssets(r);
		if (result > 0) {
			session.setAttribute("alertMsg", "예약 성공");
			return "redirect:/reservationPage.re?reserDate=" + r.getStartDate();
		} else {
			model.addAttribute("alertMsg", "예약 실패");
			return "redirect:/reservationPage.re?reserDate=" + r.getStartDate();
		}
	}
	
	//재물예약취소
	@RequestMapping("/delete.re")
	public String deleteReservation(int reserNo, 
			String deleteDate, HttpSession session, Model model) {
		System.out.println(deleteDate);
		int result = reservationService.deleteReservation(reserNo);
		
		if (result > 0) {
			session.setAttribute("alertMsg", "반납 성공");
			return "redirect:/reservationPage.re?reserDate=" + deleteDate;
		} else {
			model.addAttribute("alertMsg", "반납 실패");
			return "redirect:/reservationPage.re?reserDate=" + deleteDate;
		}
	}
}

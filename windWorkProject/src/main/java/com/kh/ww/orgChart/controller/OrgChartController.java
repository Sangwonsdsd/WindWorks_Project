package com.kh.ww.orgChart.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.kh.ww.chatting.model.service.ChattingService;
import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.orgChart.model.service.OrgChartService;

@Controller
public class OrgChartController {
	
	@Autowired
	private OrgChartService orgChartService;
	
	// 조직도차트 첫화면
	@RequestMapping("list.org")
	public ModelAndView orgChartList(ModelAndView mv, HttpSession session) {
		  mv.setViewName("orgChart/orgChart");	
		return mv;	
	}
	
	
	// 초직도차트 데이터 조회
	@ResponseBody
	@RequestMapping(value="orgChart.org", produces="application/json; charset=UTF-8")
	public JSONObject orgChart() {	
		
		ArrayList<Employee> deptList = orgChartService.selectDeptList();
		ArrayList<ArrayList<Employee>> jobList = new ArrayList<ArrayList<Employee>>();

		
		for (Employee dl : deptList) {
			ArrayList<Employee> jl = orgChartService.selectJobList(dl);
			jobList.add(jl);
		}

		JSONObject jobj = new JSONObject();
		jobj.put("deptList", deptList);
		jobj.put("jobList", jobList);
		
		return jobj; 
	}

}

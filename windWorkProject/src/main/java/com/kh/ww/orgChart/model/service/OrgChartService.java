package com.kh.ww.orgChart.model.service;

import java.util.ArrayList;

import com.kh.ww.employee.model.vo.Employee;

public interface OrgChartService {
	
	// dept리스트 불러오기
	ArrayList<Employee> selectDeptList();
	
	// job리스트 불러오기
	ArrayList<Employee> selectJobList(Employee dl);

}

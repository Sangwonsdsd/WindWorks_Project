package com.kh.ww.orgChart.model.service;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.orgChart.model.dao.OrgChartDao;

@Service
public class OrgChartServiceImpl implements OrgChartService{

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Autowired
	private OrgChartDao orgChartDao;

	
	
	@Override
	public ArrayList<Employee> selectDeptList() {
		return orgChartDao.selectDeptList(sqlSession);
	}

	@Override
	public ArrayList<Employee> selectJobList(Employee dl) {
		return orgChartDao.selectJobList(sqlSession, dl);
	}

	
	
}

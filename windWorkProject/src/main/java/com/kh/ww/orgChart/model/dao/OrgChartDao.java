package com.kh.ww.orgChart.model.dao;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.ww.employee.model.vo.Employee;

@Repository
public class OrgChartDao {

	public ArrayList<Employee> selectDeptList(SqlSessionTemplate sqlSession){
		return (ArrayList)sqlSession.selectList("employeeMapper.selectDeptList");
	}
	
	public ArrayList<Employee> selectJobList(SqlSessionTemplate sqlSession, Employee dl){
		return (ArrayList)sqlSession.selectList("employeeMapper.selectJobList", dl);
	}
	
	
	
}

package com.kh.ww.studyManagement.model.dao;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.studyManagement.model.vo.Category;
import com.kh.ww.studyManagement.model.vo.ClassAttachment;
import com.kh.ww.studyManagement.model.vo.ClassPlan;
import com.kh.ww.studyManagement.model.vo.Student;

@Repository
public class StudyManagementDao {
	//강의계획표 주 갯수
	public int planlistCount(SqlSessionTemplate sqlSession, int empNo) {

		return sqlSession.selectOne("classMapper.planlistCount", empNo);
	}
	//강의계획표 리스트
	public ArrayList<ClassPlan> planSelectList(SqlSessionTemplate sqlSession, int empNo, PageInfo pi) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("classMapper.planSelectList", empNo, rowBounds);
	}
	//강의계획표 수정버튼 리스트  Select
	public ArrayList<ClassPlan> ajaxUpdateplanList(SqlSessionTemplate sqlSession, int empNo) {
		return (ArrayList)sqlSession.selectList("classMapper.ajaxUpdateplanList", empNo);
	}
	
	//강의장 리스트 조회
	public ArrayList<ClassPlan> ajaxClassroomSelect(SqlSessionTemplate sqlSession) {
		return (ArrayList)sqlSession.selectList("classMapper.ajaxClassroomSelect");
	}
	//강의 검색
	public ClassPlan studySelect(SqlSessionTemplate sqlSession, int empNo) {
		return sqlSession.selectOne("classMapper.studySelect", empNo);
	}
	//강의자료실 리스트 카운트
	public int MaterialslistCount(SqlSessionTemplate sqlSession, String category) {
		return sqlSession.selectOne("classMapper.MaterialslistCount", category);
	}
	
	//강의자료실 리스트 검색
	public ArrayList<ClassAttachment> lectureMaterialslist(SqlSessionTemplate sqlSession, PageInfo pi, String category) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("classMapper.lectureMaterialslist", category, rowBounds);
	}
	
	//강의 계획표 수정
	public int updateplan(SqlSessionTemplate sqlSession, ClassPlan cp) {
		return sqlSession.update("classMapper.updateplan", cp);
	}
	
	//강의계획 데이터 수정
	public int updateplanContent(SqlSessionTemplate sqlSession, ClassPlan cp) {
		return sqlSession.update("classMapper.updateplanContent", cp);
	}
	//강의자료 상세페이지 선택
	public ClassAttachment selectData(SqlSessionTemplate sqlSession, int dataNo) {
		return sqlSession.selectOne("classMapper.selectData", dataNo);
	}
	//강의 상세페이지 데이터 리스트 선택
	public ArrayList<ClassAttachment> selectDataAttachmentList(SqlSessionTemplate sqlSession, int dataNo) {
		return (ArrayList)sqlSession.selectList("classMapper.selectDataAttachmentList", dataNo);
	}
	
	public ArrayList<ClassAttachment> lectureMaterialsLevellist(SqlSessionTemplate sqlSession) {
		return (ArrayList)sqlSession.selectList("classMapper.lectureMaterialsLevellist");
	}
	public int createDataroom(SqlSessionTemplate sqlSession, ClassAttachment c) {
		return sqlSession.insert("classMapper.createDataroom", c);
	}
	public int createDataAttachment(SqlSessionTemplate sqlSession, ClassAttachment c) {
		return sqlSession.insert("classMapper.createDataAttachment", c);
	}
	
	//강의자료 즐겨찾기
	public int dataLikeCount(SqlSessionTemplate sqlSession, int empNo) {
		return sqlSession.selectOne("classMapper.dataLikeCount", empNo);
	}
	public ArrayList<ClassAttachment> dataLikeSelectList(SqlSessionTemplate sqlSession, PageInfo lmpi, int empNo) {
		int offset = (lmpi.getCurrentPage() - 1) * lmpi.getBoardLimit();
		int limit = lmpi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("classMapper.dataLikeSelectList", empNo, rowBounds);
	}
	
	public int selectmaxsize(SqlSessionTemplate sqlSession) {
		return sqlSession.selectOne("classMapper.selectmaxsize");
	}
	
	//강의 자료 수정
	public int updateDataroom(SqlSessionTemplate sqlSession, ClassAttachment c) {
		return sqlSession.update("classMapper.updateDataroom", c);
	}
	
	public int updateDataAttachment(SqlSessionTemplate sqlSession, ClassAttachment c) {
		return sqlSession.update("classMapper.updateDataAttachment", c);
	}
	
	//학생 리스트 카운트
	public int ajaxSelectListCount(SqlSessionTemplate sqlSession, int empNo) {
		return  sqlSession.selectOne("classMapper.ajaxSelectListCount", empNo);
	}
	
	//학생 리스트 가져오기
	public ArrayList<Student> ajaxStudentSelectList(SqlSessionTemplate sqlSession, int empNo, PageInfo pi) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("classMapper.ajaxStudentSelectList", empNo, rowBounds);
	}
	
	public int deleteDataAttachment(SqlSessionTemplate sqlSession, String classFileNo) {
		return sqlSession.delete("classMapper.deleteDataAttachment", classFileNo);
	}
	public int createUpdateDataAttachment(SqlSessionTemplate sqlSession, ClassAttachment c) {
		return sqlSession.update("classMapper.createUpdateDataAttachment", c);
	}
	
	//강의 자료 삭제
	public int deleteDataroom(SqlSessionTemplate sqlSession, int classDataNo) {
		return sqlSession.update("classMapper.deleteDataroom", classDataNo);
	}
	
	//강의실 카테고리
	public ArrayList<Category> selectClassCategoryList(SqlSessionTemplate sqlSession) {
		return (ArrayList)sqlSession.selectList("classMapper.selectClassCategoryList");
	}
	
	//자료실 검색
	public int dataSearchLikeCount(SqlSessionTemplate sqlSession, ClassAttachment c) {
		return sqlSession.selectOne("classMapper.dataSearchLikeCount", c);
	}
	
	public ArrayList<ClassAttachment> dataSearchLikeSelectList(SqlSessionTemplate sqlSession, ClassAttachment c,
			PageInfo lmpi) {
		int offset = (lmpi.getCurrentPage() - 1) * lmpi.getBoardLimit();
		int limit = lmpi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("classMapper.dataSearchLikeSelectList", c, rowBounds);
	}
	
	public int searchMaterialslistCount(SqlSessionTemplate sqlSession, ClassAttachment c) {
		return sqlSession.selectOne("classMapper.searchMaterialslistCount", c);
	}
	
	public ArrayList<ClassAttachment> searchLectureMaterialslist(SqlSessionTemplate sqlSession, ClassAttachment c,
			PageInfo lmpi) {
		int offset = (lmpi.getCurrentPage() - 1) * lmpi.getBoardLimit();
		int limit = lmpi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("classMapper.searchLectureMaterialslist", c, rowBounds);
	}
	
	//학생 삭제
	public int deleteStudent(SqlSessionTemplate sqlSession, int studentNo) {
		return sqlSession.update("classMapper.deleteStudent", studentNo);
	}
	//학생 빠른 추가
	public int ajaxSpeedinsertStudent(SqlSessionTemplate sqlSession, Student student) {
		return sqlSession.insert("classMapper.ajaxSpeedinsertStudent", student);
	}
	//수업 찾기
	public int selectClassNo(SqlSessionTemplate sqlSession, int empNo) {
		return sqlSession.selectOne("classMapper.selectClassNo", empNo);
	}
	
	//학생 추가
	public int insertStudent(SqlSessionTemplate sqlSession, Student student) {
		return sqlSession.insert("classMapper.insertStudent", student);
	}
	
	//학생 찾기
	public Student selectStudent(SqlSessionTemplate sqlSession, int studentNo) {
		return sqlSession.selectOne("classMapper.selectStudent", studentNo);
	}
	public int updateStudent(SqlSessionTemplate sqlSession, Student student) {
		return sqlSession.update("classMapper.updateStudent", student);
	}
	public int ajaxInutialSelectCount(SqlSessionTemplate sqlSession, Student student) {
		return sqlSession.selectOne("classMapper.ajaxInutialSelectCount", student);
	}
	public ArrayList<Student> ajaxInutialSelectList(SqlSessionTemplate sqlSession, PageInfo pi, Student student) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("classMapper.ajaxInutialSelectList", student, rowBounds);
	}
	public int ajaxSelectSerachStudentCount(SqlSessionTemplate sqlSession, Student student) {
		return sqlSession.selectOne("classMapper.ajaxSelectSerachStudentCount", student);
	}
	public ArrayList<Student> ajaxSelectSerachStudent(SqlSessionTemplate sqlSession, PageInfo pi, Student student) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("classMapper.ajaxSelectSerachStudent", student, rowBounds);
	}

	//즐겨찾기 검색
	public ClassAttachment likeClassData(SqlSessionTemplate sqlSession, ClassAttachment likeC) {
		return sqlSession.selectOne("classMapper.likeClassData", likeC);
	}
	
	//즐겨찾기 추가
	public int ajaxLikeAddSelect(SqlSessionTemplate sqlSession, ClassAttachment c) {
		return sqlSession.insert("classMapper.ajaxLikeAddSelect", c);
	}
	
	//즐겨찾기 삭제
	public int ajaxLikeDeleteSelect(SqlSessionTemplate sqlSession, ClassAttachment c) {
		return sqlSession.delete("classMapper.ajaxLikeDeleteSelect", c);
	}
	public int ajaxLectureMovement(SqlSessionTemplate sqlSession, ClassAttachment c) {
		return sqlSession.update("classMapper.ajaxLectureMovement", c);
	}
}

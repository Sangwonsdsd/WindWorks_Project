package com.kh.ww.studyManagement.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.common.template.Pagenation;
import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.studyManagement.model.service.StudyManagementService;
import com.kh.ww.studyManagement.model.vo.Category;
import com.kh.ww.studyManagement.model.vo.ClassAttachment;
import com.kh.ww.studyManagement.model.vo.ClassPlan;
import com.kh.ww.studyManagement.model.vo.Student;

@Controller
public class studyManagementController {
	@Autowired
	private StudyManagementService studyManagementService;
	
	//강의계획표
	@RequestMapping(value = "list.lp")
	public ModelAndView selectplanList(ModelAndView mv, HttpSession session) {
		mv.setViewName("studyManagement/lessonPlan");
		return mv;
	}
	
	//강의계획표
	@ResponseBody
	@RequestMapping(value = "ajaxlist.lp",  produces = "appalication/json; charset = UTF-8")
	public String ajaxSelectplanList(HttpSession session, @RequestParam(value="cpage", defaultValue = "1") int currentPage) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		ClassPlan cp = studyManagementService.studySelect(empNo);
		int listCount = studyManagementService.planlistCount(empNo);
		PageInfo pi = Pagenation.getPageInfo(listCount, currentPage, 2, 2);
		ArrayList<ClassPlan> list = studyManagementService.planSelectList(empNo ,pi);
		System.out.println(cp);
		
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("list", list);
		jobj.put("cp", cp);
		return new Gson().toJson(jobj);
	}
	//강의계획표 수정 폼
	@ResponseBody
	@RequestMapping(value = "ajaxupdatePlanlist.lp",  produces = "appalication/json; charset = UTF-8")
	public String ajaxUpdateplanList(HttpSession session, @RequestParam(value="cpage", defaultValue = "1") int currentPage) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		ClassPlan cp = studyManagementService.studySelect(empNo);
		ArrayList<ClassPlan> rlist = studyManagementService.ajaxClassroomSelect();
		ArrayList<ClassPlan> list = studyManagementService.ajaxUpdateplanList(empNo);
		
		JSONObject jobj = new JSONObject();
		jobj.put("rlist", rlist);
		jobj.put("list", list);
		jobj.put("cp", cp);
		return new Gson().toJson(jobj);
	}
	
	//강의계획표 수정
	@RequestMapping(value = "update.lp")
	public ModelAndView updateplan(ModelAndView mv, HttpSession session, ClassPlan cp) {
		System.out.println(cp);
		int result1 =  studyManagementService.updateplan(cp);
		int result2 =  studyManagementService.updateplanContent(cp);
		mv.setViewName("studyManagement/lessonPlan");
		return mv;
	}
	
	//강의자료실 ajax
	@ResponseBody
	@RequestMapping(value = "ajaxlist.lm",  produces = "appalication/json; charset = UTF-8")
	public String ajaxLectureMaterialslist(HttpSession session, @RequestParam(value="cpage", defaultValue = "1") int currentPage, String category) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		int listCount = 0;
		PageInfo lmpi = new PageInfo();
		ArrayList<ClassAttachment> calist = new ArrayList();
		ArrayList<ClassAttachment> caLevellist = new ArrayList();
		if(category.equals("즐겨찾기")) {
			 listCount = studyManagementService.dataLikeCount(empNo);
			 lmpi = Pagenation.getPageInfo(listCount, currentPage, 3, 7);
			 calist = studyManagementService.dataLikeSelectList(lmpi, empNo);
		}else {
			 listCount = studyManagementService.MaterialslistCount(category);
			 lmpi = Pagenation.getPageInfo(listCount, currentPage, 3, 7);
			 calist = studyManagementService.lectureMaterialslist(lmpi, category);
		}
		caLevellist = studyManagementService.lectureMaterialsLevellist();
		JSONObject jobj = new JSONObject();
		jobj.put("lmpi", lmpi);
		jobj.put("calist", calist);
		jobj.put("caLevellist", caLevellist);
		jobj.put("category", category);
		return new Gson().toJson(jobj);
	}
	//강의자료실 detail
	@RequestMapping(value = "detailView.lm")
	public ModelAndView detailLectureMaterialView(HttpSession session, ModelAndView mv, int dataNo) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		int dataSize = studyManagementService.selectmaxsize();
		ClassAttachment c = studyManagementService.selectData(dataNo);
		ArrayList<ClassAttachment> calist = studyManagementService.selectDataAttachmentList(dataNo);
		ClassAttachment likeC = new ClassAttachment();
		likeC.setEmpNo(empNo);
		likeC.setClassDataNo(dataNo);
		ClassAttachment likeClassData = studyManagementService.likeClassData(likeC);
		mv.addObject("c",c)
			.addObject("calist", calist)
			.addObject("dataSize", dataSize)
			.addObject("likeClassData", likeClassData)
			.addObject("dataNo", dataNo)
			.setViewName("studyManagement/lectureMaterialsDetailView");
		return mv;
	}
	
	//강의자료실 검색
	@ResponseBody
	@RequestMapping(value = "ajaxLectureMaterialsSearch.lm",  produces = "appalication/json; charset = UTF-8")
	public String ajaxLectureMaterialsSearch(HttpSession session, @RequestParam(value="cpage", defaultValue = "1") int currentPage, ClassAttachment c) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		c.setEmpNo(empNo);
		int listCount = 0;
		PageInfo lmpi = new PageInfo();
		ArrayList<ClassAttachment> calist = new ArrayList();
		ArrayList<ClassAttachment> caLevellist = new ArrayList();
		if(c.getCategory().equals("즐겨찾기")) {
			 listCount = studyManagementService.dataSearchLikeCount(c);
			 lmpi = Pagenation.getPageInfo(listCount, currentPage, 3, 7);
			 calist = studyManagementService.dataSearchLikeSelectList(lmpi, c);
		}else {
			 listCount = studyManagementService.searchMaterialslistCount(c);
			 lmpi = Pagenation.getPageInfo(listCount, currentPage, 3, 7);
			 calist = studyManagementService.searchLectureMaterialslist(lmpi, c);
		}
		caLevellist = studyManagementService.lectureMaterialsLevellist();
		JSONObject jobj = new JSONObject();
		jobj.put("lmpi", lmpi);
		jobj.put("calist", calist);
		jobj.put("caLevellist", caLevellist);
		jobj.put("category", c.getCategory());
		return new Gson().toJson(jobj);
	}
	
	//강의자료실 즐겨찾기
	@ResponseBody
	@RequestMapping(value = "ajaxLikeAddSelect,lm",  produces = "appalication/json; charset = UTF-8")
	public String ajaxLikeAddSelect(ClassAttachment c) {
		System.out.println(c);
		int result = studyManagementService.ajaxLikeAddSelect(c);
		ClassAttachment like = studyManagementService.likeClassData(c);
		JSONObject jobj = new JSONObject();
		jobj.put("c", c);
		return new Gson().toJson(jobj);
	}
	
	//강의자료실 즐겨찾기 삭제
	@ResponseBody
	@RequestMapping(value = "ajaxLikeDeleteSelect.lm",  produces = "appalication/json; charset = UTF-8")
	public String ajaxLikeDeleteSelect(ClassAttachment c) {
		System.out.println(c);
		int result = studyManagementService.ajaxLikeDeleteSelect(c);
		ClassAttachment like = studyManagementService.likeClassData(c);
		JSONObject jobj = new JSONObject();
		jobj.put("c", c);
		return new Gson().toJson(jobj);
	}
	//강의자료실 작성하기 폼
	@RequestMapping(value = "createForm.lm")
	public ModelAndView createDataView(ModelAndView mv, int empNo) {
		mv.addObject("empNo",empNo);
		mv.setViewName("studyManagement/createLectureMaterials");	
		return mv;
	}
	
	//강의 작성
	@RequestMapping(value = "create.lm")
	public ModelAndView createDataroom(ModelAndView mv, HttpSession session, ClassAttachment c, MultipartHttpServletRequest file) {
		List<MultipartFile> fileList = file.getFiles("files");
		int result1 = studyManagementService.createDataroom(c);
		int result2 = 0;
		int i = 1;
		for(MultipartFile f : fileList) {
			if(!f.getOriginalFilename().equals("") && i == 1) {
				String changeName = getSaveFileInfo(f, session, "resources/uploadFiles/classRoomData/");
				c.setClassOriginName(f.getOriginalFilename());
				c.setClassChangeName(changeName);
				c.setClassFileSize(f.getSize()/1024);
				c.setClassFilePath("resources/uploadFiles/employee/"+ changeName);
				c.setClassFileLevel(i);
				result2 = studyManagementService.createDataAttachment(c);
				i = 0;
			}else if(!f.getOriginalFilename().equals("") && i == 0){
				String changeName = getSaveFileInfo(f, session, "resources/uploadFiles/classRoomData/");
				c.setClassOriginName(f.getOriginalFilename());
				c.setClassChangeName(changeName);
				c.setClassFileSize(f.getSize());
				c.setClassFilePath("resources/uploadFiles/employee/"+ changeName);
				c.setClassFileLevel(i);
				result2 = studyManagementService.createDataAttachment(c);
			}
		}
		if((result1 * result2) == 1) {
			mv.setViewName("studyManagement/createLectureMaterials");	
		}
		return mv;
	}
	
	//강의 수정 페이지 이동
	@RequestMapping(value = "updateFormView.lm")
	public ModelAndView updateDataroomView(ModelAndView mv, int classDataNo) {
		ClassAttachment c = studyManagementService.selectData(classDataNo);
		ArrayList<ClassAttachment> calist = studyManagementService.selectDataAttachmentList(classDataNo);
		mv.addObject("c",c)
		.addObject("calist", calist)
		.setViewName("studyManagement/updateLectureMaterials");
		return mv;
	}
	
	
	//강의작성
	@ResponseBody
	@RequestMapping(value = "fileUpload.lm")
	public String ajaxFileUpLoad(MultipartHttpServletRequest files,  ClassAttachment c, HttpSession session) {
		List<MultipartFile> fileList = files.getFiles("fileList");
		int result1 = studyManagementService.createDataroom(c);
		int result2 = 0;
		int i = 1;
		for(MultipartFile f : fileList) {
			if(!f.getOriginalFilename().equals("") && i == 1) {
				String changeName = getSaveFileInfo(f, session, "resources/uploadFiles/classRoomData/");
				c.setClassOriginName(f.getOriginalFilename());
				c.setClassChangeName(changeName);
				c.setClassFileSize(f.getSize()/1024);
				c.setClassFilePath("resources/uploadFiles/employee/"+ changeName);
				c.setClassFileLevel(i);
				result2 = studyManagementService.createDataAttachment(c);
				i = 0;
			}else if(!f.getOriginalFilename().equals("") && i == 0){
				String changeName = getSaveFileInfo(f, session, "resources/uploadFiles/classRoomData/");
				c.setClassOriginName(f.getOriginalFilename());
				c.setClassChangeName(changeName);
				c.setClassFileSize(f.getSize());
				c.setClassFilePath("resources/uploadFiles/employee/"+ changeName);
				c.setClassFileLevel(i);
				result2 = studyManagementService.createDataAttachment(c);
			}
		}
		JSONObject jobj = new JSONObject();
		jobj.put("c", c);
		return new Gson().toJson(jobj);
	}
	
	
	//강의 수정
	@ResponseBody
	@RequestMapping(value = "update.lm")
	public String updateDataroom(ClassAttachment c, String[] filePath, String[] fileNo, HttpSession session, MultipartHttpServletRequest reupfiles) {
		List<MultipartFile> fileList = reupfiles.getFiles("fileList");
		int result1 = studyManagementService.updateDataroom(c);
		int result2 = 0;
		int i = 1;

		if(fileList.size() > 0) {
			if(filePath.length > 0) {
				for(String s : filePath) {
					new File(session.getServletContext().getRealPath(s)).delete();
					System.out.println("사진삭제성공");
				}
				
				for(String fn : fileNo) {
					int num = studyManagementService.deleteDataAttachment(fn);
					System.out.println("DB삭제성공");
				}
			}
			
			for(MultipartFile f : fileList) {
				if(!f.getOriginalFilename().equals("") && i == 1) {
					String changeName = getSaveFileInfo(f, session, "resources/uploadFiles/classRoomData/");

					c.setClassOriginName(f.getOriginalFilename());
					c.setClassChangeName(changeName);
					c.setClassFileSize(f.getSize()/1024);
					c.setClassFilePath("resources/uploadFiles/employee/"+ changeName);
					c.setClassFileLevel(i);
					result2 = studyManagementService.createUpdateDataAttachment(c);
					if(result2 > 0) {
						System.out.println("수정성공");
					}
					i = 0;
				}else if(!f.getOriginalFilename().equals("") && i == 0){
					String changeName = getSaveFileInfo(f, session, "resources/uploadFiles/classRoomData/");
					
					c.setClassOriginName(f.getOriginalFilename());
					c.setClassChangeName(changeName);
					c.setClassFileSize(f.getSize());
					c.setClassFilePath("resources/uploadFiles/employee/"+ changeName);
					c.setClassFileLevel(i);
					result2 = studyManagementService.createUpdateDataAttachment(c);
					if(result2 > 0) {
						System.out.println("수정성공");
					}
				}
			}
		}
		
		JSONObject jobj = new JSONObject();
		jobj.put("c", c);
		return new Gson().toJson(jobj);
	}
	
	//강의자료 페이지 삭제
	@RequestMapping(value = "delete.lm")
	public String deleteDataroom(HttpSession session, int classDataNo) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		int result1 = studyManagementService.deleteDataroom(classDataNo);
		ArrayList<ClassAttachment> calist = studyManagementService.selectDataAttachmentList(classDataNo);
		
		if(calist.size() > 0) {
			for(ClassAttachment c : calist) {
				new File(session.getServletContext().getRealPath(c.getClassFilePath())).delete();
				int num = studyManagementService.deleteDataAttachment(Integer.toString(c.getClassFileNo()));
			}
		}
		ClassAttachment c = new ClassAttachment();
		c.setEmpNo(empNo);
		c.setClassDataNo(classDataNo);
		int result2 = studyManagementService.ajaxLikeDeleteSelect(c);
		return "studyManagement/lessonPlan";
	}
	
	//학생 관리 폼
	@ResponseBody
	@RequestMapping(value = "ajaxSelectList.stm",  produces = "appalication/json; charset = UTF-8")
	public String ajaxStudentSelectList( HttpSession session,  @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "10") int boardLimit) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		System.out.println(boardLimit);
		int listCount = studyManagementService.ajaxSelectListCount(empNo);
		PageInfo pi = Pagenation.getPageInfo(listCount, currentPage, 3, boardLimit);
		ArrayList<Category> classroomList = studyManagementService.selectClassCategoryList();
		ArrayList<Student> studentList = studyManagementService.ajaxStudentSelectList(pi, empNo);
		int classNo = 0;
		for(Student s : studentList) {
			classNo = s.getClassNo();
		}
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("classroomList", classroomList);
		jobj.put("listCount", listCount);
		jobj.put("boardLimit", boardLimit);
		jobj.put("studentList", studentList);
		jobj.put("classNo", classNo);
		return new Gson().toJson(jobj);
	}

	//학생 삭제 폼
	@ResponseBody
	@RequestMapping(value = "deleted.stm",  produces = "appalication/json; charset = UTF-8")
	public String ajaxStudentDeleteList(HttpSession session,  @RequestParam(value="studentNoList[]") List<Integer> studentNoList, @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "10") int boardLimit) {
		int classNo= 0;
		for(int sno : studentNoList) {
			int result = studyManagementService.deleteStudent(sno);
			if(result < 1) {
				System.out.println("학생 삭제 실패");
			}
		}
		
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		int listCount = studyManagementService.ajaxSelectListCount(empNo);
		PageInfo pi = Pagenation.getPageInfo(listCount, currentPage, 3, boardLimit);
		ArrayList<Category> classroomList = studyManagementService.selectClassCategoryList();
		ArrayList<Student> studentList = studyManagementService.ajaxStudentSelectList(pi, empNo);
		
		for(Student s : studentList) {
			classNo = s.getClassNo();
		}
		
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("classroomList", classroomList);
		jobj.put("listCount", listCount);
		jobj.put("studentList", studentList);
		jobj.put("classNo", classNo);
		return new Gson().toJson(jobj);
	}
	
	//학생빠른추가
	@ResponseBody	
	@RequestMapping(value = "ajaxaddSelectList.stm",  produces = "appalication/json; charset = UTF-8")
	public String ajaxSpeedinsertStudent(HttpSession session, Student student,
										@RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "10") int boardLimit) {
		System.out.println(student);
		int result = studyManagementService.ajaxSpeedinsertStudent(student);
		
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		int listCount = studyManagementService.ajaxSelectListCount(empNo);
		PageInfo pi = Pagenation.getPageInfo(listCount, currentPage, 3, boardLimit);
		ArrayList<Category> classroomList = studyManagementService.selectClassCategoryList();
		ArrayList<Student> studentList = studyManagementService.ajaxStudentSelectList(pi, empNo);
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("classroomList", classroomList);
		jobj.put("listCount", listCount);
		jobj.put("studentList", studentList);
		jobj.put("classNo", student.getClassNo());

		return new Gson().toJson(jobj);
	}
	
	//학생 추가 폼
	@RequestMapping(value = "insertFormView.stm")
	public ModelAndView insertStudentForm(ModelAndView mv, HttpSession session) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		ArrayList<Category> classroomList = studyManagementService.selectClassCategoryList();
		int  classNo = studyManagementService.selectClassNo(empNo);
		
		mv.addObject("classNo",classNo)
		  .addObject("classroomList", classroomList)
		  .setViewName("studyManagement/studentInsertForm");
		return mv;
	}
	
	//학생 추가
	@RequestMapping(value = "insert.stm")
	public String insertStudent(Student student, MultipartFile studentfile, HttpSession session) {
		System.out.println(student);
		if(!studentfile.getOriginalFilename().equals("")) {
			String changeName = getSaveFileInfo(studentfile, session, "resources/uploadFiles/student/");
			student.setStudentProfilePath("resources/uploadFiles/student/"+ changeName);
		}
		int result = studyManagementService.insertStudent(student);
		
		return "studyManagement/lessonPlan";
	}
	
	//학생 상세 정보 추가 후 수정
	@RequestMapping(value = "detailAddStudent.stm")
	public ModelAndView insertDetailStudent(ModelAndView mv, Student student) {
		mv.addObject("student",student)
		.setViewName("studyManagement/studentDetailForm");
		return mv;
	}
	
	//학생 수정 폼
	@RequestMapping(value = "updateStudentForm.stm")
	public ModelAndView updateStudentForm(ModelAndView mv, int studentNo) {
		Student student = studyManagementService.selectStudent(studentNo);
		ArrayList<Category> classroomList = studyManagementService.selectClassCategoryList();
		mv.addObject("student",student)
		.addObject("classroomList",classroomList)
		.setViewName("studyManagement/studentUpdateForm");
		return mv;
	}
	
	//학생 정보 수정
	@RequestMapping(value = "update.stm")
	public String updateStudent(Student student, MultipartFile studentfile, HttpSession session) {
		
		if(!studentfile.getOriginalFilename().equals("")) {
			String changeName = getSaveFileInfo(studentfile, session, "resources/uploadFiles/student/");
			student.setStudentProfilePath("resources/uploadFiles/student/"+ changeName);
		}
		int result = studyManagementService.updateStudent(student);
		
	
		return "studyManagement/lessonPlan";
	}
		
	//학생초성 검색
	@ResponseBody
	@RequestMapping(value = "ajaxInutialSelectList.stm",  produces = "appalication/json; charset = UTF-8")
	public String ajaxInutialSelectList( HttpSession session,  Student student, @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "10") int boardLimit) {
		int listCount = studyManagementService.ajaxInutialSelectCount(student);
		System.out.println(student);
		PageInfo pi = new PageInfo();
		ArrayList<Category> classroomList = new ArrayList();
		ArrayList<Student> studentList = new ArrayList();
		if(listCount > 0) {
			pi = Pagenation.getPageInfo(listCount, currentPage, 3, boardLimit);
			classroomList = studyManagementService.selectClassCategoryList();
			studentList = studyManagementService.ajaxInutialSelectList(pi, student);
		}else {
			
			System.out.println("초성없습니다.");
		}
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("classroomList", classroomList);
		jobj.put("listCount", listCount);
		jobj.put("boardLimit", boardLimit);
		jobj.put("studentList", studentList);
		jobj.put("classNo", student.getClassNo());
		return new Gson().toJson(jobj);
	}
	
	//학생검색어로 검색
	@ResponseBody
	@RequestMapping(value = "ajaxSelectSerachStudent.stm",  produces = "appalication/json; charset = UTF-8")
	public String ajaxSelectSerachStudent( HttpSession session,  Student student, 
												@RequestParam(value="cpage", defaultValue = "1") int currentPage, 
												@RequestParam(value="boardLimit", defaultValue = "10") int boardLimit) {
		System.out.println(student);
		int listCount = studyManagementService.ajaxSelectSerachStudentCount(student);
		PageInfo pi = Pagenation.getPageInfo(listCount, currentPage, 3, boardLimit);
		ArrayList<Category> classroomList = studyManagementService.selectClassCategoryList();
		ArrayList<Student> studentList = studyManagementService.ajaxSelectSerachStudent(pi, student);
		
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("classroomList", classroomList);
		jobj.put("listCount", listCount);
		jobj.put("boardLimit", boardLimit);
		jobj.put("studentList", studentList);
		jobj.put("classNo", student.getClassNo());
		return new Gson().toJson(jobj);
	}
	
	// 강의자료실 자료 이동
	@ResponseBody
	@RequestMapping(value="ajaxLectureMovement.lm")
	public String ajaxLectureMovement(ClassAttachment c) {
		return studyManagementService.ajaxLectureMovement(c) > 0 ? "success" : "fail";
	}
	
	
	public String getSaveFileInfo(MultipartFile upfile, HttpSession session, String path) {
	      // 파일명 수정 후 서버 업로드 시키기("이미지저장용 (2).jpg" => 20231109102712345.jpg)
	      // 년월일시분초 + 랜덤숫자 5개 + 확장자

	      // 원래 파일명
	      String originName = upfile.getOriginalFilename();

	      // 시간정보 (년월일시분초)
	      String currentTime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

	      // 랜덤숫자 5자리
	      int ranNum = (int) (Math.random() * 90000) + 10000;

	      // 확장자
	      String ext = originName.substring(originName.lastIndexOf("."));

	      // 변경된이름
	      String changeName = currentTime + ranNum + ext;

	      // 첨부파일 저장할 폴더의 물리적인 경우
	      String savePath = session.getServletContext().getRealPath(path);
	      try {
			upfile.transferTo(new File(savePath + changeName));
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	      return changeName;
	}
	
}

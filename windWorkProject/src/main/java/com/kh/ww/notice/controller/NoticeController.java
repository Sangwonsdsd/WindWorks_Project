package com.kh.ww.notice.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.common.template.Pagenation;
import com.kh.ww.common.template.SaveFile;
import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.notice.model.service.NoticeService;
import com.kh.ww.notice.model.vo.Notice;
import com.kh.ww.notice.model.vo.NoticeAttachment;
import com.kh.ww.notice.model.vo.NoticeReply;
import com.kh.ww.studyManagement.model.vo.ClassAttachment;

@Controller
public class NoticeController {

	@Autowired
	private NoticeService noticeService;
	
	// 공지사항 총 갯수, 공지사항 리스트 조회
	@RequestMapping("list.no")
	public ModelAndView selectList(@RequestParam(value="cpage", defaultValue="1") int currentPage, ModelAndView mv) {
		
		PageInfo pi = Pagenation.getPageInfo(noticeService.selectListCount(), currentPage, 5, 10);
		
		mv.addObject("pi", pi)
		  .addObject("list", noticeService.selectList(pi))
		  .setViewName("notice/noticeListView");
		
		return mv;
	}
	
	// 공지사항 상세 조회
	@RequestMapping("detail.no")
	public String selectNotice(int nno, Model model) {

		int result = noticeService.increaseCount(nno);

		if (result > 0) {
			Notice n = noticeService.selectNotice(nno);
			ArrayList<NoticeAttachment> naList = noticeService.selectNoticeAtt(nno);
			
			model.addAttribute("n", n);
			model.addAttribute("naList", naList);
			
			return "notice/noticeDetailView";
		} else {
			model.addAttribute("errorMsg", "게시글 조회 실패");
			return "common/noticeListView";
		}
	}
	
	// 공지사항 작성 이동
	@RequestMapping("enrollForm.no")
	public String enrollForm() {
		return "notice/noticeEnrollForm";
	}
	
	// 공지사항 작성
	@RequestMapping("insert.no")
	public String insertNotice(Notice n, NoticeAttachment na, MultipartHttpServletRequest file, HttpSession session) {

		// 게시글 등록
		int result1 = noticeService.insertNotice(n);
		int result2 = 0;
		int i = 1;	
		List<MultipartFile> fileList = file.getFiles("upfile");
		// 파일 등록
		for (MultipartFile f : fileList) {
			if (!f.getOriginalFilename().equals("") && i == 1) { 
				String changeName = SaveFile.getSaveFileInfo(f, session, "resources/uploadFiles/notice/");
				na.setNoticeOriginName(f.getOriginalFilename());
				na.setNoticeChangeName(changeName);
				na.setNoticeFilePath("resources/uploadFiles/notice/"+ changeName);
				na.setNoticeFileLevel(i);
				result2 = noticeService.insertNoticeAttachment(na);
				i = 0;
			} else if (!f.getOriginalFilename().equals("") && i == 0) {
				String changeName = SaveFile.getSaveFileInfo(f, session, "resources/uploadFiles/notice/");
				na.setNoticeOriginName(f.getOriginalFilename());
				na.setNoticeChangeName(changeName);
				na.setNoticeFilePath("resources/uploadFiles/notice/"+ changeName);
				na.setNoticeFileLevel(i);
				result2 = noticeService.insertNoticeAttachment(na);
			}
		}
		if((result1 * result2) == 1) {
			
			return "redirect:list.no";
		} else {
			return "notice/noticeListView";
		}
		
	}
	
	// 공지사항 수정 이동
	@RequestMapping("updateForm.no")
	public ModelAndView updateForm(int nno, ModelAndView mv) {
		// 현재 내가 수정하기를 클릭한 게시글에 대한 정보를 가지고 이동
		/*
		 * model.addAttribute("n", noticeService.selectNotice(nno));
		 * ArrayList<NoticeAttachment> naList = noticeService.selectNoticeAtt(nno);
		 * 
		 * return "notice/noticeUpdateForm";
		 */
		
		Notice n = noticeService.selectNotice(nno);
		ArrayList<NoticeAttachment> naList = noticeService.selectNoticeAtt(nno);
		mv.addObject("n", n)
		  .addObject("naList", naList)
		  .setViewName("notice/noticeUpdateForm");
		return mv;
	}
	
	// 공지사항 수정
	@RequestMapping("update.no")
	public String updateNotice(Notice n, NoticeAttachment na, String[] filePath, int[] fileNo, MultipartHttpServletRequest file, HttpSession session) {
		
		// 게시글 수정
		int result1 = noticeService.updateNotice(n);
		int result2 = 0;
		int i = 1;	
		List<MultipartFile> fileList = file.getFiles("reupfiles");
		// 새로운 첨부파일 있을 경우 기존 파일 삭제
		if(fileList.size() > 0) {
			if(filePath != null) {
				for(String s : filePath) {
					new File(session.getServletContext().getRealPath(s)).delete();
				}
				for(int fn : fileNo) {
					int num = noticeService.deleteNoticeAtt(fn);
				}
			}
		}
		// 새로운 파일 등록
		for (MultipartFile f : fileList) {
			if(!f.getOriginalFilename().equals("") && i == 1) {
				String changeName = SaveFile.getSaveFileInfo(f, session, "resources/uploadFiles/notice/");
				na.setNoticeOriginName(f.getOriginalFilename());
				na.setNoticeChangeName(changeName);
				na.setNoticeFilePath("resources/uploadFiles/notice/"+ changeName);
				na.setNoticeFileLevel(i);
				result2 = noticeService.updateNoticeAtt(na);
				i = 0;
			}else if(!f.getOriginalFilename().equals("") && i == 0){
				String changeName = SaveFile.getSaveFileInfo(f, session, "resources/uploadFiles/notice/");
				na.setNoticeOriginName(f.getOriginalFilename());
				na.setNoticeChangeName(changeName);
				na.setNoticeFilePath("resources/uploadFiles/notice/"+ changeName);
				na.setNoticeFileLevel(i);
				result2 = noticeService.updateNoticeAtt(na);
			}
		}
		System.out.println("333");
		
		if((result1 * result2) == 1) {
			return "redirect:list.no";
		} else {
			return "redirect:list.no";
		}
	}
	
	// 공지사항 삭제
	@RequestMapping("delete.no")
	public String deleteNotice(int nno, String filePath, HttpSession session, Model model) {
		
		int result = noticeService.deleteNotice(nno);
		
		if (result > 0) {
			if (!filePath.equals("")) {
				new File(session.getServletContext().getRealPath(filePath)).delete();
			}
			session.setAttribute("alertMsg", "게시글이 삭제되었습니다.");
			return "redirect:list.no";
		} else {
			model.addAttribute("errorMsg", "게시글 삭제 실패");
			return "common/noticeListView";
		}
		
	}
	
	// 공지사항 댓글 리스트 조회
	@ResponseBody
	@RequestMapping(value = "rlist.no", produces = "application/json; charset=UTF-8")
	public String ajaxSelectReplyList(int nno, HttpSession session) {
	    ArrayList<NoticeReply> list = noticeService.selectReply(nno);

	    Employee loginUser = (Employee)session.getAttribute("loginUser");

	    if (loginUser != null) {
	        Gson gson = new Gson();
	        JsonObject jsonObject = new JsonObject();
	        jsonObject.addProperty("loginUserName", loginUser.getEmpName());
	        jsonObject.addProperty("loginUser", loginUser.getEmpNo());
	       
	        
	        JsonArray replyList = new JsonArray();

	        for (NoticeReply reply : list) {
	        	if (reply.getParentReplyNo() != 0)
	        		continue;
	        		
	            JsonObject newReply = new JsonObject();
	            newReply.addProperty("noticeReplyNo", reply.getNoticeReplyNo());
	            newReply.addProperty("noticeReplyContent", reply.getNoticeReplyContent());
	            newReply.addProperty("noticeReplyCreateDate", reply.getNoticeReplyCreateDate());
	            newReply.addProperty("noticeReplyStatus", reply.getNoticeReplyStatus());
	            newReply.addProperty("empNo", reply.getEmpNo());
	            newReply.addProperty("empName", reply.getEmpName());
	            newReply.addProperty("noticeNo", reply.getNoticeNo());
	            newReply.addProperty("parentReplyNo", reply.getParentReplyNo());
	    
	            JsonArray childList = new JsonArray();
	    
	            for (NoticeReply childReply : list) {
	                if (reply.getNoticeReplyNo() == childReply.getParentReplyNo()) {
	                    JsonObject childReplyJson = new JsonObject();
	                    childReplyJson.addProperty("noticeReplyNo", childReply.getNoticeReplyNo());
	                    childReplyJson.addProperty("noticeReplyContent", childReply.getNoticeReplyContent());
	                    childReplyJson.addProperty("noticeReplyCreateDate", childReply.getNoticeReplyCreateDate());
	                    childReplyJson.addProperty("noticeReplyStatus", childReply.getNoticeReplyStatus());
	                    childReplyJson.addProperty("empNo", childReply.getEmpNo());
	                    childReplyJson.addProperty("empName", childReply.getEmpName());
	                    childReplyJson.addProperty("noticeNo", childReply.getNoticeNo());
	                    childReplyJson.addProperty("parentReplyNo", childReply.getParentReplyNo());
	            
	                    childList.add(childReplyJson);
	                }
	            }
	    
	            newReply.add("childReply", childList);
	            replyList.add(newReply);
	        }
	        
	        jsonObject.add("list", replyList);

	        return gson.toJson(jsonObject);
	    } else {
	        return "{}";
	    }
	}

	// 공지사항 댓글 작성
	@ResponseBody
	@RequestMapping(value="rinsert.no")
	public String ajaxInsertReply(NoticeReply nr) {
		int result = noticeService.insertReply(nr);
		
		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 공지사항 댓글 수정
	@ResponseBody
	@RequestMapping(value="rupdate.no")
	public String ajaxUpdateReply(NoticeReply nr) {
		int result = noticeService.updateReply(nr);

		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 공지사항 댓글 삭제
	@ResponseBody
	@RequestMapping(value="rdelete.no")
	public String ajaxDeleteReply(NoticeReply nr) {
		int result = noticeService.deleteReply(nr);

		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 공지사항 대댓글 작성
	@ResponseBody
	@RequestMapping(value="crinsert.no")
	public String ajaxInsertChildeReply(NoticeReply nr) {
		int result = noticeService.insertChildeReply(nr);
		
		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	
	// 공지사항 대댓글 수정
	@ResponseBody
	@RequestMapping(value="crupdate.no")
	public String ajaxUpdateChildReply(NoticeReply nr) {
		int result = noticeService.updateChildReply(nr);
		System.out.println(nr);
		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 공지사항 대댓글 삭제
	@ResponseBody
	@RequestMapping(value="crdelete.no")
	public String ajaxDeleteChildReply(NoticeReply nr) {
		int result = noticeService.deleteChildReply(nr);

		if (result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
}

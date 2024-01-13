package com.kh.ww.mail.controller;


import java.util.List;
import java.util.UUID;

import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
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
import com.kh.ww.mail.model.service.EmailService;
import com.kh.ww.mail.model.vo.Email;
import com.kh.ww.mail.model.vo.EmailAttachment;

import lombok.Setter;

@Controller
public class mailController {
	
	@Autowired
	private JavaMailSender sender;
	
	@Autowired
	private EmailService emailService;
	
	//받은메일함이동
	@RequestMapping("/list.mail")
	public ModelAndView mailListView(HttpSession session, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit, @RequestParam(value="cpage", defaultValue = "1") int currentPage, ModelAndView mv) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		ArrayList<Employee> empList = emailService.emailEmpList(empNo);
		Email mail = new Email();
		mail.setEmpNo(empNo);
		int mailListCount = emailService.mailListCount(empNo);
		int readListCount = emailService.mailreadListCount(empNo);
		PageInfo pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
		ArrayList<Email> emailList = emailService.mailgetSelectList(pi, empNo);
		mv.addObject("mailListCount", mailListCount)
			.addObject("pi", pi)
			.addObject("empList", empList)
			.addObject("emailList", emailList)
			.addObject("readListCount", readListCount)
			.setViewName("mail/mailList");
		return mv;
	}
	

	
	//보낸 메일함 이동
	@RequestMapping("/sendList.mail")
	public ModelAndView sendMailListView(HttpSession session, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit, @RequestParam(value="cpage", defaultValue = "1") int currentPage, ModelAndView mv) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		Email mail = new Email();
		mail.setEmpNo(empNo);
		ArrayList<Employee> empList = emailService.emailEmpList(empNo);
		int mailListCount = emailService.sendMailListCount(empNo);
		int readListCount = emailService.mailreadListCount(empNo);
		PageInfo pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
		ArrayList<Email> emailList = emailService.mailSendSelectList(pi, empNo);
		mv.addObject("mailListCount", mailListCount)
			.addObject("pi", pi)
			.addObject("empList", empList)
			.addObject("emailList", emailList)
			.addObject("readListCount", readListCount)
			.setViewName("mail/mailSendList");
		return mv;
	}
	
	//받은 보낸 메일함
	@ResponseBody
	@RequestMapping(value = "/ajaxMaillist.mail",  produces = "appalication/json; charset = UTF-8")
	public String deleteMail(HttpSession session, @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit, int num) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		Email mail = new Email();
		mail.setEmpNo(empNo);
		int mailListCount = 0;
		int readListCount = 0;
		PageInfo pi = new PageInfo();
		ArrayList<Email> emailList = new ArrayList<Email>();
		if(num == 1) {
			mailListCount = emailService.sendMailListCount(empNo);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailSendSelectList(pi, empNo);
		}else {
			mailListCount = emailService.mailListCount(empNo);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailgetSelectList(pi, empNo);
		}	
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("mailListCount", mailListCount);
		jobj.put("readListCount", readListCount);
		jobj.put("emailList", emailList);
	    return new Gson().toJson(jobj);
	}
	
	//휴지통 이동
	@RequestMapping("/sendDeleteList.mail")
	public ModelAndView sendDeleteMailListView(HttpSession session, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit, @RequestParam(value="cpage", defaultValue = "1") int currentPage, ModelAndView mv) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		Email mail = new Email();
		ArrayList<Employee> empList = emailService.emailEmpList(empNo);
		mail.setEmpNo(empNo);
		int mailListCount = emailService.sendDeleteMailListCount(empNo);
		int readListCount = emailService.mailreadListCount(empNo);
		PageInfo pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
		ArrayList<Email> emailList = emailService.mailSendDeleteSelectList(pi, empNo);
		mv.addObject("mailListCount", mailListCount)
			.addObject("pi", pi)
			.addObject("empList", empList)
			.addObject("emailList", emailList)
			.addObject("readListCount", readListCount)
			.setViewName("mail/mailDeleteList");
		return mv;
	}
	
	//휴지통 메일 ajax 폼
	@ResponseBody
	@RequestMapping(value = "/ajaxDeleteMailList.mail",  produces = "appalication/json; charset = UTF-8")
	public String ajaxDeleteMailList(HttpSession session, @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		
		Email mail = new Email();
		mail.setEmpNo(empNo);
		int mailListCount = emailService.sendDeleteMailListCount(empNo);
		int readListCount = emailService.mailreadListCount(empNo);
		PageInfo pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
		ArrayList<Email> emailList = emailService.mailSendDeleteSelectList(pi, empNo);
		
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("mailListCount", mailListCount);
		jobj.put("readListCount", readListCount);
		jobj.put("emailList", emailList);
	    return new Gson().toJson(jobj);
	}
	
	
	//메일작성폼이동
	@RequestMapping("/send.mail")
	public String sendMailView() {
		return "mail/sendMailForm";
	}
	
	@RequestMapping("/replyMailForm.mail")
	public ModelAndView sendMailView(HttpSession session, Email mail, ModelAndView mv) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		Email email = emailService.mailSelect(mail);
		int upDateEmail = emailService.upDateEmail(mail);
		ArrayList<String> strToStrArray = new ArrayList<String>();
		int readListCount = emailService.mailreadListCount(empNo);
		ArrayList <Email> emailReferenceList = emailService.emailReferenceList(email.getEmailFileList());
		ArrayList<EmailAttachment> emailAttachment = new ArrayList<EmailAttachment>();
		for(Email e : emailReferenceList) {
			System.out.println(e);
		}
		System.out.println();
		if(email.getEmailFileList() != null) {
			 // 문자열에 ','가 있는지 여부 확인
	        if (email.getEmailFileList().contains(",")) {
	            // ','를 기준으로 문자열 분할
	            String[] splitArray = email.getEmailFileList().split(",");

	            // 배열을 ArrayList로 변환하여 추가
	            strToStrArray.addAll(Arrays.asList(splitArray));
	        } else {
	            // ','가 없으면 그냥 문자열 추가
	        	strToStrArray.add(email.getEmailFileList());
	        }

			emailAttachment = emailService.getEmailFileList(strToStrArray);
		}
       

		mv.addObject("email", email)
		.addObject("emailAttachment", emailAttachment)
		.addObject("readListCount", readListCount)
		.addObject("emailReferenceList", emailReferenceList)
		.setViewName("mail/replyMailForm");
		
		
		return mv;
	}
	
	//메일디테일뷰이동
	@RequestMapping("/detail.mail")
	public ModelAndView mailDetailView(HttpSession session, Email mail, ModelAndView mv) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		Email email = emailService.mailSelect(mail);
		int upDateEmail = emailService.upDateEmail(mail);
		ArrayList<String> strToStrArray = new ArrayList<String>();
		int readListCount = emailService.mailreadListCount(empNo);
		ArrayList <Email> emailReferenceList = emailService.emailReferenceList(email.getEmailFileList());
		ArrayList<EmailAttachment> emailAttachment = new ArrayList<EmailAttachment>();
		for(Email e : emailReferenceList) {
			System.out.println(e);
		}
		System.out.println();
		if(email.getEmailFileList() != null) {
			 // 문자열에 ','가 있는지 여부 확인
	        if (email.getEmailFileList().contains(",")) {
	            // ','를 기준으로 문자열 분할
	            String[] splitArray = email.getEmailFileList().split(",");

	            // 배열을 ArrayList로 변환하여 추가
	            strToStrArray.addAll(Arrays.asList(splitArray));
	        } else {
	            // ','가 없으면 그냥 문자열 추가
	        	strToStrArray.add(email.getEmailFileList());
	        }

			emailAttachment = emailService.getEmailFileList(strToStrArray);
		}
       

		mv.addObject("email", email)
		.addObject("emailAttachment", emailAttachment)
		.addObject("readListCount", readListCount)
		.addObject("emailReferenceList", emailReferenceList)
		.setViewName("mail/mailDetailform");
		return mv;
	}
	
	//메일디테일뷰이동
	@RequestMapping("/sendDetail.mail")
	public ModelAndView sendMailDetailView(HttpSession session, Email mail, ModelAndView mv) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		ArrayList<Employee> empList = emailService.emailEmpList(empNo);
		Email email = emailService.mailSelect(mail);
		int upDateEmail = emailService.upDateEmail(mail);
		ArrayList<String> strToStrArray = new ArrayList<String>();
		int readListCount = emailService.mailreadListCount(empNo);
		ArrayList <Email> emailReferenceList = emailService.emailReferenceList(email.getEmailFileList());
		ArrayList<EmailAttachment> emailAttachment = new ArrayList<EmailAttachment>();
		for(Email e : emailReferenceList) {
			System.out.println(e);
		}
		System.out.println();
		if(email.getEmailFileList() != null) {
			 // 문자열에 ','가 있는지 여부 확인
	        if (email.getEmailFileList().contains(",")) {
	            // ','를 기준으로 문자열 분할
	            String[] splitArray = email.getEmailFileList().split(",");

	            // 배열을 ArrayList로 변환하여 추가
	            strToStrArray.addAll(Arrays.asList(splitArray));
	        } else {
	            // ','가 없으면 그냥 문자열 추가
	        	strToStrArray.add(email.getEmailFileList());
	        }

			emailAttachment = emailService.getEmailFileList(strToStrArray);
		}
       

		mv.addObject("email", email)
		.addObject("emailAttachment", emailAttachment)
		.addObject("readListCount", readListCount)
		.addObject("emailReferenceList", emailReferenceList)
		.addObject("empList", empList)
		.setViewName("mail/sendMailDetailform");
		return mv;
	}
	
	//메일디테일뷰이동
	@RequestMapping("/deleteMailDetailform.mail")
	public ModelAndView deleteMailDetailform(HttpSession session, Email mail, ModelAndView mv) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		ArrayList<Employee> empList = emailService.emailEmpList(empNo);
		Email email = emailService.mailSelect(mail);
		int upDateEmail = emailService.upDateEmail(mail);
		ArrayList<String> strToStrArray = new ArrayList<String>();
		int readListCount = emailService.mailreadListCount(empNo);
		ArrayList <Email> emailReferenceList = emailService.emailReferenceList(email.getEmailFileList());
		ArrayList<EmailAttachment> emailAttachment = new ArrayList<EmailAttachment>();
		for(Email e : emailReferenceList) {
			System.out.println(e);
		}
		System.out.println();
		if(email.getEmailFileList() != null) {
			 // 문자열에 ','가 있는지 여부 확인
	        if (email.getEmailFileList().contains(",")) {
	            // ','를 기준으로 문자열 분할
	            String[] splitArray = email.getEmailFileList().split(",");

	            // 배열을 ArrayList로 변환하여 추가
	            strToStrArray.addAll(Arrays.asList(splitArray));
	        } else {
	            // ','가 없으면 그냥 문자열 추가
	        	strToStrArray.add(email.getEmailFileList());
	        }

			emailAttachment = emailService.getEmailFileList(strToStrArray);
		}
       

		mv.addObject("email", email)
		.addObject("emailAttachment", emailAttachment)
		.addObject("readListCount", readListCount)
		.addObject("emailReferenceList", emailReferenceList)
		.addObject("empList", empList)
		.setViewName("mail/deleteMailDetailform");
		return mv;
	}
	
	//내용 이미지 업로드
	//ajax 로 들어오는 파일 업로드 요청 처리
	@PostMapping("uploadImageContent.mail")
	@ResponseBody
	public String upload(List<MultipartFile> fileList , HttpSession session) throws Exception {
		
		List<String> changeNameList = new ArrayList<String>();
		
		for(MultipartFile f : fileList) {
			//경로 준비
			String path = session.getServletContext().getRealPath("/resources/uploadFiles/mail/");
			String changeName = UUID.randomUUID().toString();
			String ext = f.getOriginalFilename().substring(f.getOriginalFilename().lastIndexOf("."));
			//타겟파일 준비
			File target = new File(path + changeName + ext);
			//파일전송
			f.transferTo(target);
			
			changeNameList.add(changeName + ext);
		}
		
		Gson gson = new Gson();
		return gson.toJson(changeNameList);
	}
	
	@RequestMapping("sendfile.mail")
	public String sendfile(MultipartHttpServletRequest fileList, HttpSession session, Email email, String[] referenceEmail)  {
		List<MultipartFile> fileLists = fileList.getFiles("fileList");
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		String changeName = "";
		EmailAttachment ea = new EmailAttachment();
		int result = 0;
		String str = "";
		ArrayList<String> stringL = new ArrayList<String>();
		ArrayList<String> stringList = new ArrayList<String>();
		String savePath = "";
		
		for(MultipartFile f : fileLists) {
			if(!(f.getOriginalFilename().equals(""))) {
				changeName = getSaveFileInfo(f, session, email,"resources/uploadFiles/mail/");
				savePath = session.getServletContext().getRealPath("resources/uploadFiles/mail/");
				ea.setEmailOriginName(f.getOriginalFilename());
				ea.setEmailChangeName(changeName);
				ea.setEmailFilePath("resources/uploadFiles/mail/" + changeName);
				str = emailService.insertAttachmentEmail(ea);
				stringList.add(str);
				
				stringL.add(savePath + changeName);
				
				
			}
		}

		
		String efl = "";
		if(stringList != null) {
			 efl = String.join(", ", stringList);
		}
		System.out.println(referenceEmail.length);
		if(referenceEmail.length > 0) {
			for(int i = 0; i < referenceEmail.length; i++) {
				if(i == 0) {
					int sender = emailService.selectSender(referenceEmail[i]);
					email.setEmailSenderNo(sender);
					email.setEmpNo(empNo);
					email.setEmailLevel(0);
					email.setEmailSenderEmail(referenceEmail[i]);
					email.setEmailFileList(efl);
					result = emailService.sendEmail(email);
					
					email.setEmailSenderNo(empNo);
					email.setEmpNo(sender);
					email.setEmailLevel(1);
					result = emailService.sendEmail(email);
				}else {
					int sender = emailService.selectSender(referenceEmail[i]);
					email.setEmailSenderNo(empNo);
					email.setEmpNo(sender);
					email.setEmailLevel(2);
					email.setEmailFileList(efl);
					email.setEmailSenderEmail(referenceEmail[i]);
					result = emailService.sendEmail(email);
				}
			}	
		}
			
			
				MimeMessage message = sender.createMimeMessage();
				MimeMessageHelper helper;
				try {
					helper = new MimeMessageHelper(message, true, "UTF-8");
					//받는 사람
					String[] to = {"rksekrh10@naver.com", "lloxlkt@gmail.com", "smile5189@naver.com"};
					helper.setTo(to);
					
					String[] cc = {"enelsld@gmail.com"};
					helper.setCc(cc);
					
					//메시지 제목
					helper.setSubject(email.getEmailTitle());
					//두번째 인자를 true로 보낼 시 html을 사용하겟다

					helper.setText(email.getEmailContent());
					
					//첨부파일 추가
					// javax.activation.DataSource : 파일정보
					if(!savePath.equals("")) {
						for (String filePath : stringL) {
				            File file = new File(filePath);
				            helper.addAttachment(file.getName(), file);
				        }
					}
			        
				} catch (MessagingException e) {
					e.printStackTrace();
				}
				sender.send(message);
				
				return "mail/mailList" ;
	}
	
	
	//메일 삭제 폼
	@ResponseBody
	@RequestMapping(value = "/ajaxMailDeletelist.mail",  produces = "appalication/json; charset = UTF-8")
	public String deleteMail(HttpSession session,  @RequestParam(value="emailNoList[]") List<Integer> emailNoList, @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit, int num) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		Email mail = new Email();
		mail.setEmpNo(empNo);
		int mailListCount = 0;
		int readListCount = 0;
		PageInfo pi = new PageInfo();
		ArrayList<Email> emailList = new ArrayList<Email>();
		
		
		if(emailNoList.size() > 0) {
			for(int eno : emailNoList) {
				int result = emailService.maildeleteSelect(eno);
				System.out.println(eno);
			}
		}
		if(num == 1) {
			mailListCount = emailService.sendMailListCount(empNo);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailSendSelectList(pi, empNo);
		}else {
			mailListCount = emailService.mailListCount(empNo);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailgetSelectList(pi, empNo);
		}
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("mailListCount", mailListCount);
		jobj.put("readListCount", readListCount);
		jobj.put("emailList", emailList);
	    return new Gson().toJson(jobj);
	}
	
	//휴지통 메일 삭제 폼
	@ResponseBody
	@RequestMapping(value = "/ajaxDeleteMailDeletelist.mail",  produces = "appalication/json; charset = UTF-8")
	public String deleteMail(HttpSession session,  @RequestParam(value="emailNoList[]") List<Integer> emailNoList, @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		
		if(emailNoList.size() > 0) {
			for(int eno : emailNoList) {
				int result = emailService.maildeleteSelectdelete(eno);
			}
		}

		
		Email mail = new Email();
		mail.setEmpNo(empNo);
		int mailListCount = emailService.sendDeleteMailListCount(empNo);
		int readListCount = emailService.mailreadListCount(empNo);
		PageInfo pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
		ArrayList<Email> emailList = emailService.mailSendDeleteSelectList(pi, empNo);
		
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("mailListCount", mailListCount);
		jobj.put("readListCount", readListCount);
		jobj.put("emailList", emailList);
	    return new Gson().toJson(jobj);
	}
	
	
	//휴지통 메일 살리기
	@ResponseBody
	@RequestMapping(value = "/ajaxRestoreMaillist.mail",  produces = "appalication/json; charset = UTF-8")
	public String ajaxRestoreMaillist(HttpSession session,  @RequestParam(value="emailNoList[]") List<Integer> emailNoList, @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		
		if(emailNoList.size() > 0) {
			for(int eno : emailNoList) {
				int result = emailService.ajaxRestoreMaillist(eno);
			}
		}

		
		Email mail = new Email();
		mail.setEmpNo(empNo);
		int mailListCount = emailService.sendDeleteMailListCount(empNo);
		int readListCount = emailService.mailreadListCount(empNo);
		PageInfo pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
		ArrayList<Email> emailList = emailService.mailSendDeleteSelectList(pi, empNo);
		
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("mailListCount", mailListCount);
		jobj.put("readListCount", readListCount);
		jobj.put("emailList", emailList);
	    return new Gson().toJson(jobj);
	}
	
	//메일 전달하기
	@ResponseBody
	@RequestMapping(value = "/ajaxMailrelay.mail")
	public String ajaxMailrelay(HttpSession session,  @RequestParam(value="relayCheckBoxtrueList[]") List<Integer> relayCheckBoxtrueList, @RequestParam(value="mailCheckBoxtrueList[]") List<Integer> mailCheckBoxtrueList) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		ArrayList<Email> emailList = new ArrayList<Email>();
		for(int mailNo : mailCheckBoxtrueList) {
			emailList.add(emailService.ajaxMailList(mailNo));
		}
		
		for(int relayNo : relayCheckBoxtrueList) {
			System.out.println(relayNo);
			for(Email e : emailList) {
				System.out.println(e);
				e.setEmpNo(relayNo);
				e.setEmailSenderNo(empNo);
				e.setEmailLevel(1);
				int result = emailService.sendEmail(e);
				e.setEmailLevel(0);
				e.setEmpNo(empNo);
				e.setEmailSenderNo(relayNo);
				result = emailService.sendEmail(e);
			}
		}
		return "전달 성공";
	}
	
	//메일 전달하기
	@ResponseBody
	@RequestMapping(value = "/ajaxDeleteMailrelay.mail")
	public String ajaxDeleteMailrelay(HttpSession session,  @RequestParam(value="relayCheckBoxtrueList[]") List<Integer> relayCheckBoxtrueList, @RequestParam(value="mailCheckBoxtrueList[]") List<Integer> mailCheckBoxtrueList) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		ArrayList<Email> emailList = new ArrayList<Email>();
		for(int mailNo : mailCheckBoxtrueList) {
			emailList.add(emailService.ajaxMailList(mailNo));
		}
		
		for(int relayNo : relayCheckBoxtrueList) {
			System.out.println(relayNo);
			for(Email e : emailList) {
				System.out.println(e);
				e.setEmpNo(relayNo);
				e.setEmailSenderNo(empNo);
				e.setEmailLevel(1);
				int result = emailService.sendEmail(e);
				e.setEmailLevel(0);
				e.setEmpNo(empNo);
				e.setEmailSenderNo(relayNo);
				result = emailService.sendEmail(e);
			}
		}
		return "전달 성공";
	}
	
	//메일 전달하기
	@ResponseBody
	@RequestMapping(value = "/ajaxRelayOnlySend.mail")
	public String ajaxRelayOnlySend(HttpSession session,  @RequestParam(value="relayCheckBoxtrueList[]") List<Integer> relayCheckBoxtrueList, int emailNo) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		ArrayList<Email> emailList = new ArrayList<Email>();
		emailList.add(emailService.ajaxMailList(emailNo));
		
		for(int relayNo : relayCheckBoxtrueList) {
			System.out.println(relayNo);
			for(Email e : emailList) {
				System.out.println(e);
				e.setEmpNo(relayNo);
				e.setEmailSenderNo(empNo);
				e.setEmailLevel(1);
				int result = emailService.sendEmail(e);
				e.setEmailLevel(0);
				e.setEmpNo(empNo);
				e.setEmailSenderNo(relayNo);
				result = emailService.sendEmail(e);
			}
		}
		return "전달 성공";
	}
	
	//메일 안읽음 표시
	@ResponseBody
	@RequestMapping(value = "/ajaxNotReadMail.mail",  produces = "appalication/json; charset = UTF-8")
	public String ajaxNotReadMail(HttpSession session,  @RequestParam(value="emailNoList[]") List<Integer> emailNoList, @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit, int num) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		int mailListCount = 0;
		int readListCount = 0;
		PageInfo pi = new PageInfo();
		ArrayList<Email> emailList = new ArrayList<Email>();
		
		System.out.println(emailNoList.size());
		if(emailNoList.size() > 0) {
			for(int eno : emailNoList) {
				int result = emailService.ajaxNotReadMail(eno);
				
				System.out.println(eno);
			}
		}
		

		Email mail = new Email();
		mail.setEmpNo(empNo);
		
		if(num == 0) {
			mailListCount = emailService.mailListCount(empNo);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailgetSelectList(pi, empNo);
		}else {
			mailListCount = emailService.sendMailListCount(empNo);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailSendSelectList(pi, empNo);
		}

		
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("mailListCount", mailListCount);
		jobj.put("readListCount", readListCount);
		jobj.put("emailList", emailList);
	    return new Gson().toJson(jobj);
	}
	
	//메일 읽음 표시
	@ResponseBody
	@RequestMapping(value = "/ajaxReadMail.mail",  produces = "appalication/json; charset = UTF-8")
	public String ajaxReadMail(HttpSession session,  @RequestParam(value="emailNoList[]") List<Integer> emailNoList, @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit, int num) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		int mailListCount = 0;
		int readListCount = 0;
		PageInfo pi = new PageInfo();
		ArrayList<Email> emailList = new ArrayList<Email>();
		
		if(emailNoList.size() > 0) {
			for(int eno : emailNoList) {
				int result = emailService.ajaxReadMail(eno);
			}
		}

		Email mail = new Email();
		mail.setEmpNo(empNo);
		
		if(num == 0) {
			mailListCount = emailService.mailListCount(empNo);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailgetSelectList(pi, empNo);
		}else {
			mailListCount = emailService.sendMailListCount(empNo);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailSendSelectList(pi, empNo);
		}
		
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("mailListCount", mailListCount);
		jobj.put("readListCount", readListCount);
		jobj.put("emailList", emailList);
	    return new Gson().toJson(jobj);
	}
	
	//메일 검색
	@ResponseBody
	@RequestMapping(value = "/ajaxmailSearchInput.mail",  produces = "appalication/json; charset = UTF-8")
	public String ajaxmailSearchInput(HttpSession session, @RequestParam(value="cpage", defaultValue = "1") int currentPage, @RequestParam(value="boardLimit", defaultValue = "5") int boardLimit, int num, String mailSearchInput, String mailSearchSelect) {
		int empNo = ((Employee)session.getAttribute("loginUser")).getEmpNo();
		Email mail = new Email();
		mail.setEmpNo(empNo);
		mail.setMailSearchValue(mailSearchInput);
		mail.setMailSearchSelect(mailSearchSelect);
		int mailListCount = 0;
		int readListCount = 0;
		PageInfo pi = new PageInfo();
		ArrayList<Email> emailList = new ArrayList<Email>();
		
		if(num == 1) {
			mailListCount = emailService.sendMailSearhListCount(mail);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailSendSelectSearhList(pi, mail);
		}else if(num == 0) {
			mailListCount = emailService.mailListSearhCount(mail);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailgetSelectSearhList(pi, mail);
		}else {
			mailListCount = emailService.deleteListSearhCount(mail);
			readListCount = emailService.mailreadListCount(empNo);
			pi = Pagenation.getPageInfo(mailListCount, currentPage, 8, boardLimit);
			emailList = emailService.mailDeleteSelectSearhList(pi, mail);
		}
		JSONObject jobj = new JSONObject();
		jobj.put("pi", pi);
		jobj.put("mailListCount", mailListCount);
		jobj.put("readListCount", readListCount);
		jobj.put("emailList", emailList);
	    return new Gson().toJson(jobj);
	}
	
	
	//메익 한개 삭제
	@RequestMapping("/detailDeleteMailForm.mail")
	public String detailDeleteMailForm(int emailNo, int num) {
		if(num == 0) {
			int result = emailService.maildeleteSelect(emailNo);
			return "mail/mailList";
		}else if (num == 1){
			int result = emailService.maildeleteSelect(emailNo);
			return "mail/mailSendList";
		}else {
			int result = emailService.maildeleteSelectdelete(emailNo);
			return "mail/mailDeleteList";
		}
		
	}
	
	//메일 하나 복구
	@RequestMapping("/restoreMailOnly.mail")
	public String restoreMailOnly(int emailNo) {
		int result = emailService.ajaxRestoreMaillist(emailNo);
		return "mail/mailDeleteList";
	}
	
	public String getSaveFileInfo(MultipartFile upfile, HttpSession session, Email email,String path) {
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

package com.kh.ww.mail.model.vo;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Email {
	private int emailNo; //메일번호
	private int empNo; //사원번호
	private String empEmail; //사원아이디
	private String empSenderName; //사원이름
	private String empName; //사원아이디
	private String empDeptName; //사원 직급
	private String empJobName; //사원 JOB
	private int emailSenderNo; //보낸사람번호
	private String emailSenderEmail; //보낸사람 아이디
	private String emailSenderDept; //보낸사람번호
	private String emailSenderJob; //보낸사람 아이디
	private String emailTitle; //제목
	private String emailContent; //내용
	private String emailDate; //날짜
	private String emailTime; //시간
	private int emailLevel; //참조여부
	private int emailReadStatus; //읽음여부
	private String emailReceiveStatus; //삭제여부
	private String emailFileList; //파일 리스트
	ArrayList<String> strToStrArray;
	private String mailSearchValue;
	private String mailSearchSelect;
}

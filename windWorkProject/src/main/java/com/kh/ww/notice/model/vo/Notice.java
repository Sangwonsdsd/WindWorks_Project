package com.kh.ww.notice.model.vo;

import java.sql.Date;

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
public class Notice {
	private int noticeNo;
	private String noticeTitle;
	private String noticeContent;
	private int noticeCount;
	private Date noticeCreateDate;
	private String noticeStatus;
	private int empNo;
	private String empName;
	
//	private String noticeOriginName;
//	private String noticeChangeName;
//	private String noticeFilePath;
//	private String noticeFileLevel;
	private String deptCode;
//	private int noticeReplyNo;
//	private int parentReplyNo;
}

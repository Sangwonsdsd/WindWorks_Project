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
public class NoticeReply {
	private int noticeReplyNo;
	private int noticeNo;
	private int parentReplyNo;
	private String noticeReplyContent;
	private String noticeReplyCreateDate;
	private String noticeReplyStatus;
	private int empNo;
	private String empName;
}

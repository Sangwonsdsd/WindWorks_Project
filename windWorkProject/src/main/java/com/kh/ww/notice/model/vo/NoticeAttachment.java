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
public class NoticeAttachment {
	private int noticeFileNo;
	private int noticeNo;
	private String noticeOriginName;
	private String noticeChangeName;
	private String noticeFilePath;
	private Date noticeUploadDate;
	private int noticeFileLevel;
	private String noticeAttachmentStatus;
}

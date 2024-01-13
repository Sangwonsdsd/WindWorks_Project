package com.kh.ww.mail.model.vo;

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

public class EmailAttachment {
	private int emailFileNo; //파일번호
	private String emailOriginName; //파일원본명
	private String emailChangeName; //파일수정명
	private String emailFilePath; //폴더경로
	private String emailUploadDate; //업로드일
	private String emailNo; //메일번호
}

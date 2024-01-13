package com.kh.ww.common.template;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.web.multipart.MultipartFile;

public class SaveFile {
	public static String getSaveFileInfo(MultipartFile upfile, HttpSession session, String path) {
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

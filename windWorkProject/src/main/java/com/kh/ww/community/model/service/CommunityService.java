package com.kh.ww.community.model.service;

import java.util.ArrayList;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.community.model.vo.Community;
import com.kh.ww.community.model.vo.CommunityAttachment;
import com.kh.ww.community.model.vo.CommunityBoard;
import com.kh.ww.community.model.vo.CommunityReply;
import com.kh.ww.employee.model.vo.Employee;

public interface CommunityService {
	
	// 커뮤니티 첫 화면 불러오기
	ArrayList<Community> communityList(Employee e);
	
	// 멤버 조회
	ArrayList<Employee> memberList(int comNo);
	
	// 보드 리스트
	int boardListCount(int comNo);  // 카운트
	ArrayList<CommunityBoard> boardList(PageInfo pi, int comNo);  // 리스트
	
	// 보드 디테일 조회
	CommunityBoard selectBoard(int bno);  // 보드
	ArrayList<CommunityAttachment> boardFile(int bno);  // 파일
	
	// 댓글 리스트
	ArrayList<CommunityReply> replyList(int bno); 
	ArrayList<CommunityReply> reReplyList(int bno); 
	
	// 댓글 등록
	int communityReplyIn(CommunityReply cr);
	// 댓글 삭제
	int communityReplyDel(int rno);
	// 답글 등록
	int communityReReplyIn(CommunityReply cr);
	// 댓글 수정
	int communityReplyUp(CommunityReply cr);

	// 전체 커뮤 리스트
	ArrayList<Community> communityListAll();
	
	// 커뮤 가입
	int communityIn(Community c);
	// 커뮤 탈퇴
	int communityOut(Community c);
	// 커뮤 등록
	int communityCreate(Community c);
	// 커뮤그룹 등록
	int communityGroupCreate(Community c);
	// 커뮤 수정
	int communityUpdate(Community c);
	// 커뮤 삭제
	int communityDelete(Community c);
	
	// 게시글 등록
	int comBoardInsert(CommunityBoard cb);
	// 첨부파일 등록
	int comBoardAttInsert(CommunityAttachment ca);
	// 게시글 삭제
	int comBoardDelete(int bno);
	// 첨부파일 조회
	ArrayList<CommunityAttachment> selectBoardAttList(int bno);
	// 첨부파일 삭제
	int deleteBoardAtt(int fno);
	// 게시글 수정
	int comBoardUpdate(CommunityBoard cb);
	// 첨부파일 변경
	int comBoardAttUpdate(CommunityAttachment ca);
	

}

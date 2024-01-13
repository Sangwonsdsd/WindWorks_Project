const noticeDetailViewController ={
    /* ----- 댓글 그려주기 -----*/
    selectReplyListAjax: (data, selectReplyListDraw) => {
        $.ajax({
            url: "rlist.no",
            data,
            success: function(result){
                console.log(result);
                selectReplyListDraw(result)
            },
            error : (error) =>{
              console.log(error)
            }
        })
    },

    /* ----- 댓글 쓰기 기능 ----- */
    addReplyAjax: (data, selectReplyList) => {
        $.ajax({
            url: "rinsert.no",
            data,
            success: function(result){
                if (result === "success"){
                    selectReplyList(data.noticeNo);
                    $("#contentReply").val("");
                }
            },
            error: function(){
                console.log("rinsert.no ajax통신 실패");
            }
        })
    },

    /* ----- 댓글 수정 기능 ----- */
    noticeReplyUpdateAjax: (data, selectReplyList) => {
        $.ajax({
            url: "rupdate.no",
            data,
            success: function(result){
                swal("", "댓글이 수정되었습니다.", "success");
                selectReplyList(data.noticeNo);
            },
            error: function(){
                console.log("rupdate.no ajax통신 실패");
            }
        })
    },

    /* ----- 댓글 삭제 기능 ----- */
    noticeReplyDeleteAjax: (data, selectReplyList) => {
        $.ajax({
            url: "rdelete.no",
            data,
            success: function(result){
                swal("", "댓글이 삭제되었습니다.", "success");
					
                selectReplyList(data.noticeNo);

            },
            error: function(){
                console.log("rdelete.no ajax통신 실패");
            }
        })
    },

    /* ----- 답글 쓰기 기능 ----- */
    addChildReplyAjax: (data, selectReplyList) => {
        $.ajax({
            url: "crinsert.no",
            data,
            success: function(result){
                
                if (result === "success"){
                    selectReplyList(data.noticeNo);
                }
            },
            error: function(){
                console.log("crinsert.no ajax통신 실패");
            }
        })
    },

    /* ----- 답글 수정 기능 ----- */
    appendChildReplyUpdateAjax: (data, selectReplyList) => {
        $.ajax({
            url: "crupdate.no",
            data,
            success: function(result){
                swal("", "답글이 수정되었습니다.", "success");
                selectReplyList(data.noticeNo);
            },
            error: function(){
                console.log("crupdate.no ajax통신 실패");
            }
        })    
    },

    /* ----- 답글 삭제 기능 ----- */
    noticeChildReplyDeleteAjax: (data, selectReplyList) => {
        $.ajax({
            url: "crdelete.no",
            data,
            success: function(result){
                swal("", "답글이 삭제되었습니다.", "success");
                selectReplyList(data.noticeNo);
            },
            error: function(){
                console.log("crdelete.no ajax통신 실패");
            }
        })
    }
}
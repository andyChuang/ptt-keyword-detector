var pageContentData = {
	data: "",
	time: ""
};

$(document).ready(function(){
	$("#goSearchingBtn").click(function(){
		$("#message").html("Start to detect keyword [" + $("#keyword").val() + "]...");
		updatePageContentData();
		setTimeout(searchRoutine, 6000);
	});
});


function searchRoutine(){
	var keyword = $("#keyword").val();
	updatePageContentData();
	if(isMatchingPost(keyword, pageContentData.data)){
		alert("Find it!!!!!!!");
	}
	setTimeout(searchRoutine, 6000);
}

function updatePageContentData(){
	var response = "";
	$.ajax({
		method: "POST",
		url: "pttGetPageWorker.php",
	}).done(function(data) {
			var dataWithoutNewLine = data.replace(/(\r\n|\r|\n)/g, '');
			var reg = /<div\s+?class\s*?=\s*?"title"\s*?>(.*?)<\s*?\/div\s*?>/gi;
			var matches = dataWithoutNewLine.match(reg);
			if(matches==null){
				$("#pageContent").html("Not Found!!");
			}else{
				$("#pageContent").html("");
				for(var i=0;i<matches.length;i++){
					reg = /<a href.*>(.*?)<\/a>/gi;
					var title = reg.exec(matches[i]);
					if(!title){
						$("#pageContent").html("Not Found Title!!");
					}else{
						$("#pageContent").append(title[1])
						.append("\t\t" + Date.now())
						.append("\n");
					}
				}
				pageContentData.data = $("#pageContent").html();
			}
		});
}

function isMatchingPost(keyword, content){
	console.log("keyword:" + keyword + "\n" + "content:" + content);
	if(content.indexOf(keyword)!=-1){
		return true;
	}
	return false;
}
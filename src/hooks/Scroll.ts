

const scroll = (tableBody: { getElementsByClassName: (arg0: string) => any[]; }) => {
	let isScroll = true;
  
	const dom1 = tableBody.getElementsByClassName("el-scrollbar__wrap")[0];
  
	//鼠标放上去，停止滚动；移开，继续滚动
	dom1.addEventListener("mouseover", () => {
	  isScroll = false;
	});
	dom1.addEventListener("mouseout", () => {
	  isScroll = true;
	});
  
	setInterval(() => {
	  if (isScroll) {
		dom1.scrollTop += 2;
		if (dom1.clientHeight + dom1.scrollTop == dom1.scrollHeight) {
		  dom1.scrollTop = 0;
		}
	  }
	}, 100);
  };
  export default scroll;

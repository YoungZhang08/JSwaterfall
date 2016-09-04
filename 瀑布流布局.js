//当页面加载完毕后才开始获取元素，用id或className来获取元素
window.onload = function(){
	waterfall('container','box');
}

function waterfall(container,box){
	//将container下的所有class为box的元素取出来
	var myContainer = document.getElementById(container);
	var myBoxs = getByClass(myContainer,box);

	//计算整个页面显示的列数（页面宽/box的宽）
	var myBoxWidth = myBoxs[0].offsetWidth;  //获取图片宽度
	var num = Math.floor(document.documentElement.clientWidth / myBoxWidth);

	//设置container的宽度
	myContainer.style.cssText = 'width:'+ myBoxWidth * num +'px; margin: 0 auto';

	var heightArray = [];   //存放每一列高度的数组

	for(var i = 0; i < myBoxs.length; i++){
		if(i<num){
			heightArray.push(myBoxs[i].offsetHeight);
		}else{
			var minHeight = Math.min.apply(null,heightArray);
			//指向全局
			var index = getMinHeightIndex(heightArray,minHeight);
			myBoxs[i].style.position = 'absolute';
			myBoxs[i].style.top = minHeight + 'px';
			myBoxs[i].style.left = myBoxWidth * index + 'px';
			heightArray[index] += myBoxs[i].offsetHeight;
		}
	}
}

//根据class获取元素
function getByClass(myContainer,box){
	var boxArray = new Array(),  //用来存储获取到的所有class为box的元素
		myElements = myContainer.getElementsByTagName('*');

	for(var i = 0;i < myElements.length;i++){
		if(myElements[i].className == box){
			boxArray.push(myElements[i]);
		}
	}
	return boxArray;
}

//找到最小高度的索引
function getMinHeightIndex(heightArray,minHeight){
	for(var i in heightArray){  //for-in语句遍历整个array数组
		if(heightArray[i] == minHeight){
			return i;
		}
	}
}
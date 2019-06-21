;(function($,win){
    var Slide=function(ele,opts){
        this.ele=ele;
        this.defaults={
            "autoplay":true,
            "speed":4000
        };
        this.settings=$.extend({},this.defaults,opts);
        if(this.settings.hasOwnProperty("data")){
            $data=this.settings.data;
        }
        $this=$(this.ele);
        this.getComputedSize();
        $curIndex=0;
    }
    Slide.prototype={
        "init":function(){
            if($data) {
                $.each($data,function (i) {
                    var name=$data[i].name;
                    var data=$data[i].data;
                    var imgUrl=$data[i].imgUrl;
                    var bgUrl=$data[i].bgUrl;
                    var boundData=$data[i].boundData;
                    var boundDataLine="";
                    if (boundData!=undefined) {
                    	boundDataLine="bzzbbh='"+boundData.zbbh+"' zblx='"+boundData.mrxs+"' zbms='"+boundData.zbms+"' zbdw='"+boundData.zbdw+"' sfymx='"+boundData.sfymx+"'";
					}
                    var liDom="<li "+boundDataLine+"  ><div class='slide-inner'><img src='"+imgUrl+"' ><span class='number'>"+data+"</span>"+
                        "<p class='name'>"+name+"</p></div></li>";
                    $box.find("ul").append(liDom);
                    $box.find("ul li").css({"position":"absolute"});
                    var index;
                    if(i%4==0){
                    	index=0;
                    }else{
                    	index=i%4;
                    }
                    var className="item"+(index);
                    $box.find("ul li").eq(i).addClass(className);
                    var cl=$pos["p"+ i ];
                    if($dataLen > 4){
                    	$box.find("ul li").eq($tempLen).addClass("item");
                        $box.find("ul li").eq($dataLen-1).addClass("item");
                        $box.find("ul li").eq(i).css(cl);
                    }
                });
            }
            if($dataLen > 4){
                $box.append("<div class='prev'></div><div class='next'></div>");
                $box.find(".prev,.next").css({"position":"absolute","z-index":"10","top":$btnTop,"width":"24px","height":"24px"});
                $box.find(".prev").css({"left":"12px"});
                $box.find(".next").css({"right":"12px"});
                $box.find(".prev").on("click",this.animToPrev);
                $box.find(".next").on("click",this.animToNext);
            }else{
                if($dataLen!=0){
                    //3个以下不轮播
                    $box.find(".prev,.next").remove();
                    $box.find("ul li").each(function(i){
                    	 $(this).css({"left":$left1+($liwidth+16)*i,"opacity":1,"width":$liwidth,"height":$height*0.88,"top":0});
                    });
                }else{
                    //数量为0时显示暂无数据
                    $box.empty().addClass("zwsjstyle").append("<p class='zwsj' ><span>查无数据</span></p>");
                    var zwsjW = $("#zbbhqs-charts").width();
                    var zwsjH = $("#zbbhqs-charts").height();
                    $("#zbbhqs-charts").hide();
                    $(".fd-section-bhqs").append("<div class='js-zwsj'><p class='zwsj' ><span>查无数据</span></p></div>");
                    $("div.js-zwsj").css({"height":zwsjW+"px","height":zwsjH+"px"});
                }
            }
            $(win).resize(function(){
            	Slide.prototype.getComputedSize();
            	Slide.prototype.resizeCharts();
            });
            return $this;
        },
        "getComputedSize":function(){
        	  $width=parseInt($this.width());
              $height=parseInt($this.height());
              $box=$this.find("ul").parent("div.fd-zbqk-list");
              $liwidth=($width*0.76-48)/4;
              $left0=$width*0.08;
              $dataLen=$data.length;
              $btnTop=$height*0.44-12;
              $left1=parseInt(($width*0.92-($liwidth*$dataLen+16*($dataLen-1)))/2);
              if($dataLen > 5){
                  $tempLen=4;
                  $left0=$width*0.08;
              }else{
                  $tempLen=3;
                  $left0=parseInt(($width*0.92-($liwidth*3+32))/2);
              }
              var left;
              var top;
              var width;
              var height;
              var zIndex;
              var opacity;
              $pos={};
              for(var i=0;i<$dataLen;i++){
                  var left=$left0+($liwidth+16)*i;
                  var top=0;
                  var width=$liwidth;
                  var height=$height*0.88;
                  var zIndex=2;
                  var opacity=1;
                  if(i>($tempLen+1)){
                      opacity=0;
                  }
                  if(i==($tempLen) || i==($dataLen-1)){
                     top=$height*0.044;
                     width=$liwidth*0.91;
                     height=$height*0.782;
                     opacity=0.36;
                     zIndex=1;
                  }
                  if(i==($tempLen)){
                      left=$width*0.92-$liwidth*0.91;
                  }
                  if(i==($dataLen-1)){
                      left=0;
                  }
                  $pos["p"+ i ]={"left":left,"top":top,"width":width,"height":height,"z-index":zIndex,"opacity":opacity};
              }
              $box.css({"width":$width*0.92,"height":$height*0.88,"position":"relative","top":$height*0.06,"margin-left":$width*0.04,"margin-right":$width*0.04});
              if($dataLen > 4){
            	    $box.find(".prev,.next").css({"top":$btnTop});
              }else{
            	  if($dataLen!=0){ 
            		  $box.find("ul li").each(function(i){
                          $(this).css({"left":$left1+($liwidth+16)*i,"opacity":1,"width":$liwidth,"height":$height*0.88,"top":0});
                      });
            	  }
              }
        },
        "resizeCharts":function(){
        	if($curIndex==0){
        		if($dataLen>4){
        			 if($data) {
                         $.each($data,function (i) {
                      	    $box.find("ul li").css({"position":"absolute"});
                             var cl=$pos["p"+ i ];
                             $box.find("ul li").eq(i).css(cl);
                        });
                     }
        		}else{
                    if($dataLen!=0){
                        //3个以下不轮播
                        $box.find(".prev,.next").remove();
                        $box.find("ul li").each(function(i){
                            $(this).css({"left":$left1+($liwidth+16)*i,"opacity":1});
                        });
                    }else{
                        //数量为0时显示暂无数据
                        $box.empty().addClass("zwsjstyle").append("<p class='zwsj' >暂无数据</p>")
                    }
                }
        	}else{
        		 $box.find("ul li").each(function(i){
                     var n=i-$curIndex;
                     if(n<0){
                         n=$dataLen-Math.abs(n);
                     }
                     var cl=$pos["p"+ n];
                     $box.find("ul li").eq(i).css(cl);
                 });
        	}
        },
        "animToNext":function(){
        	 if($curIndex!=($dataLen-1)){
                 $curIndex++;
             }else{
                 $curIndex=0;
             }
             $box.find("ul li").each(function(i){
                 var n=i-$curIndex;
                 if(n<0){
                     n=$dataLen-Math.abs(n);
                 }
                 var cl=$pos["p"+ n];
                 $(this).stop().animate(cl,'300');
                 if($dataLen==5){
                	 var removeRightItem = ($curIndex+3)%$dataLen;
                     var removeLeftItem = (Math.abs($curIndex-3+$dataLen))%$dataLen;
                     var addRightItem = ($curIndex+4)%$dataLen;
                     var addLeftItem = (Math.abs($curIndex-2+$dataLen))%$dataLen;
                 }else{
                	 var removeRightItem = ($curIndex+3)%$dataLen;
                     var removeLeftItem = (Math.abs($curIndex-3+$dataLen))%$dataLen;
                     var addRightItem = ($curIndex+4)%$dataLen;
                     var addLeftItem = (Math.abs($curIndex-1+$dataLen))%$dataLen; 
                 }
                 $box.find("ul li").eq(removeRightItem).removeClass("item");
                 $box.find("ul li").eq(removeLeftItem).removeClass("item");
                 $box.find("ul li").eq(addRightItem).addClass("item");
                 $box.find("ul li").eq(addLeftItem).addClass("item");
             });
        },
        "animToPrev":function(){
        	if($curIndex!=0){
                $curIndex--;
            }else{
                $curIndex=($dataLen-1);
            }
            $box.find("ul li").each(function(i){
                var n=$curIndex-i;
                if(n>0){
                    n=$dataLen-Math.abs(n);
                }
                if(n<0){
                    n=Math.abs(n);
                }
                var cl=$pos["p"+ n];
                $(this).stop().animate(cl,'300');
                if($dataLen==5){
                	var removeRightItem = ($curIndex+4)%$dataLen;
                    var removeLeftItem = $curIndex;
                    var addRightItem = ($curIndex+4)%$dataLen;
                    var addLeftItem = (Math.abs($curIndex-2+$dataLen))%$dataLen; 
                }else{
                	var removeRightItem = ($curIndex+5)%$dataLen;
                    var removeLeftItem = $curIndex;
                    var addRightItem = ($curIndex+4)%$dataLen;
                    var addLeftItem = (Math.abs($curIndex-1+$dataLen))%$dataLen; 
                }
                $box.find("ul li").eq(removeRightItem).removeClass("item");
                $box.find("ul li").eq(removeLeftItem).removeClass("item");
                $box.find("ul li").eq(addRightItem).addClass("item");
                $box.find("ul li").eq(addLeftItem).addClass("item");
            });
        }
    };
    $.fn.slide=function(options){
        var slide=new Slide(this,options);
        return slide.init();
    }
})(jQuery,window);
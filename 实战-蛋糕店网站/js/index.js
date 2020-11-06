$(function(){
    /*轮播图*/
    (function(){
        let $banner = $("#banner");
        let $imgLi = $banner.find("ul.img li");
        let $tabLi = $banner.find("ul.tab li");
        let current = 0;//记录当前显示的是谁
        let clickTime = 0; //检测点击间隔
        let timer = null; //存储定时器

        //定时器
        function auto(){
            timer = setInterval(()=>{
                current = !current+0;
                clickTime = new Date();
                /*tab按钮自身样式的变化*/
                $tabLi.eq(current).addClass("on").siblings().removeClass("on");
                /*随机切换效果*/
                changeAnimate(current);
            },4000);
        }
        auto();
        $banner.hover(function(){
            clearInterval(timer)
        },function(){
            auto();
        });


        //运动函数
        let changeAnimate = (function(){
            /*动画列表*/
            let arrAnimate = [
                "tTb",//上到下移动
                "bTt",//下到上移动
                "lTr",//左到右移动
                "fade",//淡入淡出
                "bTtRotate",//下到上的翻转
                "tTbRotate",//上到下的翻转
                "centerRotate",//中心翻转
            ];
            return function(index){
                let type = arrAnimate[Math.floor(Math.random()*arrAnimate.length)];
                /*即将要显示的*/
                $imgLi.eq(index).prop("class",type+"B");
                /*当前显示的*/
                $imgLi.eq(!index+0).prop("class",type+"A");
            }
        })();

        /*tab的点击*/
        $tabLi.click(function(){
            //判断点击间隔
            if(new Date() - clickTime < 1000)return;
            //获取序号
            let index = $(this).index();
            /*如果点选的是当前正在显示的，就啥事不干*/
            if(index === current)return;

            /*改变current 和 时间检测*/
            current = index;
            clickTime = new Date();

            /*tab按钮自身样式的变化*/
            $(this).addClass("on").siblings().removeClass("on");

            /*随机切换效果*/
            changeAnimate(index);
        });
    })();

    /*选项卡*/
    (function(){
        let $li = $("#sell-well .hot-product .products .product-left .product-list ul li");
        let $tab = $("#sell-well .hot-product .products .product-left .product-tab .contenting");

        let current = 0;

        $li.click(function(){
            let index = $(this).index();
            if (index === current)return;
            current = index;

            $(this)
                .prop("class","hot-cake")
                .siblings()
                .prop("class","list-cake");

            $tab.eq(index)
                .show()
                .siblings()
                .hide();

        });

    })();
});
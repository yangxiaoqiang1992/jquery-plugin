(function($) {
	var ms = {
		_this: '',
		_args: {},
		_prevShowDomIndex: [],
		_currentShowDomIndex: [0, 1, 2, 3, 4],
		_nextShowDomIndex: [],
		_timer: '',
		init: function(dom) {
			ms._this = $(dom)
			ms._this.addClass('ms_box')
			//ms.createUnit()
			ms.bindScrollEvent()
		},
		// createUnit: function() {
		// 	// 创建模型dom
		// 	console.log(ms._args)
		// 	for (var i = 0; i < ms._args.len; i++) {
		// 		var html = "<div>" + i + "</div>"
		// 		ms._this.append(html)
		// 	}
		// },
		bindScrollEvent: function() {
			// 如果子节点不足6个则不绑定滚动事件
			if (ms._args.len < 6) {
				return
			}
			// 绑定滚动事件
			ms._this.on('mousewheel', function(event) {
				// 函数防抖
				if (ms._timer) {
					clearTimeout(ms._timer)
				}
				ms._timer = setTimeout(function() {
					var dir = event.originalEvent.wheelDelta > 0 ? 'Up' : 'Down';
			        if (dir == 'Up') {
			            console.log('向上滚动');
			            // 向右滑动
			            ms.getNextShowDomIndex()
			            ms.leftAnimate()
			        } else {
			            console.log('向下滚动');
			            // 向左滑动
			            ms.getPrevShowDomIndex()
			            ms.rightAnimate()
			        }
			        ms._timer = undefined
				}, 300)
			})
		},
		getNextShowDomIndex: function() {
			var currentFootIndex = ms._currentShowDomIndex[ms._currentShowDomIndex.length - 1]
			ms._nextShowDomIndex = []
			for (var i = 0; i < ms._currentShowDomIndex.length; i++) {
				ms._nextShowDomIndex.push(ms._currentShowDomIndex[i + 1])
			}
			ms._nextShowDomIndex[4] = currentFootIndex === (ms._args.len - 1) ? 0 : ++currentFootIndex
			ms._prevShowDomIndex = ms._currentShowDomIndex
			ms._currentShowDomIndex = ms._nextShowDomIndex
			console.log(ms._prevShowDomIndex, ms._nextShowDomIndex, 'ztttt')
		},
		getPrevShowDomIndex: function() {
			var currentFirstIndex = ms._currentShowDomIndex[0]
			ms._nextShowDomIndex = []
			for (var i = 0; i < ms._currentShowDomIndex.length; i++) {
				ms._nextShowDomIndex.push(ms._currentShowDomIndex[i - 1])
			}
			ms._nextShowDomIndex[0] = currentFirstIndex === 0 ? (ms._args.len - 1) : --currentFirstIndex
			ms._prevShowDomIndex = ms._currentShowDomIndex
			ms._currentShowDomIndex = ms._nextShowDomIndex
			console.log(ms._prevShowDomIndex, ms._nextShowDomIndex, 'mjjjj')
		},
		leftAnimate: function() {
			var dom = ms._this.children()
			var prevArr = ms._prevShowDomIndex
			var nextArr = ms._nextShowDomIndex
			for (var i = 0; i < prevArr.length; i++) {
				if (i === 0) {
					$(dom[prevArr[i]]).animate({
						opacity: '0',
					    left: ms._args.pvFirst[0] + 'px',
					    top: ms._args.pvFirst[1] + 'px'
					})
				} else {
					if (i === prevArr.length - 1) {
						$(dom[nextArr[nextArr.length - 1]]).css({
							left: ms._args.ntLast[0] + 'px',
						    top: ms._args.ntLast[1] + 'px'
						})
						$(dom[nextArr[nextArr.length - 1]]).animate({
							opacity: '1',
						    left: $(dom[prevArr[i]]).css('left'),
						    top: $(dom[prevArr[i]]).css('top')
						})
					}
					$(dom[prevArr[i]]).animate({
						opacity: '1',
					    left: $(dom[prevArr[i - 1]]).css('left'),
					    top: $(dom[prevArr[i - 1]]).css('top')
					})
				}
			}
		},
		rightAnimate: function() {
			var dom = ms._this.children()
			var prevArr = ms._prevShowDomIndex
			var nextArr = ms._nextShowDomIndex
			for (var i = 0; i < prevArr.length; i++) {
				if (i === prevArr.length - 1) {
					$(dom[prevArr[i]]).animate({
						opacity: '0',
					    left: ms._args.ntLast[0] + 'px',
					    top: ms._args.ntLast[1] + 'px'
					})
				} else {
					if (i === 0) {
						$(dom[nextArr[0]]).css({
							left: ms._args.pvFirst[0] + 'px',
						    top: ms._args.pvFirst[1] + 'px'
						})
						$(dom[nextArr[0]]).animate({
							opacity: '1',
						    left: $(dom[prevArr[i]]).css('left'),
						    top: $(dom[prevArr[i]]).css('top')
						})
					}
					$(dom[prevArr[i]]).animate({
						opacity: '1',
					    left: $(dom[prevArr[i + 1]]).css('left'),
					    top: $(dom[prevArr[i + 1]]).css('top')
					})
				}
			}
		}
	}
	$.fn.createPlugInUnit = function(arguments) {
		// 参数合并
		$.extend(ms._args, arguments)
		ms.init(this)
	}
})($)

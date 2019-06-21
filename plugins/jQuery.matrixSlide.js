;
(function($) {
    var MatrixSlide = function(el, opts) {
        this.$el = el
        this.$items = this.$el.children("div")
        this.$fyfbType = $('#fyfbType')
        this.$itemLen = this.$items.length
        this.$size = {
            width : '',
            height : '',
            boxWidth : '',
            boxHeight : ''
        }
        this.$curIndex = 0, this.$pos = [ [ {
            x : 50,
            y : 100
        }, {
            x : 100,
            y : 50
        }, {
            x : 50,
            y : 0
        }, {
            x : 0,
            y : 50
        } ], [ {
            x : 100,
            y : 50
        }, {
            x : 50,
            y : 0
        }, {
            x : 0,
            y : 50
        }, {
            x : 50,
            y : 100
        } ], [ {
            x : 50,
            y : 0
        }, {
            x : 0,
            y : 50
        }, {
            x : 50,
            y : 100
        }, {
            x : 100,
            y : 50
        } ], [ {
            x : 0,
            y : 50
        }, {
            x : 50,
            y : 100
        }, {
            x : 100,
            y : 50
        }, {
            x : 50,
            y : 0
        } ] ]
        this.$timer = null
        this.$defaults = {
            'speed' : 5000,
            'delayTime' : 1000
        }
        this.$options = $.extend({}, this.$defaults, opts)
    }
    MatrixSlide.prototype = {
        /**
         * 初始化插件位置
         */
        init : function() {
            var _this = this
            this.$size.width = $(this.$el).width()
            this.$size.height = $(this.$el).height()
            this.$size.boxWidth = this.$items[0].getBoundingClientRect().width
            this.$size.boxHeight = this.$items[0].getBoundingClientRect().height
            _this.anim()
            this.$timer = setInterval(function() {
                _this.anim()
            }, this.$options.speed)
            this.$items.on('click', function() {
                var i = $(this).index() - 1;
                var clickIndex = null
                _this.$pos[i].forEach(function(item, index) {
                    if (item.x == 50 && item.y == 100) {
                        clickIndex = index
                    }
                })
                _this.$curIndex = clickIndex
                _this.anim()
            })
            this.$el.hover(function() {
                clearInterval(_this.$timer)
            }, function() {
                _this.$timer = setInterval(function() {
                    _this.anim()
                }, _this.$options.speed)
            })
            this.$fyfbType.val(this.$curIndex);
            this.$fyfbType.trigger('change')
            return this.$el
        },
        resize : function() {
            this.init()
        },
        anim : function() {
            var _this = this
            this.$items.each(function(index, item) {
                var pos = _this.$pos[index][_this.$curIndex]
                var x = (pos.x / 100) * _this.$size.width
                var y = (pos.y / 100) * _this.$size.height
                var scale = null
                if (pos.y != 0) {
                    y = y - _this.$size.boxHeight
                }
                if (pos.x != 0) {
                    x = x - _this.$size.boxWidth / 2
                    if (pos.x == 100) {
                        x = x - _this.$size.boxWidth / 2
                    }
                }
                if (pos.y > 50) {
                    scale = 1
                    y = y * 0.77
                } else if (pos.y > 0 && pos.y <= 50) {
                    scale = 0.73
                } else {
                    scale = 0.58
                }

                $(item).css({
                    'transform' : 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + scale + ')',
                    '-webkit-transform' : 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + scale + ')',
                    'opacity' : scale,
                    'transition' : 'all ' + (_this.$options.delayTime / 1000) + 's ease-in-out'
                })
            })
            if (this.$curIndex != (this.$itemLen - 1)) {
                this.$curIndex++
            } else {
                this.$curIndex = 0
            }
            this.$fyfbType.val(this.$curIndex);
            this.$fyfbType.trigger('change')
        }
    }
    $.fn.matrixSlide = function(options) {
        var matrix = new MatrixSlide(this, options)

        return matrix.init()
    }
})(jQuery);
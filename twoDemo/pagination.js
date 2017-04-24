// 闭包 自执行函数
;(function () {
    /**
     * pagination插件
     * jquery写在fn上的插件就是在jQuery的原型中，通过jQuery的实例方法调用
     * @param config
     */
    $.fn.pagination = function (params) {
        // 默认配置
        var defaultConfig = {
            page: 1,
            totalPage: 0,
            selectCallback: function () {
            }
        }
        // 对象复制
        var config = $.extend(defaultConfig, params)
	    // this值指向调用插件的选择器
        var $ele = $(this)
        var page = config.page
        var total = config.totalPage
	    // 清空当前选择器元素
	    $ele.empty()
        // 初始化渲染分页器
        var initRender = function () {
            var str = '<ul class="page">' +
                '</ul>' +
                '<div class="total">' +
                '<span>共' + total + '页</span><span>跳转</span>' +
                '<input type="text"><a class="page-btn">GO</a>' +
                '</div>'
            $ele.html(str)
	        update(page, total)
        }
        // 更新分页器方法
        var update = function (index, max, min) {
            min = min || 1
            index = +index
            var str = ''
            var findArr = [1, -1]
            var findIndex = 0
            var initIndex = index - 2 > min ? index - 2 : min
            var arr = [initIndex]
            var storage = initIndex
            if (index < min || index > max) {
                return
            }
            page = index
            if (index > min) {
                str += '<li><a class="prev">上一页</a></li>'
            }
            if (index > min + 2) {
                str += '<li class="item"><a>' + min + '</a></li>'
            }
            if (index > min + 3) {
                str += '<li><a class="omitted-prev">...</a></li>'
            }
            // 计算arr应该显示的数字
            while (arr.length < 5 && findIndex < findArr.length) {
                storage += findArr[findIndex]
                if (storage >= min && storage <= max) {
                    arr.push(storage)
                } else {
                    storage = initIndex
                    findIndex++
                }
            }
            // 数字数组排序
            arr.sort(function (a, b) {
                return a > b
            })
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === index) {
                    str += '<li><a class="item current">' + arr[i] + '</a></li>'
                } else {
                    str += '<li><a class="item">' + arr[i] + '</a></li>'
                }
            }
            if (index < max - 3) {
                str += '<li><a class="omitted-next">...</a></li>'
            }
            if (index < max - 2) {
                str += '<li class="item"><a>' + max + '</a></li>'
            }
            if (index < max) {
                str += '<li><a class="next">下一页</a></li>'
            }
            $ele.find('.page').html(str)
            // call调用selectCallback函数
            config.selectCallback.call($ele[0], index)
        }
	    // 初始化
        initRender()
        // 事件代理监听click事件,更新分页器
        $ele.on('click', '.prev', function () {
            update(page - 1, total)
        })
        $ele.on('click', '.next', function () {
            update(page + 1, total)
        })
        $ele.on('click', '.item', function () {
            var selectPage = $(this).text()
            update(selectPage, total)
        })
        $ele.on('click', '.page-btn', function () {
            var toPage = $ele.find('input').val()
            // 判读toPage不为空才调用 逻辑运算符&&的短路计算
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_AND
            toPage && update(toPage, total)
        })
        // jquery插件返回this 实现jquery的链式调用
        return this
    }
})()
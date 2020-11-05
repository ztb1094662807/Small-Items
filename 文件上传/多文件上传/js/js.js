const aInput = document.querySelectorAll('input')
//const $ = obj => document.querySelector(obj)
function $(obj){
    return document.querySelector(obj)
}

// 文件上传
let arr = []
// 文件大小
let aSize = []
// 文件名称
let aTitle = []

// input 选择文件
aInput.forEach((item,index)=>{
    item.onchange = function () {
        if (this.value){
            for (let i = 0; i < this.files.length; i++) {
                // 获取每一个选择文件对象
                let files = this.files.item(i)
                // 只处理图片格式 文件
                if (/image/.test(files.type)) {
                    // 把文件 存放起来
                    arr.push(files)
                    // 把文件大小 存放起来
                    aSize.push(files.size)
                    // 把文件名称 存放起来
                    aTitle.push(files.name)

                    readerFile(files)
                }

            }
            this.value = ''
        }
    }
})


// h5拖拽 捕获文件
$('#drag').ondragover = function (e) {
    e.stopPropagation()
    e.preventDefault()
}

$('#drag').ondragenter = function (e) {
    this.innerText = '请释放双手'
}

$('#drag').ondragleave = function (e) {
    this.innerText = '请将图片拖到此区域'
}

$('#drag').ondrop = function (e) {
    this.innerText = '请将图片拖到此区域'
    console.log(e.dataTransfer.files)
    if (e.dataTransfer.files.length){
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // 获取每一个选择文件对象
            let files = e.dataTransfer.files.item(i)
            // 只处理图片格式 文件
            if (/image/.test(files.type)) {
                // 把文件 存放起来
                arr.push(files)
                // 把文件大小 存放起来
                aSize.push(files.size)
                // 把文件名称 存放起来
                aTitle.push(files.name)

                readerFile(files)
            }

        }
    }

    e.stopPropagation()
    e.preventDefault()
}


// 图片预览
function readerFile(files) {
    // 把 对象 转换成 Blob对象
    const blob = new Blob([files])
    // 从内存里面读取 文件的链接地址
    const url = window.URL.createObjectURL(blob)
    const li = document.createElement('li')
    li.innerHTML = `<img src="${url}" width="100%" height="100%"/><p></p>`
    $('.list ul').appendChild(li)

    count()
}

// 计算图片个数大小 显示名称
function  count() {
    // 文件的 个数
    $('#picLen').innerText = arr.length

    // 图片的大小
    if (aSize.length)
        $('#picSize').innerText = ((aSize.reduce((prev,next)=>prev+next)) / 1024 / 1024).toFixed(2)
    else
        $('#picSize').innerText = 0

    // 在p标签 显示 文件名称
    let aP = $('.list ul').querySelectorAll('p')
    aP.forEach((item,index)=>{
        item.innerHTML = aTitle[index] + '<i></i>'
    })
    del()
}

// 删除 文件大小 文件个数 文件对象 li节点
function del() {
    let aLi = $('.list ul').querySelectorAll('li')
    aLi.forEach((item,index)=>{
        item.children[1].children[0].addEventListener('click', ()=>{
            arr.splice(index,1)
            aSize.splice(index,1)
            $('.list ul').removeChild(aLi[index])
            // 重新计算
            count()
        })
    })
}

// 把 arr数组的 文件对象  上传到后端服务器
$('.upload').onclick = function () {
    if (arr.length){
        arr.forEach((item,index)=>{
            const xhr = new XMLHttpRequest()
            xhr.onload = function(){
                console.log( xhr.responseText )
            }
            xhr.open('post','http://tanzhouweb.com/h5upload/upload.php',true)

            const data = new FormData()
            data.append('file',item)
            xhr.send(data)
        })
    }

}










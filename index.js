// Global函数

function addLoadEvent(func){
    var a=window.onload;
    if(typeof window.onload!="function"){
        window.onload=func;
    }else{
        window.onload=function(){
            a();
            func();
        }
    }
}
function insertAfter(newElement,old){
    var parent=old.parentNode;
    if(parent.lastChild==old){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,old.nextSibling);
    }
}
function addClass(element,newClass){
    if(!element.className){
        element.className=newClass;
    }else{
        var a=element.className;
        a+=" ";
        a+=newClass;
        element.className=a;
    }
}
function move(ID,x,y,time){
    var a=document.getElementById(ID);
    if(!a.style.top) a.style.top="0px";
    if(!a.style.left) a.style.left="0px";
    var ax=parseInt(a.style.left);
    var ay=parseInt(a.style.top);
    if(a.move) clearTimeout(a.move);
    if(ax<x) ax+=Math.ceil((x-ax)/10);
    if(ax>x) ax-=Math.ceil((ax-x)/10);
    if(ay<y) ay+=Math.ceil((y-ay)/10);
    if(ay>y) ay-=Math.ceil((ay-y)/10);
    a.style.left=ax+"px";
    a.style.top=ay+"px";
    a.move=setTimeout("move('"+ID+"',"+x+","+y+","+time+")",time);
}

// 主页函数index.html
//导航栏选择高亮并跳转
function highlightPage(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementsByTagName("nav")) return false;
    var nav=document.getElementsByTagName("nav")[0];
    var links=nav.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
        if(window.location.href.indexOf(links[i].getAttribute("href"))!="-1")
            addClass(links[i],"selected");
}
//图片滑动效果
function moveElement(){
    if(!document.getElementById("index")) return false;
    var div=document.createElement("div");
    var img=document.createElement("img");
    var frame=document.createElement("img");
    div.setAttribute("id","container");
    img.setAttribute("src","images/sideshow.jpg");
    img.setAttribute("id","img_con");
    img.setAttribute("alt","");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("id","frame");
    frame.setAttribute("alt","");
    var index=document.getElementById("index");
    index.appendChild(div);
    div.appendChild(img);
    div.appendChild(frame);
    var links=document.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onmouseover=function(){
            if(this.getAttribute("href").indexOf("index.html")!=-1)
                move("img_con",0,0,5);
            if(this.getAttribute("href").indexOf("huodong.html")!=-1)
                move("img_con",-150,0,5);
            if(this.getAttribute("href").indexOf("jineng.html")!=-1)
                move("img_con",-300,0,5);
            if(this.getAttribute("href").indexOf("paihang.html")!=-1)
                move("img_con",-450,0,5);
            if(this.getAttribute("href").indexOf("lianxi.html")!=-1)
                move("img_con",-600,0,5);
        }
    }
}
//活动页面函数huodong.html
//点击展示活动内容效果
function showSection(){
    if(!document.getElementById("huodong")) return false;
    var jq=document.getElementById("huodong");
    var links=jq.getElementsByTagName("a");
    var hide=document.getElementsByClassName("hide");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            var id=this.href.split("#")[1];
            for(var j=0;j<hide.length;j++)
                if(id==hide[j].getAttribute("id")){
                    hide[j].style.display="block";
                }else{
                    hide[j].style.display="none";
                }
        }
    }
}
//技能介绍页面函数 jineng.html
//点击小图片实现大图片替换效果
function showPic(){
    if(!document.getElementById) return false;
    if(!document.getElementById("jineng")) return false;
    var p=document.createElement("p");
    var p_txt=document.createTextNode("选择技能小图片");
    var img=document.createElement("img");
    p.setAttribute("id","des");
    p.appendChild(p_txt);
    img.setAttribute("src","images/placeholder.jpg");
    img.setAttribute("alt","");
    img.setAttribute("id","img_jn");
    var jn=document.getElementById("jineng");
    insertAfter(p,jn);
    insertAfter(img,p);
    var links=jn.getElementsByTagName("a");
    //var img_jn_small=links.getElementsByTagName("img");  //这句话是错的！
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            var title=this.title;
            var href=this.href;
            if(p.firstChild.nodeType==3)
                p.firstChild.nodeValue=title;
            img.setAttribute("src",href);
            return false;
        }
    }
}

// 排行页面函数paihang.html
//列表滑动高亮效果
function highlightRows(){
    if(!document.getElementsByTagName("tr")) return false;
    var tr=document.getElementsByTagName("tr");
    for(var i=1;i<tr.length;i++){
        if(i%2!=0) {addClass(tr[i],"even");}else{addClass(tr[i],"odd");}
        tr[i].oldClassName=tr[i].className;  //创建属性
        tr[i].onmouseover=function(){
            addClass(this,"hover");
        };
        tr[i].onmouseout=function(){
            this.className=this.oldClassName;
        }
    }
}
//列表下新建缩略词解释函数
function displayAbbreviations(){
    var h=document.createElement("h3");
    var h_txt=document.createTextNode("名词解释");
    h.appendChild(h_txt);
    var ph=document.getElementById("paihang");
    ph.appendChild(h);
    var span=ph.getElementsByTagName("span");
    var dl=document.createElement("dl");
    ph.appendChild(dl);
    for(var i=0;i<span.length;i++){
        var title=span[i].getAttribute("title");
        var text=span[i].lastChild.nodeValue;
        var dt=document.createElement("dt");
        var dd=document.createElement("dd");
        var dt_txt=document.createTextNode(text);
        var dd_txt=document.createTextNode(title);
        dt.appendChild(dt_txt);
        dd.appendChild(dd_txt);
        dl.appendChild(dt);
        dl.appendChild(dd);
    }
}

// lianxi页面函数

function focusLabels() {
    if (!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i=0; i<labels.length; i++) {
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function() {
            var id = this.getAttribute("for");
            if (!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}

function resetFields(whichform) {
    if (Modernizr.input.placeholder) return;
    for (var i=0; i<whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        if (!element.getAttribute('placeholder')) continue;
        element.onfocus = function() {
            if (this.value == this.getAttribute('placeholder')) {
                this.value = "";
            }
        }
        element.onblur = function() {
            if (this.value == "") {
                this.value = this.getAttribute('placeholder');
            }
        }
        element.onblur();
    }
}

function validateForm(whichform) {
    for (var i=0; i<whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.getAttribute("required") == 'required') {
            if (!isFilled(element)) {
                alert("Please fill in the "+element.name+" field.");
                return false;
            }
        }
        if (element.getAttribute("type") == 'email') {
            if (!isEmail(element)) {
                alert("The "+element.name+" field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}
function isFilled(field) {
    return (field.value.length > 1 && field.value != field.placeholder);
}

function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function prepareForms() {
    for (var i=0; i<document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function() {
            if (!validateForm(this)) return false;
            var article = document.getElementsByTagName('article')[0];
            if (submitFormWithAjax(this, article)) return false;
            return true;
        }
    }
}
// Ajax函数

function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined")
        XMLHttpRequest = function () {
            try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
            catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
            catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP"); }
            catch (e) {}
            return false;
        }
    return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
    // Remove the existing content.
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    //  Create a loading image.
    var content = document.createElement("img");
    content.setAttribute("src","images/loading.gif");
    content.setAttribute("alt","Loading...");
    // Append the loading element.
    element.appendChild(content);
}

function submitFormWithAjax( whichform, thetarget ) {

    var request = getHTTPObject();
    if (!request) { return false; }

    // Display a loading message.
    displayAjaxLoading(thetarget);

    // Collect the data.
    var dataParts = [];
    var element;
    for (var i=0; i<whichform.elements.length; i++) {
        element = whichform.elements[i];
        dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
    }
    var data = dataParts.join('&');

    request.open('POST', whichform.getAttribute("action"), true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matches.length > 0) {
                    thetarget.innerHTML = matches[1];
                } else {
                    thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
                }
            } else {
                thetarget.innerHTML = '<p>' + request.statusText + '</p>';
            }
        }
    };

    request.send(data);

    return true;
};



// Load events
addLoadEvent(loadEvents);
function loadEvents() {
    // index
    highlightPage();
    moveElement();
    // huodong
    showSection();
    // jineng
    showPic();
    // paihang
    highlightRows();
    displayAbbreviations();
    // lianxi
    focusLabels();
    prepareForms();
}



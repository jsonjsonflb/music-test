function showDiv(obj) {
    let {title,conn,width}=obj;
    title=title ? title:'温馨提示';
    conn=conn ? conn:'';

    var el_dialog = document.createElement("div");  //遮罩层
    el_dialog.setAttribute('class', 'ele_dialog');

    var mandiv = document.createElement("div");   // 最外层
    mandiv.setAttribute('class', 'mandiv');
    width && (mandiv.style.width=width);


    var heddiv = document.createElement("div"); //头部的div
    mandiv.appendChild(heddiv);
    heddiv.setAttribute('class', 'heddiv');
    heddiv.innerHTML = '<span class="el_zt">'+title+'</span>';

    var closediv = document.createElement("button"); //关闭按钮
    heddiv.appendChild(closediv);
    closediv.setAttribute('class', 'closediv');
    closediv.innerText = 'X';

    closediv.addEventListener('click', function () {
        document.body.removeChild(el_dialog);
    });

    var middiv = document.createElement("div");
    middiv.setAttribute('class', 'middiv');
    mandiv.appendChild(middiv);

        middiv.innerHTML=conn;


    var commbtn = document.createElement("button");
    var  commdiv = document.createElement("div");

    commdiv.appendChild(commbtn);
    mandiv.appendChild(commdiv);
    commbtn.innerText = '确认';
    commbtn.setAttribute('class', 'commbtn');
    commdiv.setAttribute('class', 'commdiv');

    commbtn.addEventListener('click', function () {
        document.body.removeChild(el_dialog);
    });


    el_dialog.appendChild(mandiv);
    document.body.appendChild(el_dialog);


}

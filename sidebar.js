//-*- coding: utf-8 -*-


function ajax(opt) {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function () {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }var params = [];
        for (var key in opt.data){
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        }
        else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                opt.success(xmlHttp.responseText);
            }
        };
        // https://blog.csdn.net/Lpandeng/article/details/72399221
    }


function create_contents(div_nav) {

    var div_l = document.createElement('div');
    div_l.innerText = 'contents';
    //div_l.setAttribute("style",'padding-left: 18px');
    div_nav.appendChild(div_l);

    document.querySelectorAll('h2').forEach(function (item) {

        var ul = document.createElement('ul');
        //ul.setAttribute("style",'padding-left: 18px');
        div_l.appendChild(ul);

        var li = document.createElement('li');
        li.setAttribute("class",'active');
        ul.appendChild(li);

        var a = document.createElement('a');
        li.appendChild(a);
        a.setAttribute("href",document.location.href.split('?')[0]+'?id='+item.id);
        a.innerText = item.innerText;
    });
}



function github_filetree (getree, div_nav, filetypes) {

    z_da_t = getree.tree;
    for (var k = 0; k <= z_da_t.length - 1; k++) {
        var pa = z_da_t[k]['path'];
        var type_ = pa.split('.');
        if (filetypes.indexOf(type_[type_.length-1]) > -1) {
            var fles = pa.split('/');
            var this_node = div_nav;
            for (var i = 0; i <= fles.length - 1; i++) {
                var fod_i = this_node.querySelector('ul[folder="'+fles[i]+'"]');

                if (!fod_i) {
                    if (i == fles.length - 1) {
                        var ul = document.createElement('ul');
                        //ul.setAttribute("style",'padding-left: 18px')
                        var li = document.createElement('li');
                        li.setAttribute("class",'active')
                        ul.appendChild(li);
                        var a = document.createElement('a');
                        a.innerText = fles[i];
                        a.setAttribute('href','#/'+pa);

                        li.appendChild(a);
                        this_node.appendChild(ul);

                    }else {
                        var ul = document.createElement('ul');
                        //ul.setAttribute("style",'padding-left: 18px')
                        ul.setAttribute('folder', fles[i]);
                        ul.setAttribute('class', 'active');
                        ul.innerText = fles[i];
                        this_node.appendChild(ul);
                        this_node = ul;
                    }

                }else{
                    this_node = fod_i;
                };

            };
        };
    };

}

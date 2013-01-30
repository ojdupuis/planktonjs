function twodigits(i) {
    if (i.length == 1) {
        i = '0' + i;
    }
    return i;
}
function limit(_x, l) {
    if (_x > l) {
        return l;
    }
    if (_x < -l) {
        return -l;
    }

    return _x;
}
;

/*
 * function collide_rectangle
 * param X,Y point that we want to know collision of
 * param x1,y1,x2,y2 int coordinates that define a rectangle to collide with (or not)
 * return bool : collide or not
 */
function collide_rectangle(X, Y, x1, y1, x2, y2) {
    if (
        ((X >= Math.min(x1, x2)) && (X <= Math.min(x1, x2) + Math.abs(x1 - x2)))
            &&
            ((Y >= Math.min(y1, y2)) && (Y <= Math.min(y1, y2) + Math.abs(y1 - y2)))
            && (X != Math.min(x1, x2))
        ) {
        return true;
    }
    return false;

}

function getViewport() {
    var viewportwidth;
    var viewportheight;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerWidth,
            viewportheight = window.innerHeight
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

    else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0) {
        viewportwidth = document.documentElement.clientWidth,
            viewportheight = document.documentElement.clientHeight
    }

    // older versions of IE

    else {
        viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
            viewportheight = document.getElementsByTagName('body')[0].clientHeight
    }
    return [viewportwidth, viewportheight];
}


function addScript(component, scriptpath) {
    document.write('<script src="component/' + component + '/' + scriptpath + '"></script>');
}

function addExternalLib(component,scriptpath){
    document.write('<script src="external/' + scriptpath + '"></script>');
}

function addCss(component, csspath) {
    document.write('<link type="text/css" href="component/' + component + '/' + csspath + '" rel="stylesheet"/>');
}

function addExternalCss(component, csspath) {
    document.write('<link type="text/css" href="external/' +  csspath + '" rel="stylesheet"/>');
}


function addbutton(id, nom, onclick, moreclass,comment,download) {

    //@TODO comment mettre le nom entre balises a
    var btn=$('<a/>',{
        id: id,
        href: '#',
        class: 'button gray bigrounded '+moreclass,
        title: comment

    })
    btn.html(nom)
    btn.click(onclick)
    //return btn
/*
    var btn=document.createElement('a');
    btn.setAttribute('id',id);
    btn.setAttribute('href',"#");
    btn.setAttribute('class','button gray bigrounded '+moreclass);
    btn.setAttribute('title',comment)
    if (typeof download != 'undefined'){
        btn.setAttribute('download',download)
    }
    btn.innerHTML=nom

    if (onclick != null){
        btn.onclick=onclick;
    }

    btn.innerText=nom;*/

    return btn;
}

function addStablebutton(id, nom, onclick, moreclass) {
    if (onclick != null) {
        return "<a href='#'  id='" + id + "' class='button gray bigrounded" + moreclass + "'  onclick='" + onclick + ";'/>" + nom + "</a>";
    } else {
        return "<a href='#'  id='" + id + "' class='button gray bigrounded" + moreclass + "' />" + nom + "</a>";
    }
}


function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


function codeAngle(angle){
    var code=Math.round(angle/Math.PI*16*16);
    return code.toString(16)
}

function decodeAngle(angle){

    return Math.PI/16/16*angle;
}
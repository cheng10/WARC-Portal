// overridden pywb banner

_wb_js.create_banner_element = function(banner_id)
{

    var banner = document.createElement("wb_div", true);
    banner.setAttribute("id", banner_id);
    banner.setAttribute("lang", "en");


    var text;

    if (wbinfo.is_frame) {
        text = _wb_js.banner_labels.LOADING_MSG;
    } else if (wbinfo.is_live) {
        text = _wb_js.banner_labels.LIVE_MSG;
    } else {
        text = _wb_js.banner_labels.REPLAY_MSG;
    }

    text = "<span id='_wb_label'>" + text + "</span>";

    var capture_str = "";
    if (wbinfo && wbinfo.timestamp) {
        capture_str = _wb_js.ts_to_date(wbinfo.timestamp, true);
    }

    text += "<b id='_wb_capture_info'>" + capture_str + "</b>";

    if (wbinfo.proxy_magic && wbinfo.url) {
        var select_url = wbinfo.proxy_magic + "/" + wbinfo.url;
        var query_url = wbinfo.proxy_magic + "/*/" + wbinfo.url;
        text += '&nbsp;<a href="//query.' + query_url + '">All Capture Times</a>';
        text += '<br/>'
        text += 'From collection <b>"' + wbinfo.coll + '"</b>&nbsp;<a href="//select.' + select_url + '">All Collections</a>';
    }

    banner.innerHTML = text;
    var btn = document.createElement("button");
    btn.className = "button";
    btn.onclick = function(){
        window.history.back();
    };
    var text = document.createTextNode("Go Back");
    btn.appendChild(text);
    banner.appendChild(btn);
    document.body.insertBefore(banner, document.body.firstChild);
}

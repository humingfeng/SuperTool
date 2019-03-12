$(function () {
    $("#btnStr").click(function () {
        var text = $("#txtSourceStr").val();
        var cate = $("#selStrCate").val();
        if (text == "") {
            error("请填写要转换的内容");
        }
        else {
            var arr = text.split(/,|，/);
            if (arr != null && arr.length > 0) {
                var sb = "public class Root";
                sb += "\r\n{";
                var props = [];
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    var name = item;
                    var type = "string";
                    if (/(\w+)\((\w)+\)/.test(item)) {
                        var t = /(\w+)\((\w)+\)/.exec(item);
                        name = t[1]
                        if (cate == "C#") {
                            type = getFieldType(t[2]);
                        }
                        else if (cate == "Java") {
                            type = getJavaFieldType(t[2]);
                        }
                    }
                    if (cate == "C#") {
                        sb += ((i > 0 ? "\r\n" : "") + "\r\n\tpublic " + type + " " + name + " { get; set; }");
                    }
                    else if (cate == "Java") {
                        if (type == "string") {
                            type = "String";
                        }
                        sb += (i > 0 ? "\r\n" : "") + getJavaEntity(type, name);
                        props.push({ "type": type, "name": name });
                    }
                }
                for (var p in props) {
                    sb += getJavaPropEntity(props[p].type, props[p].name);
                }
                sb += "\r\n}";
                $("#txtDestStr").val(sb);
            }
            else {
                error("生成失败，请检查所填字符串是否符合规则");
            }
        }
    });
});
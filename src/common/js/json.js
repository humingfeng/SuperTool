$(function () {
    $("#btnJsonEntity").click(function () {
        var text = $("#txtSourceJsonEntity").val();
        var cate = $("#selJsonCate").val();
        if (text == "") {
            error("请填写要转换的JSON");
        }
        else {
            try {
                var obj = eval("(" + text + ")");
                if (cate == "C#") {
                    var sb = extractJson("Root", obj);
                    while (jsonChilds != null && jsonChilds.length > 0) {
                        var item = jsonChilds.pop();
                        sb += "\r\n\r\n" + extractJson(item.name, item.value);
                    }
                    $("#txtDestJsonEntity").val(sb);
                }
                else if (cate == "Java") {
                    var sb = extractJavaJson("Root", obj);
                    while (jsonChilds != null && jsonChilds.length > 0) {
                        var item = jsonChilds.pop();
                        sb += "\r\n\r\n" + extractJavaJson(item.name, item.value);
                    }
                    $("#txtDestJsonEntity").val(sb);
                }
            }
            catch (e) {
                error("json格式错误，请检查。" + e.message);
            }
        }
    });
});
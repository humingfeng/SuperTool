export var jsonChilds = [];
export function getFieldType(t) {
    var slt = "string";
    switch (t) {
        case "i":
            slt = "int";
            break;
        case "s":
            slt = "string";
            break;
        case "d":
            slt = "DateTime";
            break;
        case "b":
            slt = "bool";
            break;
    }
    return slt;
}

export function getJavaFieldType(t) {
    var slt = "String";
    switch (t) {
        case "i":
            slt = "int";
            break;
        case "s":
            slt = "String";
            break;
        case "d":
            slt = "Date";
            break;
        case "b":
            slt = "boolean";
            break;
    }
    return slt;
}

// json转实体
export function extractJson(title, obj) {
    var sb = "public class " + title;
    sb += "\r\n{";
    var i = 0;
    for (var name in obj) {
        var val = obj[name];
        var type = typeof (val);
        if (val == null || type == "number" || type == "string" || type == "boolean") {
            if (type == "number") {
                type = "int";
            }
            if (type == "boolean") {
                type = "bool";
            }
            if (type == "object") {
                type = "string";
            }
            sb += (i > 0 ? "\r\n" : "") + "\r\n\tpublic " + type + " " + name + " { get; set; }";
        }
        else {
            if (val.length == undefined) {
                sb += (i > 0 ? "\r\n" : "") + "\r\n\tpublic " + name + " " + name + " { get; set; }";
                jsonChilds.push({ "name": name, "value": val });
            }
            else {
                if (val[0].toString() != "[object Object]") {
                    sb += (i > 0 ? "\r\n" : "") + "\r\n\tpublic List<string> " + name + " { get; set; }";
                }
                else {
                    sb += (i > 0 ? "\r\n" : "") + "\r\n\tpublic List<" + name + "> " + name + " { get; set; }";
                    jsonChilds.push({ "name": name, "value": val[0] });
                }
            }
        }
        i++;
    }
    sb += "\r\n}";
    return sb;
}

export function extractJavaJson(title, obj) {
    var sb = "public class " + title;
    sb += "\r\n{";
    var i = 0;
    var props = [];
    for (var name in obj) {
        var val = obj[name];
        var type = typeof (val);
        if (val == null || type == "number" || type == "string" || type == "boolean") {
            if (type == "number") {
                type = "int";
            }
            if (type == "string" || type == "object") {
                type = "String";
            }
            if (type == "boolean") {
                type = "bool";
            }
            sb += (i > 0 ? "\r\n" : "") + getJavaEntity(type, name);
            props.push({ "type": type, "name": name });
        }
        else {
            if (val.length == undefined) {
                sb += (i > 0 ? "\r\n" : "") + getJavaEntity(name, name);
                props.push({ "type": name, "name": name });
                jsonChilds.push({ "name": name, "value": val });
            }
            else {
                if (val[0].toString() != "[object Object]") {
                    sb += (i > 0 ? "\r\n" : "") + getJavaEntity("List<String>", name);
                    props.push({ "type": "List<String>", "name": name });
                }
                else {
                    sb += (i > 0 ? "\r\n" : "") + getJavaEntity("List<" + name + ">", name);
                    props.push({ "type": "List<" + name + ">", "name": name });
                    jsonChilds.push({ "name": name, "value": val[0] });

                }
            }
        }
        i++;
    }
    for (var p in props) {
        sb += getJavaPropEntity(props[p].type, props[p].name);
    }
    sb += "\r\n}";
    return sb;
}

export function getJavaEntity(type, name) {
    var sb = "";
    sb += "\r\n\tprivate " + type + " " + name.toLowerCase() + ";";
    return sb;
}

export function getJavaPropEntity(type, name) {
    var sb = "";
    name = nameCase(name);
    sb += "\r\n\r\n\tpublic " + type + " get" + name + "(){";
    sb += "\r\n\t\treturn this." + name.toLowerCase() + ";";
    sb += "\r\n\t}";
    sb += "\r\n\tpublic void set" + name + "(" + type + " " + name.toLowerCase() + "){";
    sb += "\r\n\t\tthis." + name.toLowerCase() + " = " + name.toLowerCase() + ";";
    sb += "\r\n\t}";
    return sb;
}

export function nameCase(name) {
    var str = "";
    for (var i = 0; i < name.length; i++) {
        if (i == 0) {
            str += name[i].toUpperCase();
        }
        else {
            str += name[i].toLowerCase();
        }
    }
    return str;
}

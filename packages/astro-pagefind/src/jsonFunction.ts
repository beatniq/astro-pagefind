export const JsonStringify = (obj: any) => {
  return JSON.stringify(obj, (_, value) => {
    var fnBody;
    if (value instanceof Function || typeof value == 'function') {
      fnBody = value.toString();
      if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') { //this is ES6 Arrow Function
        return '_NuFrRa_' + fnBody;
      }
      return fnBody;
    }
    if (value instanceof RegExp) {
      return '_PxEgEr_' + value;
    }
    return value;
  });
};

export const JsonParse = (str: string, date2obj: boolean) => {
  var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;
  return JSON.parse(str, function (_, value) {
    var prefix;

    if (typeof value != 'string') {
      return value;
    }
    if (value.length < 8) {
      return value;
    }

    prefix = value.substring(0, 8);

    if (iso8061 && value.match(iso8061 as RegExp)) {
      return new Date(value);
    }
    if (prefix === 'function') {
      return eval('(' + value + ')');
    }
    if (prefix === '_PxEgEr_') {
      return eval(value.slice(8));
    }
    if (prefix === '_NuFrRa_') {
      return eval(value.slice(8));
    }

    return value;
  });
};

const utils = {}
utils.zh = {
    week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
}
utils.diff = (date) => {
    const unix = utils._date.getTime() / 1000
    const _temp = new Date(date)
    const _temp_unix = _temp.getTime() / 1000
    let diff = _temp_unix - unix
    const day = 86400
    const res = {
        day: Math.floor(diff / day)
    }
    res['year'] = Math.floor(res.day / 366)
    res['month'] = Math.floor((res.day - (res.year * 366)) / utils.lastday())
    const month = utils._date.getMonth() + 1
    let range = 0
    if (res.month) {
        for (let i = month; i < month + res.month; i++) {
            range += i % 2 ? 31 : 30
        }
    }
    res.day = res.day - (res.year * 366)-range
    diff = diff % 86400;
    res['hour'] = Math.floor((diff / 3600))
    diff %= 3600;
    res['minute'] = Math.floor((diff / 60))
    res['second'] = Math.floor(diff % 60)
    console.log(res)
}
utils.lastday = () => {
    const _temp = new Date(utils._date)
    _temp.setMonth(_temp.getMonth() + 1)
    _temp.setDate(0)
    return _temp.getDate()
}
utils.lang = (target, lang = 'zh') => {
    return utils[lang]['week'][utils._week - 1]
}
utils.week = function () {
    utils._week = utils._date.getDay()
    return this;
}

function DateProxy(str) {
    const output = {date: str}
    return new Proxy(output, {
        get(target, name) {
            return utils[name]
        }
    })
}

function date(option) {
    const keyword = {Y: 'getFullYear', m: 'getMonth', d: 'getDate', H: 'getHours', i: 'getMinutes', s: 'getSeconds'}
    const _date = new Date()
    _date.setMonth(_date.getMonth() + 1)
    utils._date = new Date()
    for (let key in keyword) {
        const _item = keyword[key]
        let _fn = _date[_item]
        if ('function' === typeof _fn) {
            let _val = _date[_item]()
            option = option.replace(key, _val)
        }
    }
    return new DateProxy(option);
}

let b = date("Y-m-d H:i:s")
console.log(b.diff('2020-7-15 23:40:30'))

const hideText = {
    beforeMount(el, {
            modifiers
        }) {
        //设置默认值为name
        Object.keys(modifiers).length === 0 && (modifiers.name = true);
        if (modifiers.mobile) {
            // 手机号码
            el.innerText = el.innerText.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2');
        } else if (modifiers.name) {
            // 姓名 两个字隐藏后一个，两个字以上隐藏中间
            el.innerText = el.innerText.length > 2 ? el.innerText.replace(/^(\S{1})\S+(\S{1})/, '$1*$2') : el.innerText.substring(0, 1) + '*';
        } else if (modifiers.idcard) {
            //身份证
            el.innerText = el.innerText.replace(/^(\d{6})\d+(\d{4})$/, '$1********$2');
        }
    }
};
export default hideText

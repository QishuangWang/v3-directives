const formatText = {
    beforeMount(el, binding) {
        let { value = ',', arg = 3, modifiers } = binding;
        if (modifiers.money) {
            // 金额
            el.innerText = el.innerText.replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, value));
        } else {
            // 普通字符串
            let regText = '\\B(?=(\\w{' + arg + '})+(?!\\w))';
            let reg = new RegExp(regText, 'g');
            el.innerText = el.innerText.replace(reg, value);
        }
    }
};
export default formatText

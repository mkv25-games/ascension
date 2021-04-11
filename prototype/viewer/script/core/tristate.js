function tristate($) {
    return $ < 0 ? '-' : $ > 0 ? '+' : '0';
}

function tristateValue($) {
    return $ < 0 ? -1 : $ > 0 ? 1 : 0;
}

function tristateDecode($) {
    return {
        '-': -1,
        '0': 0,
        '+': 1
    }[$];
}
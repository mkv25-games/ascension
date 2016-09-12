function tristate($) {
    return $ < 0 ? '-' : $ > 0 ? '+' : '0';
}

function tristateDecode($) {
    return {
        '-': -1,
        '0': 0,
        '+': 1
    }[$];
}
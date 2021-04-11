$(function() {
    var items = {{json navigationItems}};

    $navigation = $('navigation');
    items.forEach(function(item) {
        $item = $('<a href="' + item.href + '">' + item.text + '</a>');
        $navigation.append($item);
    });
});
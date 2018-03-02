$(this).append(
    $('<input>', {
        type: 'text',
        val: $('#div1').text(),
        
    })
    
);

console.log(this);
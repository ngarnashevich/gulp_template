function focusAnimation() {
    //form animation
    $('.floating-label').on('click', function(){
            $(this).prev().trigger('focus')
    });

    $(document).on('focus', '.form-input, .form-textarea', function(){
    $(this).next().animate({'font-size': '10px', 'top': '0px'})
    });

    $(document).on('focusout', '.form-input, .form-textarea', function(){
     if($(this).val() == "") {
        $(this).next().animate({'font-size': '16px', 'top': '13px' })
        }
    });
}

focusAnimation();

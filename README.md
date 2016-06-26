endless.js
==========

Remark : If the v2.2.0 doesn't work correctly, use v2.1.0
--
These versions are identical. The v2.2.0 is just an alternative about working (more optimized) but could give some problems depending web browsers.

    $(document).ready(function(){
        $(document).endless();
    });
    
It encapsulates automatically the target's content in div block. Your HTML page is infinity scrollable.
    
optional parameters
==========

    direction   //scroll direction ('up','down','left','right','vertical','horizontal')
    scrollbar   //hide or show the scrollbar ('enable','disable')
    append      //function running when you are arrived at the end and content appeared
    prepend     //function running when you are arrived at the beginning and content appeared
    n_append    //function running when you can't see the first content
    n_prepend   //function running when you can't see the second content
    
default values
==============
    
    $('myElement').endless({
        direction:'down',
        append:function(){},
        prepend:function(){},
        n_append:function(){},
        n_prepend:function(){}
    });
    
    the scrollbar parameter default value depends of your CSS style
    
others functions included
========================

    $('myElement').scrollBottom(); //return scroll bottom position ( scrollTop() inverted )
    $('myElement').scrollRight(); //return scroll right position ( scrollLeft() inverted )
    

See a demonstration here : http://totodunet.github.io/endless/

If you're interested, thanks to fork me or/and contribute to the development of endless.js!

published under the MIT License (http://opensource.org/licenses/MIT)

Totodunet,
http://totodu.net/

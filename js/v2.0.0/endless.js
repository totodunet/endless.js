/* 

	  jQuery plugin endless.js
	  
	  This plugin allows to join the top with the bottom or the left with the right of a HTML container.
	  Useful to do websites designed in cycle!
	  
	  Needs the jQuery library. You can download it here : http://www.jquery.com/
	  
	  @author 	totodunet
	  @date		August 14, 2014
	  @version	2.0.0
	  
	  @website	http://totodu.net/
	  
	  @license
	  The MIT License (MIT)

		Copyright (c) 2014 - Totodunet (www.totodu.net)

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in
		all copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
		THE SOFTWARE.
	  	  
*/

(function($)
{

	//Function scrollBottom() -> inverted scrollTop() function
	
	$.fn.scrollBottom=function(){
		if($(this).is(document))
			return $(this).height()-$(this).scrollTop()-$(window).height();
		else
			return $(this).prop('scrollHeight')-$(this).prop('offsetHeight')-$(this).scrollTop();
	}
	
	//Function scrollRight() -> inverted scrollLeft() function
	
	$.fn.scrollRight=function(){
		if($(this).is(document))
			return $(this).width()-$(this).scrollLeft()-$(window).width();
		else{
			return $(this).prop('scrollWidth')-$(this).prop('offsetWidth')-$(this).scrollLeft();
		}
	}
	
	$.fn.endless=function(options){
	
		//null function
		var nothing=function(){};
	
		//Default values
		var defaults={
			direction:'down',
			append:nothing,
			prepend:nothing,
			n_append:nothing,
			n_prepend:nothing
		};
		
		//Settings
		var settings=$.extend(defaults,options);
	
		//Variables used
		var high=$(this).height();
		var width=$(this).width();
		var content;
		var top_position=$(this).scrollTop();
		var left_position;
		
		//if the object is document => change variables + encapsulate in element's html div
		if($(this).is(document)){
			left_position=$(this).scrollLeft();
			content='<div class="endless">'+$('body').html()+'</div>';
			$('body').html(content);
		}
		else{
			left_position=$(this).parent().scrollLeft();
			content='<div class="endless">'+$(this).html()+'</div>';
			$(this).html(content);
		}
		
		//Enable-Disable the scrollbar
		if(settings.scrollbar&&(settings.scrollbar=='enable'||settings.scrollbar=='disable')){
			if(settings.scrollbar=='disable'){
				if(settings.direction=='down'||settings.direction=='up'||settings.direction=='vertical'){
					if($(this).is(document))
						$('body').css('overflow-y','hidden');
					else
						$(this).css('overflow-y','hidden');
				}
				else{
					if($(this).is(document))
						$('body').css('overflow-x','hidden');
					else
						$(this).parent().css('overflow-x','hidden');
				}
			}
			else{
				if(settings.direction=='right'||settings.direction=='left'||settings.direction=='horizontal'){
					if($(this).is(document))
						$('body').css('overflow-y','scroll');
					else
						$(this).css('overflow-y','scroll');
				}
				else{
					if($(this).is(document))
						$('body').css('overflow-x','scroll');
					else
						$(this).parent().css('overflow-x','scroll');
				}
			}
		}

		//Scroll direction
		
		//Boolean variables
		var append=false;
		var prepend=false;
		
		/* <!--------------------------------------- UP AND DOWN ----------------------------------------------------> */
		
		//Down
		
		if(settings.direction=='down'){
		
			$(this).scroll(function(){
				//Scroll down
				if(top_position<$(this).scrollTop()){
					top_position=$(this).scrollTop();
					if($(this).scrollBottom()==0){
						if($(this).is(document))
							$('body').append(content);
						else
							$(this).append(content);
						$(this).scrollTop(top_position);
						append=true;
						settings.append.call();
					}
					else if($(this).scrollTop()>=high){
						if($(this).is(document))
							$('body').html(content);
						else
							$(this).html(content);
						$(this).scrollTop(1);
						top_position=1;
						append=false;
						settings.n_prepend.call();
					}
				}
				else if(append){
					if($(this).scrollBottom()>=high){
						if($(this).is(document)){
							$('body').html(content);
							$(this).scrollTop(high-$(window).height()-1);
							top_position=$(this).scrollTop();
						}
						else{
							$(this).html(content);
							$(this).scrollTop(high-1);
							top_position=high-1;
						}
						append=false;
						settings.n_prepend.call();
					}
				}
			});
		}
		
		//Up
		
		else if(settings.direction=='up'){
			$(this).scroll(function(){
				if (top_position>=$(this).scrollTop()){
					top_position=$(this).scrollTop();
					if($(this).scrollTop()==0){
						if($(this).is(document))
							$('body').prepend(content);
						else
							$(this).prepend(content);
						$(this).scrollTop(high);
						top_position=$(this).scrollTop();
						prepend=true;
						settings.prepend.call();
					}
					else if($(this).scrollBottom()>=high){
						if($(this).is(document)){
							$('body').html(content);
							$(this).scrollTop(high-$(window).height()-1);
							top_position=$(this).scrollTop();
						}
						else{
							$(this).html(content);
							$(this).scrollTop(high-1);
							top_position=high-1;
						}
						prepend=false;
						settings.n_append.call();
					}
				}
				else if(prepend){
						if($(this).scrollTop()>=high){
							if($(this).is(document))
								$('body').html(content);
							else
								$(this).html(content);
							$(this).scrollTop(1);
							top_position=1;
							prepend=false;
							settings.n_append.call();
						}
				}
			});
		}
		
		//Up and Down (Vertical)
		
		else if(settings.direction=='vertical'){
		
			$(this).scroll(function(){
				//Scroll down
				if(top_position<$(this).scrollTop()){
					top_position=$(this).scrollTop();
					if($(this).scrollBottom()==0){
						if($(this).is(document))
							$('body').append(content);
						else
							$(this).append(content);
						$(this).scrollTop(top_position);
						append=true;
						settings.append.call();
					}
					else if($(this).scrollTop()>=high){
						if($(this).is(document))
							$('body').html(content);
						else
							$(this).html(content);
						$(this).scrollTop(1);
						top_position=1;
						prepend=false;
						settings.n_prepend.call();
					}
				}
				//Scroll up
				else if(top_position>=$(this).scrollTop()){
					top_position=$(this).scrollTop();
					if($(this).scrollTop()==0){
						if($(this).is(document))
							$('body').prepend(content);
						else
							$(this).prepend(content);
						$(this).scrollTop(high);
						top_position=$(this).scrollTop();
						prepend=true;
						settings.prepend.call();
					}
					else if($(this).scrollBottom()>=high){
						if($(this).is(document)){
							$('body').html(content);
							$(this).scrollTop(high-$(window).height()-1);
							top_position=$(this).scrollTop();
						}
						else{
							$(this).html(content);
							$(this).scrollTop(high-1);
							top_position=high-1;
						}
						append=false;
						settings.n_append.call();
					}
				}
			});
		}
		
		/* <!--------------------------------------- LEFT AND RIGHT ----------------------------------------------------> */
		
		//Right
		
		if(settings.direction=='right'){
			//if the object is document
			if($(this).is(document)){
				$(this).scroll(function(){
					//Scroll right
					if(left_position<$(this).scrollLeft()){
						left_position=$(this).scrollLeft();
						if($(this).scrollRight()==0){
							$('body').css('width',$('body').width()*2);
							$('body').children('.endless').css('float','left');
							$('body').append(content);
							$('body').children('.endless:nth-child(2)').css('float','right');
							$(this).scrollLeft(left_position);
							append=true;
							settings.append.call();
						}
						else if($(this).scrollLeft()>=width){
							$('body').html(content);
							$('body').css('width',$('body').width()/2);
							$(this).scrollLeft(1);
							left_position=1;
							append=false;
							settings.n_prepend.call();
						}
					}
					else if(append){
						if($(this).scrollRight()>=width){
							$('body').html(content);
							$('body').css('width',$('body').width()/2);
							$(this).scrollLeft(width-$(window).width()-1);
							left_position=$(this).scrollLeft();
							append=false;
							settings.n_prepend.call();
						}
					}
				});
			}
			//else -> take the parent for scroll position
			else{
				$(this).parent().scroll(function(){
					//Scroll right
					if(left_position<$(this).scrollLeft()){
						left_position=$(this).scrollLeft();
						if($(this).scrollRight()==0){
							$(this).children().css('width',$(this).children().children('.endless').width()*2);
							$(this).children().children('.endless').css('float','left');
							$(this).children().append(content);
							$(this).children().children('.endless:nth-child(2)').css('float','right');
							$(this).scrollLeft(left_position);
							append=true;
							settings.append.call();
						}
						else if($(this).scrollLeft()>=width){
							$(this).children().html(content);
							$(this).children().css('width',$(this).children().width()/2);
							$(this).scrollLeft(1);
							left_position=1;
							append=false;
							settings.n_prepend.call();
						}
					}
					else if(append){
						if($(this).scrollRight()>=0){
							$(this).children().html(content);
							$(this).children().css('width',$(this).children().children('.endless').width());
							$(this).scrollLeft(width-1);
							left_position=width-1;
							append=false;
							settings.n_prepend.call();
						}
					}
				});
			}
		}
		
		//Left
		
		else if(settings.direction=='left'){
			//if the object is document
			if($(this).is(document)){
				$(this).scroll(function(){
					//Scroll left
					if(left_position>=$(this).scrollLeft()){
						left_position=$(this).scrollLeft();
						if($(this).scrollLeft()==0){
							$('body').css('width',$('body').width()*2);
							$('body').children('.endless').css('float','right');
							$('body').prepend(content);
							$('body').children('.endless:first-child').css('float','left');
							$(this).scrollLeft(width);
							left_position=$(this).scrollLeft();
							prepend=true;
							settings.prepend.call();
						}
						else if($(this).scrollRight()>=width){
							$('body').html(content);
							$('body').css('width',$('body').width()/2);
							$(this).scrollLeft(width-$(window).width()-1);
							left_position=$(this).scrollLeft();
							prepend=false;
							settings.n_append.call();
						}
					}
					else if(prepend){
							if($(this).scrollLeft()>=width){
								$('body').html(content);
								$('body').css('width',$('body').width()/2);
								$(this).scrollLeft(1);
								left_position=1;
								prepend=false;
								settings.n_append.call();
							}
					}
				});
			}
			//else -> take the parent for scroll position
			else{
				$(this).parent().scroll(function(){
					//Scroll left
					if(left_position>=$(this).scrollLeft()){
						left_position=$(this).scrollLeft();
						if($(this).scrollLeft()==0){
							$(this).children().css('width',$(this).children().width()*2);
							$(this).children().children('.endless').css('float','right');
							$(this).children().prepend(content);
							$(this).children().children('.endless:first-child').css('float','left');
							$(this).scrollLeft(width);
							left_position=$(this).scrollLeft();
							prepend=true;
							settings.prepend.call();
						}
						else if($(this).scrollRight()>=width){
							$(this).children().html(content);
							$(this).children().css('width',$(this).children().width()/2);
							$(this).scrollLeft(width-1);
							left_position=width-1;
							prepend=false;
							settings.n_append.call();
						}
					}
					else if(prepend){
							if($(this).scrollLeft()>=width){
								$(this).children().html(content);
								$(this).children().css('width',$(this).children().width()/2);
								$(this).scrollLeft(1);
								left_position=1;
								prepend=false;
								settings.n_append.call();
							}
					}
				});
			}
		}
		
		//Left and Right (Horizontal)
		
		else if(settings.direction=='horizontal'){
			//if the object is document
			if($(this).is(document)){
				$(this).scroll(function(){
					//Scroll right
					if(left_position<$(this).scrollLeft()){
						left_position=$(this).scrollLeft();
						if($(this).scrollRight()==0){
							$('body').css('width',$('body').width()*2);
							$('body').children('.endless').css('float','left');
							$('body').append(content);
							$('body').children('.endless:nth-child(2)').css('float','right');
							$(this).scrollLeft(left_position);
							append=true;
							settings.append.call();
						}
						else if($(this).scrollLeft()>=width){
							$('body').html(content);
							$('body').css('width',$('body').width()/2);
							$(this).scrollLeft(1);
							left_position=1;
							prepend=false;
							settings.n_prepend.call();
						}
					}
					//Scroll left
					else if(left_position>=$(this).scrollLeft()){
						left_position=$(this).scrollLeft();
						if($(this).scrollLeft()==0){
							$('body').css('width',$('body').width()*2);
							$('body').children('.endless').css('float','right');
							$('body').prepend(content);
							$('body').children('.endless:first-child').css('float','left');
							$(this).scrollLeft(width);
							left_position=$(this).scrollLeft();
							prepend=true;
							settings.prepend.call();
						}
						else if($(this).scrollRight()>=width){
							$('body').html(content);
							$('body').css('width',$('body').width()/2);
							$(this).scrollLeft(width-$(window).width()-1);
							left_position=$(this).scrollLeft();
							append=false;
							settings.n_append.call();
						}
					}
				});
			}
			//else -> take the parent for scroll position 
			else{
				$(this).parent().scroll(function(){
					//Scroll right
					if(left_position<$(this).scrollLeft()){
						left_position=$(this).scrollLeft();
						if($(this).scrollRight()==0){
							$(this).children().css('width',$(this).children().width()*2);
							$(this).children().children('.endless').css('float','left');
							$(this).children().append(content);
							$(this).children().children('.endless:nth-child(2)').css('float','right');
							$(this).scrollLeft(left_position);
							append=true;
							settings.append.call();
						}
						else if($(this).scrollLeft()>=width){
							$(this).children().html(content);
							$(this).children().css('width',$(this).children().width()/2);
							$(this).scrollLeft(1);
							left_position=1;
							prepend=false;
							settings.n_prepend.call();
						}
					}
					//Scroll left
					else if(left_position>=$(this).scrollLeft()){
						left_position=$(this).scrollLeft();
						if($(this).scrollLeft()==0){
							$(this).children().css('width',$(this).children().width()*2);
							$(this).children().children('.endless').css('float','right');
							$(this).children().prepend(content);
							$(this).children().children('.endless:first-child').css('float','left');
							$(this).scrollLeft(width);
							left_position=$(this).scrollLeft();
							prepend=true;
							settings.prepend.call();
						}
						else if($(this).scrollRight()>=width){
							$(this).children().html(content);
							$(this).children().css('width',$(this).children().width()/2); 
							$(this).scrollLeft(width-1);
							left_position=width-1;
							append=false;
							settings.n_append.call();
						}
					}
				});
			}
		}
		
		return this;
		
	}
})(jQuery);

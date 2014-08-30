/* 

	  jQuery plugin endless.js
	  
	  This plugin allows to join the top with the bottom or the left with the right of a HTML container.
	  Useful to do websites designed in cycle!
	  
	  Needs the jQuery library. You can download it here : http://www.jquery.com/
	  
	  @author 	totodunet
	  @date		May 13, 2014
	  @version	1.0.0
	  
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
	
		//Settings
		var settings=$.extend(defaults,options);
	
		//Variables used
		var high=$(this).height();
		var content;
		var top_position=$(this).scrollTop();
		
		//if the object is document => change variables + encapsulate in element's html div
		if($(this).is(document)){
			content='<div class="endless">'+$('body').html()+'</div>';
			$('body').html(content);
		}
		else{
			content='<div class="endless">'+$(this).html()+'</div>';
			$(this).html(content);
		}
		
		//Enable-Disable the scrollbar
		if(settings.scrollbar&&(settings.scrollbar=='enable'||settings.scrollbar=='disable')){
			if(settings.scrollbar=='disable'){
				if($(this).is(document))
					$('body').css('overflow','hidden');
				else
					$(this).css('overflow','hidden');
			}
			else{
				if($(this).is(document))
					$('body').css('overflow-y','scroll');
				else
					$(this).css('overflow-y','scroll');
			}
		}

		//Scroll direction
		
		//Boolean variables
		var append=false;
		var prepend=false;
		
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
		
		return this;
		
	}
})(jQuery);

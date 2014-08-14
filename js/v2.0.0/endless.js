/* 

	  Plugin jQuery endless.js
	  
	  This plugin allows to join the top with the bottom of a HTML container.
	  Useful to do websites designed in cycle!
	  
	  Needs the jQuery library. You can download it here : http://www.jquery.com/
	  
	  @author 	totodunet
	  @date		August 14, 2014
	  @version	2.0.0
	  
	  @site		http://totodu.net/
	  	  
*/

(function($)
{

	//Function scrollBottom() -> inverted scrollTop() function
	
	$.fn.scrollBottom=function(){
		if($(this).is(document))
			return $(this).height()-(this.scrollTop()+$(window).height());
		else
			return $(this).height()-($(this).prop('scrollHeight')-$(this).scrollTop());
	}
	
	//Function scrollRight() -> inverted scrollLeft() function
	
	$.fn.scrollRight=function(){
		if($(this).is(document))
			return $(this).width()-(this.scrollLeft()+$(window).width());
		else
			return $(this).width()-($(this).prop('scrollWidth')-$(this).scrollLeft());
	}
	
	$.fn.endless=function(options){
	
		//Default values
		var defaults={
			element:$(this),
			direction:'down',
			append:nothing,
			prepend:nothing,
			l_append:nothing,
			l_prepend:nothing,
			n_append:nothing,
			n_prepend:nothing,
			nl_append:nothing,
			nl_prepend:nothing
		};
		
		//Settings
		var settings=$.extend(defaults,options);
	
		//Variables used
		var high=$(this).prop('scrollHeight');
		var width=$(this).prop('scrollWidth');
		var content='<div class="endless">'+settings.element.html()+'</div>';
		var top_position=$(this).scrollTop();
		var left_position=$(this).scrollLeft();
		var nothing=function(){};
		
		//if the object is document => change variables
		if($(this).is(document)){
			high=$(this).height();
			width=$(this).width();
		}
		if(settings.element.is(document))
			content='<div class="endless">'+$('body').html()+'</div>';
		
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
		
			$(this).scroll(function(){
				//Scroll right
				if(left_position<$(this).scrollLeft()){
					left_position=$(this).scrollLeft();
					if($(this).scrollRight()==0){
						if($(this).is(document))
							$('body').append(content);
						else
							$(this).append(content);
						$(this).scrollLeft(left_position);
						append=true;
						settings.l_append.call();
					}
					else if($(this).scrollLeft()>=width){
						if($(this).is(document))
							$('body').html(content);
						else
							$(this).html(content);
						$(this).scrollLeft(1);
						left_position=1;
					}
				}
				else if(append){
					if($(this).scrollRight()>=width){
						if($(this).is(document)){
							$('body').html(content);
							$(this).scrollLeft(width-$(window).width()-1);
							left_position=$(this).scrollLeft();
						}
						else{
							$(this).html(content);
							$(this).scrollLeft(width-1);
							left_position=width-1;
						}
						append=false;
						settings.nl_prepend.call();
					}
				}
			});
		}
		
		//Left
		
		else if(settings.direction=='left'){
			$(this).scroll(function(){
				if (left_position>=$(this).scrollLeft()){
					left_position=$(this).scrollLeft();
					if($(this).scrollLeft()==0){
						if($(this).is(document))
							$('body').prepend(content);
						else
							$(this).prepend(content);
						$(this).scrollLeft(width);
						left_position=$(this).scrollLeft();
						prepend=true;
						settings.l_prepend.call();
					}
					else if($(this).scrollRight()>=width){
						if($(this).is(document)){
							$('body').html(content);
							$(this).scrollLeft(width-$(window).width()-1);
							left_position=$(this).scrollLeft();
						}
						else{
							$(this).html(content);
							$(this).scrollLeft(width-1);
							left_position=width-1;
						}
					}
				}
				else if(prepend){
						if($(this).scrollLeft()>=width){
							if($(this).is(document))
								$('body').html(content);
							else
								$(this).html(content);
							$(this).scrollLeft(1);
							left_position=1;
							prepend=false;
							settings.nl_append.call();
						}
				}
			});
		}
		
		//Left and Right (Horizontal)
		
		else if(settings.direction=='horizontal'){
		
			$(this).scroll(function(){
				//Scroll right
				if(left_position<$(this).scrollLeft()){
					left_position=$(this).scrollLeft();
					if($(this).scrollRight()==0){
						if($(this).is(document))
							$('body').append(content);
						else
							$(this).append(content);
						$(this).scrollLeft(left_position);
						append=true;
						settings.l_append.call();
					}
					else if($(this).scrollLeft()>=width){
						if($(this).is(document))
							$('body').html(content);
						else
							$(this).html(content);
						$(this).scrollLeft(1);
						left_position=1;
						prepend=false;
						settings.nl_prepend.call();
					}
				}
				//Scroll left
				else if(left_position>=$(this).scrollLeft()){
					left_position=$(this).scrollLeft();
					if($(this).scrollLeft()==0){
						if($(this).is(document))
							$('body').prepend(content);
						else
							$(this).prepend(content);
						$(this).scrollLeft(width);
						left_position=$(this).scrollLeft();
						prepend=true;
						settings.l_prepend.call();
					}
					else if($(this).scrollRight()>=width){
						if($(this).is(document)){
							$('body').html(content);
							$(this).scrollLeft(width-$(window).width()-1);
							left_position=$(this).scrollLeft();
						}
						else{
							$(this).html(content);
							$(this).scrollLeft(width-1);
							left_position=width-1;
						}
						append=false;
						settings.nl_append.call();
					}
				}
			});
		}
		
	}
})(jQuery);
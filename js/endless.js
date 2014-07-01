/* 

	  Plugin jQuery endless.js
	  
	  This plugin allows to join the top with the bottom of a HTML container.
	  Useful to do websites designed in cycle!
	  
	  Needs the jQuery library. You can download it here : http://www.jquery.com/
	  
	  @author 	totodunet
	  @date		May 13, 2014
	  @version	1.0.0
	  
	  @site		http://totodu.net/
	  	  
*/

(function($)
{
	$.fn.scrollBottom=function(){
		if($(this).is(document))
			return $(this).height()-(this.scrollTop()+$(window).height());
		else
			return $(this).height()-($(this).prop('scrollHeight')-$(this).scrollTop());
	}
	
	$.fn.endless=function(options){
	
		//Variables used
		var high=$(this).prop('scrollHeight');
		var content=$(this).html();
		var position=$(this).scrollTop();
		
		//if the object is document => change variables
		if($(this).is(document))
			high=$(this).height();
		if($(this).is(document))
			content=$('body').html();
		
		//Default values
		var defaults={
			direction:'down',
			append:function(){},
			prepend:function(){}
		};
		
		//Settings
		var settings=$.extend(defaults,options);
		
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
				if(position<$(this).scrollTop()){
					position=$(this).scrollTop();
					if($(this).scrollBottom()==0){
						if($(this).is(document))
							$('body').append(content);
						else
							$(this).append(content);
						$(this).scrollTop(position);
						append=true;
						settings.append.call();
					}
					else if($(this).scrollTop()>=high){
						if($(this).is(document))
							$('body').html(content);
						else
							$(this).html(content);
						$(this).scrollTop(1);
						position=1;
					}
				}
				else if(append){
					if($(this).scrollBottom()>=high){
						if($(this).is(document)){
							$('body').html(content);
							$(this).scrollTop(high-$(window).height()-1);
							position=$(this).scrollTop();
						}
						else{
							$(this).html(content);
							$(this).scrollTop(high-1);
							position=high-1;
						}
						append=false;
					}
				}
			});
		}
		
		//Up and Down (Duo)
		else if(settings.direction=='duo'){
		
			$(this).scroll(function(){
				//Scroll down
				if(position<$(this).scrollTop()){
					position=$(this).scrollTop();
					if($(this).scrollBottom()==0){
						if($(this).is(document))
							$('body').append(content);
						else
							$(this).append(content);
						$(this).scrollTop(position);
						append=true;
						settings.append.call();
					}
					else if($(this).scrollTop()>=high){
						if($(this).is(document))
							$('body').html(content);
						else
							$(this).html(content);
						$(this).scrollTop(1);
						position=1;
						prepend=false;
					}
				}
				//Scroll up
				else if(position>=$(this).scrollTop()){
					position=$(this).scrollTop();
					if($(this).scrollTop()==0){
						if($(this).is(document))
							$('body').prepend(content);
						else
							$(this).prepend(content);
						$(this).scrollTop(high);
						position=$(this).scrollTop();
						prepend=true;
						settings.prepend.call();
					}
					else if($(this).scrollBottom()>=high){
						if($(this).is(document)){
							$('body').html(content);
							$(this).scrollTop(high-$(window).height()-1);
							pos=$(this).scrollTop();
						}
						else{
							$(this).html(content);
							$(this).scrollTop(high-1);
							position=high-1;
						}
						append=false;
					}
				}
			});
		}
		
		//Up
		else{
			$(this).scroll(function(){
				if (position>=$(this).scrollTop()){
					position=$(this).scrollTop();
					if($(this).scrollTop()==0){
						if($(this).is(document))
							$('body').prepend(content);
						else
							$(this).prepend(content);
						$(this).scrollTop(high);
						position=$(this).scrollTop();
						prepend=true;
						settings.prepend.call();
					}
					else if($(this).scrollBottom()>=high){
						if($(this).is(document)){
							$('body').html(content);
							$(this).scrollTop(high-$(window).height()-1);
							position=$(this).scrollTop();
						}
						else{
							$(this).html(content);
							$(this).scrollTop(high-1);
							position=high-1;
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
							position=1;
							prepend=false;
						}
				}
			});
		}
	}
})(jQuery);

var intervals = [];

function set_anim_leaf(leaf, i)
{
	intervals[i] = setInterval(function(){
		var start_pos_x = parseInt(jQuery(leaf).attr('rel'));
		var pos_x = parseInt(jQuery(leaf).css('left'));
		var pos_top = parseInt(jQuery(leaf).css('top'));
		var offset_x = 100;

		if(settings_ft.move_lr == true)
		{
			//rotation
			angle = -(pos_x-start_pos_x)*60/offset_x;

			if(pos_x >= (start_pos_x + offset_x))
				jQuery(leaf).removeClass('right').addClass('left');
			else if(pos_x <= (start_pos_x - offset_x))
				jQuery(leaf).removeClass('left').addClass('right');		

			//met à jour la postion
			if(jQuery(leaf).hasClass('right'))
			{

				pos_x+=Math.ceil(Math.cos(angle*2*Math.PI/360)*settings_ft.speed);
				pos_top+=settings_ft.speed/2;
			}
			else
			{
				pos_x-=Math.ceil(Math.cos(angle*2*Math.PI/360)*settings_ft.speed);
				pos_top+=settings_ft.speed/2;
			}
		}
		else
		{
			angle = 0;
			pos_top+=settings_ft.speed/2;
		}

		if(pos_top >= window.innerHeight)		
			jQuery(leaf).css({left: pos_x, top: -20 });
		else
			jQuery(leaf).css({left: pos_x, top: pos_top, 'transform': 'rotate('+angle+'deg)'});

	}, 30);
}

jQuery(document).ready(function(){

	console.log(settings_ft);

	settings_ft.speed = parseInt(settings_ft.speed)*2;

	var i = 0; nb = 0;
	
	setInterval(function(){
		if(nb < settings_ft.quantity)
		{
			var pos_x = Math.random()*window.innerWidth;
			var i = Math.floor((Math.random() * (settings_ft.images.length))); 
			jQuery('body').append('<img class="leaf right" rel="'+pos_x+'" style="left: '+pos_x+'px" src="'+settings_ft.images[i].image+'" />');
			set_anim_leaf(jQuery('body .leaf:last-child'), i++);
			nb++;
		}
	}, 2000-(15*settings_ft.quantity));

});
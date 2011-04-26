jQuery(document).ready( function(){
	//page is loaded
	
	//If Twitter is checked, get Twitter counts
	if(args.twitter == 1)
	{
		/* TWITTER */
		/* ======== */	
		jQuery('.rtsocial-container').each(function(){
			var paNode = this;
			var key = jQuery(this).find( ".perma-link").attr( 'href' );
			var rtsocial_twiturl =  "http://urls.api.twitter.com/1/urls/count.json?url=" + key + "&callback=?";
			var url = jQuery(this).find('.rtsocial-twitter-button').attr('href');			
		
			jQuery.getJSON(rtsocial_twiturl,function(twitres){
				url += "&url="+twitres['url'];
				jQuery('.rtsocial-twitter-button', paNode).attr('href', url);
				jQuery('.rtsocial-twitter-share .rtsocial-twitter-count', paNode).text((twitres['count'])?(twitres['count']):'0');
			});
		});
	}
																		//end of "each"
																		//END OF TWITTER
	
	//If Facebook is checked, get Facebook shares
	if(args.facebook == 1)
	{
		/* FACEBOOK */
		/* ======== */
	
		/* create an array of urls */
		var rtsocial_urls = [];
		
		jQuery('.rtsocial-container').each(function(){
		  rtsocial_urls.push(jQuery("a.perma-link",this).attr('href'));
		});
		//end of rtsocial_-container
	
		/* facebook data */
		var rtsocial_fburl =  "https://graph.facebook.com/?ids=" + rtsocial_urls.join() + "&callback=?";
		var rtsocial_fbcounts = new Array();
	
		jQuery.getJSON(rtsocial_fburl,function(fbres){		
				jQuery.each(fbres,function(key, value){				
					if(value["shares"])				
						rtsocial_fbcounts[key] = value["shares"];
					else
						rtsocial_fbcounts[key] = 0;
				}														//end of "loop" function
			);															//end of "each"
			rtsocial_update_fbcount(rtsocial_fbcounts);
		});																//end of callback function in JSON
	}
	
	//If Twitter is unchecked, do not display its section
	if(jQuery('#tw_chk').attr('checked') == false)
	{
		jQuery('.tw_row').css('display', 'none');
		jQuery('#tw_handle').attr('value', '');
		jQuery('#tw_related_handle').attr('value', '');
	}
	
	//If Facebook is unchecked, do not display its section
	if(jQuery('#fb_chk').attr('checked') == false)
	{
		jQuery('.fb_row').css('display', 'none');
	}
});//end of document.ready

/* Facebook Count Update */
function rtsocial_update_fbcount (rtsocial_fbcounts){
	jQuery('.rtsocial-container').each(function(){
			key = jQuery(this).find("a.perma-link").attr('href');
			var url = jQuery(this).find('.rtsocial-fb-button').attr('href');	
			url += "u="+key;
			//alert(url);
			jQuery(this).find('.rtsocial-fb-button').attr('href', url); 
			jQuery(this).find('.rtsocial-fb-count').text(((rtsocial_fbcounts[key])?(rtsocial_fbcounts[key]):'0'));
			});															//end of "each"
}																		//end of function

//Removing Twitter block if Twitter is unchecked
jQuery('#tw_chk').click(function() {
				if(jQuery('#tw_chk').attr('checked') == false)
				{
					//jQuery('#tw_row').fadeOut('slow', function(){
						jQuery('.tw_row').fadeOut('slow');
						jQuery('#tw_handle').attr('value', '');
						jQuery('#tw_related_handle').attr('value', '');
					//})
				}
				else
				{
					jQuery('#tw_handle').attr('value', 'wpveda');
					jQuery('#tw_related_handle').attr('value', 'rtCamp');
					jQuery('.tw_row').fadeIn('slow');
				}
				
			});

//Removing Facebook block if Facebook is unchecked		
jQuery('#fb_chk').click(function() {
				if(jQuery('#fb_chk').attr('checked') == false)
				{
					//jQuery('.fb_row').css('display', 'none');
					jQuery('.fb_row').fadeOut('slow');
					jQuery('.fb_row input[type="radio"]').attr('checked', false);
				}
				else
				{
					//jQuery('.fb_row').css('display', '');
					jQuery('.fb_row input[value="like_light"]').attr('checked', true);
					jQuery('.fb_row').fadeIn('slow');
				}
				
			});
			
jQuery('.fb_color').live('click', function(){
	
	if(jQuery(this).attr('value')== 'light')
	{
		jQuery('#fb_like').attr('src', args.path+'fb_like.gif');
		jQuery('#fb_recommend').attr('src', args.path+'fb_recommend.gif');
	}
	else if(jQuery(this).attr('value')== 'dark')
	{
		jQuery('#fb_like').attr('src', args.path+'fb_like_dark.gif');
		jQuery('#fb_recommend').attr('src', args.path+'fb_recommend_dark.gif');
	}
	
});

/*jQuery('#fb_display_chk_label').live('click', function(){
	if(jQuery('#fb_chk').is(':checked'))
	{
		jQuery('#fb_chk').attr('checked', false);
	}
	else
	{
		jQuery('#fb_chk').attr('checked', true);
	}
})*/
			

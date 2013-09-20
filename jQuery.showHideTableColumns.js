/* 
 * version 1.5
 * 
 * showHideColumns jQuery plugin
 * 
 * Author: Clarent Rowe
 * 
 * Email: maestro6435@gmail.com
 */

(function ( $ ) {
    
    $.fn.showHideColumns = function(options) {
        
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            selectorClass: "column-selector",
			csvButtonClass:"btn",
            bold:false,
            width:'100%',
            fontSize:'13px'
        }, options );
        
        var choiceDiv = this;
		tableName = this[0].className;
        $this = choiceDiv.selector;
        divName = settings.selectorClass;
		buttonClass = settings.csvButtonClass;
        
        var string = "<div class='"+divName+"'>";
		string += "<a href='#' id='"+tableName+"' class= '"+buttonClass+"'>Download CSV</a>";
		string += "<table style='width:"+settings.width+";'><tr><td><strong>Show Hide Column  -</strong></td>";
        
        $($this+' th').each(function( index, listItem ) {
            
            if(settings.bold){
                title = '<strong>'+listItem.outerText+'</strong>';
            }else{
                title = listItem.outerText;
            }
            value = index+1;
            
            string += "<td style='font-size:"+settings.fontSize+"'><label><input type='checkbox' name='tableName' value='"+value+"' class='tableName' checked='checked'>"+title+"</label></td>";
        });
    
        string += "</tr></table></div>";
        
        $(string).insertBefore($this);
        
        $('#'+tableName).click(function(){
		   var button = $(this);
		   var id = button.attr('id');
		   var titles = [];
	
		   $('.'+id+' th').each(function(){
			   display = $(this).css('display');
			   
			   if(display != "none"){
					titles.push($(this).text().trim());
			   }
		   });
		   
		   $('.'+id).TableCSVExport({
			   delivery: 'download',
			   header:titles
		   });            
	   });
        
        temp = divName.split(' ');
        firstClass = temp[0];
 
        return this.prev("."+firstClass).find('input').change(function(){
            
            val = parseInt($(this).val());
            checked = $(this).is(':checked');
            
            if(checked){
                $($this+' td:nth-child('+val+'), '+$this+' th:nth-child('+val+')').fadeIn('slow');
            }else{
                $($this+' td:nth-child('+val+'), '+$this+' th:nth-child('+val+')').fadeOut('slow');
            }
        });
        
    };
    
}( jQuery ));
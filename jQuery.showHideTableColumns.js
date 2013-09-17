/* 
 * version 1.0
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
            tableDiv: ".show-hide-column",
            bold:false,
            width:'100%',
            fontSize:'13px'
        }, options );
        
        var choiceDiv = this;
        
        var string = "<table style='width:"+settings.width+";'><tr><td><strong>Show Hide Column  -</strong></td>"
        
        $(settings.tableDiv+' th').each(function( index, listItem ) {
            
            if(settings.bold){
                title = '<strong>'+listItem.outerText+'</strong>';
            }else{
                title = listItem.outerText;
            }
            value = index+1;
            
            string += "<td style='font-size:"+settings.fontSize+"'><label><input type='checkbox' name='tableName' value='"+value+"' class='tableName' checked='checked'>"+title+"</label></td>";
        });
    
        string += "</tr></table>";
        
        $(choiceDiv.selector).html(string);
 
        // Greenify the collection based on the settings variable.
        return this.find('input').change(function(){
            
            val = parseInt($(this).val());
            checked = $(this).is(':checked');
            
            if(checked){
                $(settings.tableDiv+' td:nth-child('+val+'), '+settings.tableDiv+' th:nth-child('+val+')').fadeIn('slow');
            }else{
                $(settings.tableDiv+' td:nth-child('+val+'), '+settings.tableDiv+' th:nth-child('+val+')').fadeOut('slow');
            }
        });
        
    };
    
}( jQuery ));
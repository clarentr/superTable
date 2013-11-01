/* 
 * version 2.2
 * 
 * superTable jQuery plugin
 * 
 * Author: Clarent Rowe
 * 
 * Email: maestro6435@gmail.com
 */

(function ( $ ) {
    
    $.fn.superTable = function(options) {
        
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            selectorClass: "column-selector",
			csvButtonClass:"btn",
            bold:false,
            width:'100%',
            fontSize:'13px',
			delivery:'download',
			showCSVButton:true,
			showShowHide:true,
			tableRowColor:false,
			evenRow:'none',
			oddRow:'none'
        }, options );
        
        var choiceDiv = this;
        var $this = choiceDiv.selector;
        var tableName = $this.replace(".", "");
        var divName = settings.selectorClass;
		var buttonClass = settings.csvButtonClass;
		var showButton = settings.showCSVButton;
		var showSH = settings.showShowHide;
		var colorRow = settings.tableRowColor;
		var evenR = settings.evenRow;
		var oddR = settings.oddRow;
		
		if(colorRow){
			$('.'+tableName+' tr:nth-child(even)').css({'background':evenR});
			$('.'+tableName+' tr:nth-child(odd)').css({'background':oddR});
		}
        
        var string = "<div class='"+divName+"'>";
		
		if(showButton){
			string += "<a href='#' id='"+tableName+"' class= '"+buttonClass+"'>Download CSV</a>";
		}
		
		if(showSH){
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
		
			string += "</tr></table>";
		}
		string += "</div>";
        
        $(string).insertBefore($this);
        
		if(showButton){
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
				   delivery: settings.delivery,
				   header:titles
			   });            
		   });
		}
        
		if(showSH){
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
		}
        
    };
    
}( jQuery ));



    /*
Based on the jQuery plugin found at http://www.kunalbabre.com/projects/TableCSVExport.php
Re-worked by ZachWick for LectureTools Inc. Sept. 2011
Copyright (c) 2011 LectureTools Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function ( $ ) {
$.fn.TableCSVExport = function (options) {
    var options = $.extend({
        separator: ',',
        header: [],
        columns: [],
        extraHeader: "",
        extraData: [],
        insertBefore: "",
        delivery: 'popup' /* popup, value, download */,
        emptyValue: '',
        showHiddenRows: false,
        rowFilter: ""
    },
    options);

    var csvData = [];
    var headerArr = [];
    var el = this;
    var basic = options.columns.length == 0 ? true : false;
    var columnNumbers = [];
    var columnCounter = 0;
    var insertBeforeNum = null;
    //header
    var numCols = options.header.length;
    var tmpRow = []; // construct header avalible array

    if (numCols > 0) {
        if (basic) {
            for (var i = 0; i < numCols; i++) {
                if (options.header[i] == options.insertBefore) {
                    tmpRow[tmpRow.length] = formatData(options.extraHeader);
                    insertBeforeNum = i;
                }
                tmpRow[tmpRow.length] = formatData(options.header[i]);
            }
        } else if (!basic) {
            for (var o = 0; o < numCols; o++) {
                for (var i = 0; i < options.columns.length; i++) {
                    if (options.columns[i] == options.header[o]) {
                        if (options.columns[i] == options.insertBefore) {
                            tmpRow[tmpRow.length] = formatData(options.extraHeader);
                            insertBeforeNum = o;
                        }
                        tmpRow[tmpRow.length] = formatData(options.header[o]);
                        columnNumbers[columnCounter] = o;
                        columnCounter++;
                    }
                }
            }
        }
    } else {
        getAvailableElements(el).find('th').each(function () {
            if ($(this).css('display') != 'none' || options.showHiddenRows) tmpRow[tmpRow.length] = formatData($(this).html());
        });
    }

    row2CSV(tmpRow);

    // actual data
    if (basic) {
        var trCounter = 0;
        getAvailableRows(el).each(function () {
            var tmpRow = [];
            var extraDataCounter = 0;
            getAvailableElements(this).find('td').each(function () {
                if (extraDataCounter == insertBeforeNum) {
                    tmpRow[tmpRow.length] = $.trim(options.extraData[trCounter - 1]);
                }
                if ($(this).css('display') != 'none' || options.showHiddenRows) {
                    if ($.trim($(this).html()) == "") {
                        tmpRow[tmpRow.length] = formatData(options.emptyValue);
                    } else {
                        tmpRow[tmpRow.length] = $.trim(formatData($(this).html()));
                    }
                }
                extraDataCounter++;
            });
            row2CSV(tmpRow);
            trCounter++;
        });
    } else {
        var trCounter = 0;
        getAvailableRows(el).each(function () {
            var tmpRow = [];
            var columnCounter = 0;
            var extraDataCounter = 0;
            getAvailableElements(this).find('td').each(function () {
                if ((columnCounter in columnNumbers) && (extraDataCounter == insertBeforeNum)) {
                    tmpRow[tmpRow.length] = $.trim(formatData(options.extraData[trCounter - 1]));
                }
                if (($(this).css('display') != 'none' || options.showHiddenRows) && (columnCounter in columnNumbers)) {
                    tmpRow[tmpRow.length] = $.trim(formatData($(this).html()));
                }
                columnCounter++;
                extraDataCounter++;
            });
            row2CSV(tmpRow);
            trCounter++;
        });
    }

    function getAvailableRows(el) {
        return $(el).find('tr' + options.rowFilter);
    }

    function getAvailableElements(el) {
        if (options.showHiddenRows) {
            return $(el);
        } else {
            return $(el).filter(':visible');
        }
    }

    if ((options.delivery == 'popup') || (options.delivery == 'download')) {
        var mydata = csvData.join('\n');
        return popup(mydata);
    } else {
        var mydata = csvData.join('\n');
        return mydata;
    }

    function row2CSV(tmpRow) {
        var tmp = tmpRow.join('') // to remove any blank rows
        // alert(tmp);
        if (tmpRow.length > 0 && tmp != '') {
            var mystr = tmpRow.join(options.separator);
            csvData[csvData.length] = $.trim(mystr);
        }
    }
    function formatData(input) {
        // mask " with "
        var regexp = new RegExp(/["]/g); //"
        var output = input.replace(regexp, '""');
        // TODO: mask \""; at the end, so openoffice can open it correctly
        
        // strip HTML
        output = output.replace("<br>"," ");
        if(!( output != null && typeof output === 'object')) output = "<span>"+output+"</span>"; // to be able to use jquery
        output = $(output).text().trim();
        
        if (output == "") return '';
        return '"' + output + '"';
    }
    function popup(data) {
        if (options.delivery == 'download') {
            window.location = 'data:text/csv;charset=utf8,' + encodeURIComponent(data);
            return true;
        } else {
            var generator = window.open('', 'csv', 'height=400,width=600');
            generator.document.write('<html><head><title>CSV</title>');
            generator.document.write('</head><body >');
            generator.document.write('<textArea cols=70 rows=15 wrap="off" >');
            generator.document.write(data);
            generator.document.write('</textArea>');
            generator.document.write('</body></html>');
            generator.document.close();
            return true;
        }
    }
};
}( jQuery ));

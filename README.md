version 2.2

superTable jQuery plugin
Requires: jQuery 1.6+

Author: Clarent Rowe

Email: maestro6435@gmail.com

Added
v3.0    Now will allow user to sort table by clicking column header
v2.2	Now you can color table rows
v2.0  	Now includes TableCSVExport script curtesy of ZachWick 		
		(https://github.com/ZachWick),
		User can add csv button to get a spread sheet version of table, which can be 
		downloaded or popped up.


How it works
A pre defined DIV including a TABLE is searched for all TH elements
The text is taken from these elements and used to create a second TABLE
above first TABLE, this TABLE includes checkboxes linked to each column
when a checkbox is unticked the relevant column is hidden. Replacing
tick will make column reappear.

How to use
In it's simplest form all you need is to add the selector of the div 
containing your table. You can also get more advanced and use the options
available. Table must contain column titles in TH tag.

Example 1

<div class="show-hide-column"><table></table></div>
$('.show-hide-column').superTable();

Example 2

<div class="my-table"></div>
$('.my-table').superTable({
		csvButtonClass:"btn btn-success",
		delivery:'popup',
		showCSVButton:true,
		tableRowColor:true,
		evenRow:'blue',
		oddRow:'green'
	});

Options
selectorClass: ".your-class" //Add as many classes as you like
bold:true                    //Boolean value TRUE / FALSE
width:'100%'                 //Percentage 0 - 100
fontSize:'13px'              //Any font format, px / em/ %
delivery:'download'			 //How user gets CSV, download / popup / 
showCSVButton:true			 //Show or hide CSV button
showShowHide:true			 //Show or hide ShowHideTable
tableRowColor:false			 //Color table rows
evenRow:'none'				 //color even rows '#f00'
oddRow:'none'				 //color odd rows '#00f'

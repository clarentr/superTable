version 1.5

showHideColumns jQuery plugin
Requires: jQuery 1.7+

Author: Clarent Rowe

Email: maestro6435@gmail.com

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
$('.show-hide-column').showHideColumns();

Example 2

<div class="my-table"></div>
$('.my-table').showHideColumns({selectorClass:'my-choice', bold:true});

Options
selectorClass: ".your-class" //Add as many classes as you like
bold:true                    //Boolean value TRUE / FALSE
width:'100%'                 //Percentage 0 - 100
fontSize:'13px'              //Any font format, px / em/ %
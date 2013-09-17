
version 1.0

showHideColumns jQuery plugin

Author: Clarent Rowe

Email: maestro6435@gmail.com

How it works
A pre defined DIV including a TABLE is searched for all TH elements
The text is taken from these elements and used to create a second TABLE
above first TABLE, this TABLE includes checkboxes linked to each column
when a checkbox is unticked the relevant column is hidden. Replacing
tick will make column reappear.

How to use
Two DIVS are needed, one to place the column selector, and one that already
contains the table to be worked on.
So we create an empty DIV with a class of anything, and pass that class to
'showHideColumns', if you give your DIV containing your TABLE a class of 
'show-hide-column' that is it your good to go, if you want though you can pass
in the class of your choice as an option.

Example 1

<div class="column-selector"></div>
<div class="show-hide-column"></div>

$('.column-selector').showHideColumns();

Example 2

<div class="column-selector"></div>
<div class="my-table"></div>

$('.column-selector').showHideColumns({tableDiv:'.my-table', bold:true});

Options
tableDiv: ".show-hide-column"	//Any Class surrounding your table
bold:true                    	//Boolean value TRUE / FALSE
width:'100%'                 	//Percentage 0 - 100
fontSize:'13px'              	//Any font format, px / em/ %
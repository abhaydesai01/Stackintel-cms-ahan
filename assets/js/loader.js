//	Loader Script

$(window).on('load', function() { // Make sure the whole site is loaded
	$('#status').fadeOut(); // will first fadeout the loading animation
	$('#preloader').fadeOut('slow'); // will fadeout the white DIV that
										// covers the website
	 $('body').delay(1000).css({'overflow': 'hidden'}); 
});

// Autoselect left sidebar

$(document).ready(function () {
    var url = window.location;
    var element = $('ul#sidebarnav a').filter(function () {
        return this.href == url;
    }).addClass('active').parent().addClass('active');
    var elements = $('ul#sidebarnav ul li a').filter(function () {
        return this.href == url;
    }).addClass('active').parent().addClass('active');
    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent().addClass('active').children('a').addClass('active');
        } 
        else {
            break; 
        }
    }
    while (true) {
        if (elements.is('li')) {
                elements = elements.parent().parent().parent().addClass('in').parent().addClass('active').children('a').addClass('active');
        }else {
            break; 
        }
    }
    $('#sidebarnav a').on('click', function (e) {
        
            if (!$(this).hasClass("active")) {
                // hide any open menus and remove all other classes
                $("ul", $(this).parents("ul:first")).removeClass("in");
                $("a", $(this).parents("ul:first")).removeClass("active");
                
                // open our new menu and add the open class
                $(this).next("ul").addClass("in");
                $(this).addClass("active");
                
            }
            else if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).parents("ul:first").removeClass("active");
                $(this).next("ul").removeClass("in");
            }
    })
    $('#sidebarnav >li >a.has-arrow').on('click', function (e) {
        e.preventDefault();
    });
})

// Tooltip JS
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Highlight a row from table
	function highlight_row(tableId) {
		    var table = document.getElementById(tableId.id);
		    var cells = table.getElementsByTagName('td');

		    for (var i = 0; i < cells.length; i++) {
		        // Take each cell
		        var cell = cells[i];
		        // do something on onclick event for cell
		        cell.onclick = function () {
		            // Get the row id where the cell exists
		            var rowId = this.parentNode.rowIndex;

		            var rowsNotSelected = table.getElementsByTagName('tr');
		            for (var row = 0; row < rowsNotSelected.length; row++) {
			            [...rowsNotSelected[row].children].forEach(function(item) {
			            	item.style.backgroundColor = "";
			            	item.classList.remove('selected');
			            })
		            }
		            var rowSelected = table.getElementsByTagName('tr')[rowId];
		            [...rowSelected.children].forEach(function(item) {
		            	item.style.backgroundColor = "#e4f0ff";
		            	item.className += " selected";
		            });
		        }
		    }

		}
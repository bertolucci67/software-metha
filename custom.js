jQuery(document).ready(function()
{
   // Use strict

   "use strict";


    // Tooltip
    // -------------------------------------------------------------------
    jQuery('.tooltips').tooltip
    ({
        container: 'body'
    });


    // Popover
    // -------------------------------------------------------------------
    jQuery('.popovers').popover();


    // Menu Toggle
    // -------------------------------------------------------------------
    jQuery('.menu-collapse').click(function()
    {
        if(!$('body').hasClass('hidden-left'))
        {
            if($('.headerwrapper').hasClass('collapsed'))
            {
                $('.headerwrapper, .mainwrapper').removeClass('collapsed');

                $('.children').show(); // hide sub-menu if leave open
            }
            else
            {
                $('.headerwrapper, .mainwrapper').addClass('collapsed');

                $('.children').hide(); // hide sub-menu if leave open
            }
        }
        else
        {
            if(!$('body').hasClass('show-left'))
            {
                $('body').addClass('show-left');
            }
            else
            {
                $('body').removeClass('show-left');
            }
        }

        return false;
    });



    // Add class nav-hover to mene. Useful for viewing sub-menu
    // -------------------------------------------------------------------
    jQuery('.leftpanel .nav li').hover(function()
    {
        $(this).addClass('nav-hover');

    },function()
    {
        $(this).removeClass('nav-hover');
    });



    // Hide menu on Media Queries
    // -------------------------------------------------------------------
    jQuery(window).resize(function()
    {
        hideMenu();
    });



    // Hide menu on loading/refreshing the page
    // -------------------------------------------------------------------
    hideMenu();
    function hideMenu()
    {
        if($('.header-right').css('position') == 'relative')
        {
            $('body').addClass('hidden-left');

            $('.headerwrapper, .mainwrapper').removeClass('collapsed');
        }
        else
        {
            $('body').removeClass('hidden-left');
        }

        // Seach form move to left

        if($(window).width() <= 360)
        {
            if($('.leftpanel .form-search').length == 0)
            {
                $('.form-search').insertAfter($('.profile-left'));
            }
        }
        else
        {
            if($('.header-right .form-search').length == 0)
            {
                $('.form-search').insertBefore($('.btn-group-notification'));
            }
        }
    }


    // Collapse menu on loading/refreshing the page
    // -------------------------------------------------------------------
    collapsedMenu();
    function collapsedMenu()
    {
        if($('.logo').css('position') == 'relative')
        {
            $('.headerwrapper, .mainwrapper').addClass('collapsed');
        }
        else
        {
            $('.headerwrapper, .mainwrapper').removeClass('collapsed');
        }
    }
});
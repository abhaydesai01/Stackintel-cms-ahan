var site_settings = '<div class="ts-button">'
        +'<span class="fa fa-cog"></span>'
    +'</div>'
    +'<div class="ts-body">'
        +'<div class="ts-title">Options</div>'
        +'<div class="ts-row">'
            +'<label class="check"><input type="checkbox" class="icheckbox" name="st_head_fixed" value="1"/> Fixed Header</label>'
        +'</div>'
        +'<div class="ts-row">'
            +'<label class="check"><input type="checkbox" class="icheckbox" name="st_sb_fixed" value="1" checked/> Fixed Sidebar</label>'
        +'</div>'
        +'<div class="ts-row">'
            +'<label class="check"><input type="checkbox" class="icheckbox" name="st_sb_scroll" value="1"/> Scroll Sidebar</label>'
        +'</div>'
        +'<div class="ts-row">'
            +'<label class="check"><input type="checkbox" class="icheckbox" name="st_sb_right" value="1"/> Right Sidebar</label>'
        +'</div>'
        +'<div class="ts-row">'
            +'<label class="check"><input type="checkbox" class="icheckbox" name="st_sb_custom" value="1"/> Custom Navigation</label>'
        +'</div>'
        +'<div class="ts-row">'
            +'<label class="check"><input type="checkbox" class="icheckbox" name="st_sb_toggled" value="1"/> Toggled Navigation</label>'
        +'</div>'
        +'<div class="ts-title">Layout</div>'
        +'<div class="ts-row">'
            +'<label class="check"><input type="radio" class="iradio" name="st_layout_boxed" value="0" checked/> Full Width</label>'
        +'</div>'
        +'<div class="ts-row">'
            +'<label class="check"><input type="radio" class="iradio" name="st_layout_boxed" value="1"/> Boxed</label>'
        +'</div>'
        +'<div class="ts-title">Themes</div>'
        +'<div class="ts-themes">'
            +'<a href="#" class="active" data-theme="css/theme-default.css"><img src="img/themes/default.jpg"/></a>'            
            +'<a href="#" data-theme="css/theme-forest.css"><img src="img/themes/forest.jpg"/></a>'
            +'<a href="#" data-theme="css/theme-dark.css"><img src="img/themes/dark.jpg"/></a>'                        
            +'<a href="#" data-theme="css/theme-night.css"><img src="img/themes/night.jpg"/></a>'            
            +'<a href="#" data-theme="css/theme-serenity.css"><img src="img/themes/serenity.jpg"/></a>'
            
            +'<a href="#" data-theme="css/theme-default-head-light.css"><img src="img/themes/default-head-light.jpg"/></a>'
            +'<a href="#" data-theme="css/theme-forest-head-light.css"><img src="img/themes/forest-head-light.jpg"/></a>'    
            +'<a href="#" data-theme="css/theme-dark-head-light.css"><img src="img/themes/dark-head-light.jpg"/></a>'            
            +'<a href="#" data-theme="css/theme-night-head-light.css"><img src="img/themes/night-head-light.jpg"/></a>'
            +'<a href="#" data-theme="css/theme-serenity-head-light.css"><img src="img/themes/serenity-head-light.jpg"/></a>'
        +'</div>'
        +'<div id="ts-wallpapers">'
        +'<div class="ts-title">Wallpapers</div>'
            +'<div class="ts-themes">'
                +'<a href="#" class="active" data-wall="wall_1"><img src="img/backgrounds/wall_1.jpg"/></a>'
                +'<a href="#" data-wall="wall_2"><img src="img/backgrounds/wall_2.jpg"/></a>'
                +'<a href="#" data-wall="wall_3"><img src="img/backgrounds/wall_3.jpg"/></a>'
                +'<a href="#" data-wall="wall_4"><img src="img/backgrounds/wall_4.jpg"/></a>'    
                +'<a href="#" data-wall="wall_5"><img src="img/backgrounds/wall_5.jpg"/></a>'

                +'<a href="#" data-wall="wall_6"><img src="img/backgrounds/wall_6.jpg"/></a>'
                +'<a href="#" data-wall="wall_7"><img src="img/backgrounds/wall_7.jpg"/></a>'
                +'<a href="#" data-wall="wall_8"><img src="img/backgrounds/wall_8.jpg"/></a>'
                +'<a href="#" data-wall="wall_9"><img src="img/backgrounds/wall_9.jpg"/></a>'    
                +'<a href="#" data-wall="wall_10"><img src="img/backgrounds/wall_10.jpg"/></a>'    
            +'</div>'
        +'</div>'
    +'</div>';
    


$(document).ready(function(){
    
    /* Default settings */
    var theme_settings = {
        st_head_fixed: 1,
        st_sb_fixed: 1,
        st_sb_scroll: 1,
        st_sb_right: 0,
        st_sb_custom: 0,
        st_sb_toggled: 0,
        st_layout_boxed: 0
    };
    /* End Default settings */
    
    set_settings(theme_settings,false);    
    
    $(".theme-settings input").on("ifClicked",function(){
        
        var input   = $(this);

        if(input.attr("name") != 'st_layout_boxed'){
                
            if(!input.prop("checked")){
                theme_settings[input.attr("name")] = input.val();
            }else{            
                theme_settings[input.attr("name")] = 0;
            }
            
        }else{
            theme_settings[input.attr("name")] = input.val();
        }

        /* Rules */
        if(input.attr("name") === 'st_sb_fixed'){
            if(theme_settings.st_sb_fixed == 1){
                theme_settings.st_sb_scroll = 1;
            }else{
                theme_settings.st_sb_scroll = 0;
            }
        }
        
        if(input.attr("name") === 'st_sb_scroll'){
            if(theme_settings.st_sb_scroll == 1 && theme_settings.st_layout_boxed == 0){
                theme_settings.st_sb_fixed = 1;
            }else if(theme_settings.st_sb_scroll == 1 && theme_settings.st_layout_boxed == 1){
                theme_settings.st_sb_fixed = -1;
            }else if(theme_settings.st_sb_scroll == 0 && theme_settings.st_layout_boxed == 1){
                theme_settings.st_sb_fixed = -1;
            }else{
                theme_settings.st_sb_fixed = 0;
            }
        }
        
        if(input.attr("name") === 'st_layout_boxed'){
            if(theme_settings.st_layout_boxed == 1){                
                theme_settings.st_head_fixed    = -1;
                theme_settings.st_sb_fixed      = -1;
                theme_settings.st_sb_scroll     = 1;
                
                $("#ts-wallpapers").show();
            }else{
                theme_settings.st_head_fixed    = 0;
                theme_settings.st_sb_fixed      = 1;
                theme_settings.st_sb_scroll     = 1;
                
                $("#ts-wallpapers").hide();
            }
        }
        /* End Rules */
        
        set_settings(theme_settings,input.attr("name"));
        
    });
    
});

function set_settings(theme_settings,option){
    
    /* Start Header Fixed */
    if(theme_settings.st_head_fixed == 1)
        $(".page-container").addClass("page-navigation-top-fixed");
    else
        $(".page-container").removeClass("page-navigation-top-fixed");    
    /* END Header Fixed */
    
    /* Start Sidebar Fixed */
    if(theme_settings.st_sb_fixed == 1){        
        $(".page-sidebar").addClass("page-sidebar-fixed");
    }else
        $(".page-sidebar").removeClass("page-sidebar-fixed");
    /* END Sidebar Fixed */
    
    /* END Sidebar Fixed */
    
    /* Start Right Sidebar */
    if(theme_settings.st_sb_right == 1)
        $(".page-container").addClass("page-mode-rtl");
    else
        $(".page-container").removeClass("page-mode-rtl");
    /* END Right Sidebar */
    
    /* Start Custom Sidebar */
    if(theme_settings.st_sb_custom == 1)
        $(".page-sidebar .x-navigation").addClass("x-navigation-custom");
    else
        $(".page-sidebar .x-navigation").removeClass("x-navigation-custom");
    /* END Custom Sidebar */
    
    /* Start Custom Sidebar */
    if(option && option === 'st_sb_toggled'){
        if(theme_settings.st_sb_toggled == 1){
            $(".page-container").addClass("page-navigation-toggled");
            $(".x-navigation-minimize").trigger("click");
        }else{          
            $(".page-container").removeClass("page-navigation-toggled");
            $(".x-navigation-minimize").trigger("click");
        }
    }
    /* END Custom Sidebar */
    
    /* Start Layout Boxed */
    if(theme_settings.st_layout_boxed == 1)
        $("body").addClass("page-container-boxed");
    else
        $("body").removeClass("page-container-boxed");
    /* END Layout Boxed */
    
    /* Set states for options */
    if(option === false || option === 'st_layout_boxed' || option === 'st_sb_fixed' || option === 'st_sb_scroll'){        
        for(option in theme_settings){
            set_settings_checkbox(option,theme_settings[option]);
        }
    }
    /* End states for options */
    
    /* Call resize window */
    $(window).resize();
    /* End call resize window */
}

function set_settings_checkbox(name,value){
    
    if(name == 'st_layout_boxed'){    
        
        $(".theme-settings").find("input[name="+name+"]").prop("checked",false).parent("div").removeClass("checked");
        
        var input = $(".theme-settings").find("input[name="+name+"][value="+value+"]");
                
        input.prop("checked",true);
        input.parent("div").addClass("checked");        
        
    }else{
        
        var input = $(".theme-settings").find("input[name="+name+"]");
        
        input.prop("disabled",false);            
        input.parent("div").removeClass("disabled").parent(".check").removeClass("disabled");        
        
        if(value === 1){
            input.prop("checked",true);
            input.parent("div").addClass("checked");
        }
        if(value === 0){
            input.prop("checked",false);            
            input.parent("div").removeClass("checked");            
        }
        if(value === -1){
            input.prop("checked",false);            
            input.parent("div").removeClass("checked");
            input.prop("disabled",true);            
            input.parent("div").addClass("disabled").parent(".check").addClass("disabled");
        }        
                
    }
}
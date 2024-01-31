// Parallax.
function wdps_parallax(wdps, slide_id) {
  var current_key = jQuery("#wdps_current_image_key_" + wdps).val();
  var slide_id = window["wdps_data_" + wdps][current_key]["id"];
  var layers_cont = ".wdps_slideshow_image_" + wdps + ">[id^='wdps_" + wdps + "_slide" + slide_id + "_layer']";

  var slide_width = jQuery(".wdps_slideshow_image_" + wdps + "[image_id='" + slide_id + "']").outerWidth();
  var slide_height = jQuery(".wdps_slideshow_image_" + wdps + "[image_id='" + slide_id + "']").outerHeight();

  var zIndex_arr = [];
  var hor = [];
  var ver = [];
  
  jQuery(layers_cont).each(function() {
    jQuery(this).css({
      'transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.002, 0, 0, 0, 1)',
      '-ms-transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.002, 0, 0, 0, 1)',
      '-webkit-transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.002, 0, 0, 0, 1)',
      'transform-origin': '50% 50% 0px',
      '-ms-transform-origin': '50% 50% 0px',
      '-webkit-transform-origin': '50% 50% 0px'
    });
    var cur_zIndex = parseInt(jQuery(this).css("z-index"));
    hor[cur_zIndex] = 0;
    ver[cur_zIndex] = 0;
    zIndex_arr.push(cur_zIndex);
  });

  // Arithmetic average for layer movement direction.
  var average = (zIndex_arr[0] + zIndex_arr[zIndex_arr.length - 1]) / 2;

  zIndex_arr.sort();

  var last_position = {};
  jQuery("#wdps_container1_" + wdps).off("mousemove touchmove");
  jQuery("#wdps_container1_" + wdps).off("mouseleave touchcancel");

  jQuery("#wdps_container1_" + wdps).on("mousemove touchmove", function (event) {
    // Check to make sure there is data to compare against.
    if (typeof(last_position.x) != 'undefined') {
      // Get the change from last position to this position.
      var deltaX = last_position.x - event.clientX,
          deltaY = last_position.y - event.clientY;

      jQuery(layers_cont).each(function() {
        var cur_zIndex = jQuery(this).css('z-index');
        var layer_left = parseFloat(jQuery(this).css("left"));
        var layer_top = parseFloat(jQuery(this).css("top"));
        var layer_width = jQuery(this).outerWidth();
        var layer_height = jQuery(this).outerHeight();
        for (var j in zIndex_arr) {
          if (zIndex_arr[j] == cur_zIndex) {
            j = parseFloat(j);
            var step = (j + 1) / 10;
            // Check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero.
            if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
              // Left.
              hor[cur_zIndex] = hor[cur_zIndex] + step;
            } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
              // Right.
              hor[cur_zIndex] = hor[cur_zIndex] - step;
            } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
              // Up.
              ver[cur_zIndex] = ver[cur_zIndex] + step;
            } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
              // Down.
              ver[cur_zIndex] = ver[cur_zIndex] - step;
            }
            // Layer movement direction.
            var dir = (average >= cur_zIndex ? -1 : 1);

            if (layer_left + dir * hor[cur_zIndex] < 0) {
              hor[cur_zIndex] += dir * step;
            }
            if (layer_left + layer_width + dir * hor[cur_zIndex] > slide_width) {
              hor[cur_zIndex] -= dir * step;
            }
            if (layer_top + dir * ver[cur_zIndex] < 0) {
              ver[cur_zIndex] += dir * step;
            }
            if (layer_top + layer_height + dir * ver[cur_zIndex] > slide_height) {
              ver[cur_zIndex] -= dir * step;
            }
            jQuery(this).stop();
            jQuery(this).css({
              marginTop: (ver[cur_zIndex] *  dir).toFixed(2) + 'px',
              marginLeft: (hor[cur_zIndex] * dir).toFixed(2) + 'px'
            });
          }
        }
      });
    }
    // Set the new last position to the current for next time.
    last_position = {
      x : event.clientX,
      y : event.clientY
    };
    
  });
  // Reset layer positions on mouse out.
  jQuery("#wdps_container1_" + wdps).on("mouseleave touchcancel", function (event) {
    jQuery(layers_cont).each(function() {
      jQuery(this).animate({
          marginTop: 0,
          marginLeft: 0
        },
        500);
      var cur_zIndex = jQuery(this).css('z-index');
      hor[cur_zIndex] = 0;
      ver[cur_zIndex] = 0;
    });
  });
}

function wdps_embed_slide_autoplay(slide_id){
  jQuery(slide_id).find("iframe").each(function () {
    if (typeof jQuery(this)[0].contentWindow != "undefined") {
      jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      jQuery(this)[0].contentWindow.postMessage('{"method": "play"}', "*");
      jQuery(this)[0].contentWindow.postMessage('play', '*');
    }
  });
}

// Uploaded video.
function wdps_video_dimenstion(wdps, current_key) {
  var slide_id = window["wdps_data_" + wdps][current_key]["id"];
  var is_video = window["wdps_data_" + wdps][current_key]["is_video"];
  var autoplay = window["wdps_data_" + wdps][current_key]["target_attr_slide"];
  var bg_fit = window["wdps_data_" + wdps][current_key]["bg_fit"];
  var att_width = window["wdps_data_" + wdps][current_key]["width"];
  var att_height = window["wdps_data_" + wdps][current_key]["height"];
  if (is_video == 'video') {
    if (bg_fit == 'cover') {
      var video_slide_width = jQuery("#wdps_slide_container_" + wdps + "").width();
      var video_slide_height = jQuery("#wdps_slide_container_" + wdps + "").height();
      var video_width = att_width;
      var video_height = att_height;
      var ratio = video_width / video_height;
      if ((video_slide_width / video_slide_height) <= (video_width / video_height)) {
        jQuery("#wdps_slide_" + wdps + '_' + slide_id).attr("height", video_slide_height);
        video_width = jQuery("#wdps_slide_" + wdps + '_' + slide_id).height() * ratio ;
        video_width = (video_width - video_slide_width) / 2;
        jQuery("#wdps_slide_" + wdps + '_' + slide_id).css({'position': 'relative', 'left': -video_width});
      }
      else {
        jQuery("#wdps_slide_" + wdps + '_' + slide_id).attr("width", video_slide_width);
        video_height = jQuery("#wdps_slide_" + wdps + '_' + slide_id).width() / ratio ;
        video_height = (video_height - video_slide_height) / 2;
        jQuery("#wdps_slide_" + wdps + '_' + slide_id).css({'position': 'relative', 'top': -video_height});
      }
    }
    else {
      jQuery("#wdps_slide_" + wdps + '_' + slide_id).attr("height", "100%");
    }
    if (autoplay == 1) {
      jQuery("#wdps_slide_" + wdps + '_' + slide_id).get(0).load();		  
      jQuery("#wdps_slide_" + wdps + '_' + slide_id).get(0).play();
    }
  }
}

function wdps_upvideo_layer_dimenstion(wdps, key, j) {
  var slide_id = window["wdps_data_" + wdps][key]["id"];
  var data = window["wdps_data_" + wdps][key];
  var autoplay = window["wdps_data_" + wdps][key]["layer_" + j + "_video_autoplay"];
  var width = window["wdps_data_" + wdps][key]["layer_" + j + "_attr_width"];
  var height = window["wdps_data_" + wdps][key]["layer_" + j + "_attr_height"];

  if (data["layer_" + j + "_type"] == "upvideo")  {
    var video_layer_width = jQuery('#wdps_' + wdps + '_slide' + slide_id + '_layer' + data["layer_" + j + "_id"]).width();
    var video_layer_height = jQuery('#wdps_' + wdps + '_slide' + slide_id + '_layer' +data["layer_" + j + "_id"]).height();
    var video_width = width;
    var video_height = height;

    if ((video_layer_width / video_layer_height) <= (video_width / video_height)) {
      jQuery("#wdps_slide_" + wdps + "_" + slide_id + "_layer_" + data['layer_' + j + '_id']).attr("height", video_layer_height);
      video_width = jQuery("#wdps_slide_" + wdps + "_" + slide_id + "_layer_" + data['layer_' + j + '_id']).width();
      video_width = (video_width - video_layer_width) / 2;
      jQuery("#wdps_slide_" + wdps + "_" + slide_id + "_layer_" + data['layer_' + j + '_id']).css({'position': 'relative', 'left': -video_width});
    }
    else {
      jQuery("#wdps_slide_" + wdps + "_" + slide_id + "_layer_" + data['layer_' + j + '_id']).attr("width", video_layer_width);
      video_height = jQuery("#wdps_slide_" + wdps + "_" + slide_id + "_layer_" + data['layer_' + j + '_id']).height();
      video_height = (video_height - video_layer_height) / 2;
      jQuery("#wdps_slide_" + wdps + "_" + slide_id + "_layer_" + data['layer_' + j + '_id']).css({'position': 'relative', 'top': -video_height});
    }
    if (autoplay == 'on') {
      jQuery("#wdps_slide_" + wdps + "_" + slide_id + '_layer_' + data["layer_" + j + "_id"]).get(0).load();		  
      jQuery("#wdps_slide_" + wdps + "_" + slide_id + '_layer_' + data["layer_" + j + "_id"]).get(0).play();
    }
  } 
}

function wdps_video_play_pause(id, wdps) {
  if (jQuery(id).get(0).paused) {
    jQuery(id).get(0).play();
    jQuery('.wdps_bigplay_' + wdps).hide();
  }
  else {
    jQuery(id).get(0).pause();
    jQuery('.wdps_bigplay_' + wdps).show();
  }
}

function wsd_video_play_pause_layer(id, wdps) {
  if (jQuery(id).get(0).paused) {
    jQuery(id).get(0).play();
    jQuery('.wdps_bigplay_layer_' + wdps).hide();
  }
  else {
    jQuery(id).get(0).pause();
    jQuery('.wdps_bigplay_layer_' + wdps).show();
  }
}

function wdps_show_thumb(key, wdps) {
  var data = window["wdps_data_" + wdps][key];
  var bg_fit = window["wdps_data_" + wdps][key]["bg_fit"];
  var full_width = window["wdps_data_" + wdps][key]["full_width"];
  var bull_position = window["wdps_data_" + wdps][key]["bull_position"];
  var image_url = data["image_thumb_url"];
  var dot_conteiner_width = jQuery('.wdps_slideshow_dots_container_' + wdps).width() / 2;
  var dot_conteiner_height = jQuery('.wdps_slideshow_dots_container_' + wdps).height();
  var wdps_bulframe_width = jQuery('.wdps_bulframe_' + wdps).width() / 2;
  var dot_position = jQuery('#wdps_dots_' + key + '_' + wdps ).position();
  var dot_width = jQuery('#wdps_dots_' + key + '_' + wdps ).width() / 2;
  dot_position = dot_position.left;
  var childPos = jQuery('#wdps_dots_' + key + '_' + wdps ).offset();
  var parentPos = jQuery('.wdps_slideshow_dots_thumbnails_' + wdps).parent().offset();
  var childOffset = childPos.left - parentPos.left;
  var right_offset = 0;
  var rt = (dot_conteiner_width * 2) - childOffset;
  if (wdps_bulframe_width >= rt && rt > 0 ){
    right_offset =  wdps_bulframe_width - rt ;
    dot_width = 0;
  }
  if (full_width == '1') {
    if (wdps_bulframe_width >= childOffset) {
      wdps_bulframe_width = childOffset - parentPos.left ;  
      dot_width = 0;
    }
  }
  else {
    if (wdps_bulframe_width >= childOffset) {
      wdps_bulframe_width = childOffset ;  
      dot_width = 0;
    }
  }
  dot_position = childOffset - wdps_bulframe_width + dot_width - right_offset ;
  jQuery('.wdps_bulframe_' + wdps ).css({
    'position' : 'absolute',
    'z-index' : '9999',
    'left': dot_position,
    'background-image' :'url("' + image_url + '")',
    'background-size' : bg_fit,
    'background-repeat' : 'no-repeat',
    'background-position' : 'center center'});
  jQuery('.wdps_bulframe_' + wdps ).css(bull_position, dot_conteiner_height);
  jQuery('.wdps_bulframe_' + wdps ).fadeIn();
}

function wdps_hide_thumb(wdps) {
  jQuery('.wdps_bulframe_' + wdps ).css({'background-image':''});
  jQuery('.wdps_bulframe_' + wdps ).fadeOut();
}
function wdps_get_overall_parent(obj) {
  if (obj.parent().width()) {
    obj.width(obj.parent().width());
    var a = obj.parent().width();
    return a;
  }
  else {
    return wdps_get_overall_parent(obj.parent());
  }
}
function wdps_set_text_dots_cont(wdps) {
  var wdps_bull_width = 0;
  jQuery(".wdps_slideshow_dots_" + wdps).each(function(){
    wdps_bull_width += jQuery(this).outerWidth() + 2 * parseInt(jQuery(this).css("margin-left"));
  });
  jQuery(".wdps_slideshow_dots_thumbnails_" + wdps).css({width: wdps_bull_width});
}
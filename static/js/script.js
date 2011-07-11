$(function(){
    $(".hidden").removeClass('hidden');

    var $index = $('#index'),
      $surah = $('#surah'),
      $ayah = $('#ayah'),
      $ayahtitle = $('#ayahtitle'),
      $content = $('#content'),
      $reciter = $('#reciter'),
      seed = parseInt($('#seed').val(),10),
      $autoplay = $('#autoplay'),
      $popdown = $("#popdown"),
      $popmessage = $("#popmessage"),
      cnt = 0;

    var rebuildSwf = function(ayah,surah){
        swfobject.embedSWF("/swf/audio.swf", "audioplayer", "290", "24",
            "9.0.0","/swf/expressInstall.swf", {
          SoundFile: "/mp3/"+$reciter.val()+"_"+surah+"_"+ayah+".mp3",
          autostart: $autoplay.attr('checked')?"yes":"no"
        }, {menu:"false"});
    };

    $("#sampleform").ajaxForm(function(data){
        var index = parseInt($index.val(),10) + 1,
          el = ayah_list[(index*seed)%ayah_list.length],
          ayah = el.ayah,
          surah = el.surah;
        // store in the form
        $index.val(index);
        $ayah.val(ayah);
        $surah.val(surah);
        $ayahtitle.text('Qur\'an: '+surah_name[surah]+', '+ayah);
        $content.val('');
        rebuildSwf(ayah,surah);
        cnt+=1;
        var poptext = "Thanks! ("+cnt+")."; if(cnt < 3) poptext += " ⇧ Try another one ⇧";
        $popmessage.text(poptext);
        //Thank you for your submission.
        //Thanks for submitting a sample.
        $popdown.slideDown('slow').delay(3000).hide('slow');
    });

    $('#reciter').change(function(){
        rebuildSwf($ayah.val(),$surah.val());
    });

    $("#notifyform").ajaxForm(function(data){
        $("#notifylabel").html('&#x2713; Email added to notification list!').
            show('slow').delay(7000).fadeOut('slow');
    });
});

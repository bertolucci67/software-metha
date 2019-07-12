type="text/javascript">
$(document).on('click','.validar-patrocinador',function(a){a.preventDefault();
    $('#indicador').val('0');
    var e=$(this).button('loading'),t=$(this).attr('data-url'),o=$('#patrocinador').val();
    $.ajax({url:t,async:!1,type:'POST',dataType:'json',data:{patrocinador:o},success:function(a){if(a.type == 'success' ){$('#patrocinador-empty').addClass('hidden');
    $('#patrocinador-full').find('h2').text(a.afiliado.nome);
    $('#patrocinador-full').removeClass('hidden').addClass('fadeIn');
    $('#indicador').val(a.afiliado.id)}
else{setTimeout(function(){var a=bootbox.dialog({title:
<i class="fa fa-thumbs-down">
</i> Patrocinador não encontrado, message: <p class="text-justify">O patrocinador que você informou não foi encontrado, está inativo ou atingiu o limite de composição da rede. Por favor revise o nome de usuário informado e em caso de dúvidas entre em contato conosco.
</h4>,closeButton:!0})},300)}},complete:function(){setTimeout(function(){e.button('reset')},200)}})});
$(document).on('click','.btn-cadastro',function(e){e.preventDefault();
    if(parseInt($('#indicador').val())>0){var i=$('#indicador').val()}
    else{var i=!1};
    var a=$(this);
    a.prop('disabled',!0);
    var t=a.parents('form:first'),r=!0;
    if(i==!1&&a.data('continue')!='1'){r=!1;var o=<p class="text-md text-justify">
    Tem certeza que deseja continuar o seu cadastro sem definir o patrocinador ?<br/>
    <br/>';o+='Caso tenha escolhido um patrocinador é importante que você clique no botão "Validar Patrocinador" antes de concluir o cadastro, caso contrário nosso sistema lhe posicionará na rede geral da empresa.</p>;
    bootbox.dialog({title:<i class="fa fa-user-times">
    </i> Cadastrar sem patrocinador,message:o,buttons:{danger:{label:
    <i class="fa fa-times">
    </i> Revisar Patrocinador,className:btn-primary pull-left,callback:function(){a.prop('disabled',!1)}},main:{label:
    <i class="fa fa-check">
    </i> Sim,className:'btn-success pull-right',callback:function(){a.data('continue','1').prop('disabled',!1);
    setTimeout(function(){a.trigger('click')},200)}}}})}
    else{t.attr('method','POST').attr('target','upload-iframe').attr('enctype','multipart/form-data');
    $('body').append(<iframe name="upload-iframe" id="upload-iframe" class="hidden">
    </iframe>);
    blockPage();
    t.submit();
    $('#upload-iframe').bind('load',function(o){o.preventDefault();textResponse=$('#upload-iframe').contents().text();$('#upload-iframe').remove();
    setTimeout(function(){$.unblockUI()},100);var i=!0;try{var e=jQuery.parseJSON(textResponse)}catch(r){i=!1;toastr.error('Ocorreu um erro ao processar a requisição. Por favor entre em contato com o administrador','Atenção');
    setTimeout(function(){a.prop('disabled',!1)},100)};if(i==!0){$('.has-error').each(function(){$(this).removeClass('has-error')});
    $('label.validation').each(function(){$(this).remove()});
    if(e.message){toastr[e.type](e.message,'Atenção')};
    if(e.type=='error'){setTimeout(function(){a.prop('disabled',!1);$.unblockUI()},2500)};
    if(e.validation){$.each(e.validation,function(a,o){var e=$(t).find('[name="'+a+'"],[name="'+a+'[]"]').parents('div:first');
    if(e.hasClass('input-group')||e.hasClass('radio')||e.hasClass('checkbox')){var e=$(t).find('[name="'+a+'"],[name="'+a+'[]"]').parents('div:first').parent()}
    else{var e=$(t).find('[name="'+a+'"],[name="'+a+'[]"]').parents('div:first')};$(e).append(<label class="validation text-danger">'+o+'</label>);
    $(e).children('.validation').removeClass('hidden');
    $(e).addClass('has-error')})};
    if(e.redirect){if(typeof a.attr('data-redirect')==='undefined'){setTimeout(function(){$(location).attr('href',e.redirect)},1500)}
    else{setTimeout(function(){$(location).attr('href',a.attr('data-redirect'))},1500)}}}})}});
    <script>;
        function reproduzirSom(t){if(t=='1'){var a=new Audio('https://methadigital.com.br/assets/global/audio/alerta1.ogg')}
    else{var a=new Audio('https://methadigital.com.br/assets/global/audio/alerta2.ogg')};setTimeout(function(){a.play()},300)};</script>
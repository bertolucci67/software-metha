// Executar funcoes ao terminar o carregamento do documento
// --------------------------------------------------------
$(document).ready(function () {
    // Since confModal is essentially a nested modal it's enforceFocus method
    // must be no-op'd or the following error results
    // "Uncaught RangeError: Maximum call stack size exceeded"
    // But then when the nested modal is hidden we reset modal.enforceFocus
    var enforceModalFocusFn = $.fn.modal.Constructor.prototype.enforceFocus;
    $.fn.modal.Constructor.prototype.enforceFocus = function () {
    };


    // Toasts Defaults
    // ---------------
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "10",
        "hideDuration": "100",
        "timeOut": "3000",
        "extendedTimeOut": "4000",
        "hideEasing": "linear",
        "hideMethod": "fadeOut"
    };


    // Inicializar Plugin de Audio
    // -------------------------------------------------------------------
    audioPlayerInit();


    // Inicializar Mascaras de FormataÃ§Ã£o
    // -------------------------------------------------------------------
    masksInit();


    // Inicializar Tooltip
    // -------------------------------------------------------------------
    tooltipInit();


    // Reset bootstrap modal on close
    // -------------------------------------------------------------------
    $('body').on('hidden.bs.modal', '#ajaxModal,#ajaxOverModal', function () {
        $(this).removeData('bs.modal');
    });


    // Injetar tooltip
    // -------------------------------------------------------------------
    $('body').on('shown.bs.modal', '#ajaxModal,#ajaxOverModal', function () {
        // Inicializar Tooltip

        tooltipInit();
    });

    //Reproduzir som ao abrir .settings
    // -------------------------------------------------------------------
    $('.settings').click(function () {

        // Inicializar Tooltip

        reproduzirSom('2');
    });
    //Reproduzir som ao abrir .nav-profile
    // -------------------------------------------------------------------
    $('.nav-profile').click(function () {

        // Inicializar Tooltip

        reproduzirSom('2');
    });

    //Reproduzir som ao abrir sidebar-collapse
    // -------------------------------------------------------------------
    $('.sidebar-collapse').click(function () {

        // Inicializar Tooltip

        reproduzirSom('1');
    });


    // Dialog executar URL
    // -------------------------------------------------------------------
    $(document).on('click', 'a.dialog-confirm-url', function (e) {
        //Reproduzir som ao abrir modal
        
        reproduzirSom('2');
        

        // Segura o click padrÃ£o do objeto

        e.preventDefault();

        // Captura a URL do Elemento

        var href = $(this).attr('href');

        // Capturar titulo da caixa de dialog

        var htmlTitle = $(this).attr('title');

        // Capturar titulo da caixa de dialog modificado pelo tooltip

        var tooltipTitle = $(this).attr('data-original-title');

        // Definir o Titulo do Dialog

        var dialogTitle = (htmlTitle == '') ? tooltipTitle : htmlTitle;

        var dialogTitle = $(this).html();

        // Exibe o Modal de Dialog

        bootbox.dialog
        ({
            message: "Deseja realmente executar esta aÃ§Ã£o ?",
            title: dialogTitle,
            buttons:
                {
                    danger:
                        {
                            label: '<i class="fa fa-times"></i> Cancelar',
                            className: "btn-danger",
                            callback: function () {
                            }
                        },
                    main:
                        {
                            label: '<i class="fa fa-check"></i> OK',
                            className: "btn-primary",
                            callback: function () {
                                // Ir para Url

                                $(location).attr('href', href);
                            }
                        }
                }
        });

    });


    // Dialog Ajax Rest Get
    // -------------------------------------------------------------------
    $(document).on('click', '.ajax-rest-get', function (e) {

        //Reproduzir som ao abrir modal

        reproduzirSom('2');

        // Segura o click padrÃ£o do objeto

        e.preventDefault();

        // Captura a URL do Elemento

        var href = $(this).attr('href');

        // Capturar titulo da caixa de dialog

        var htmlTitle = $(this).attr('title') == '' || $(this).attr('title') === undefined ? $(this).html() : $(this).attr('title');
        var dialogTitle = htmlTitle == '' ? $(this).attr('data-original-title') : htmlTitle;

        // Exibe o Modal de Dialog

        bootbox.dialog
        ({
            message: 'Deseja realmente executar esta aÃ§Ã£o ?',
            title: dialogTitle,
            buttons:
                {
                    danger:
                        {
                            label: '<i class="fa fa-times"></i> Cancelar',
                            className: "btn-danger",
                            callback: function () {
                            }
                        },
                    main:
                        {
                            label: '<i class="fa fa-check"></i> OK',
                            className: "btn-primary",
                            callback: function () {
                                // Exibir Modal Progesso

                                blockPage();

                                // Executa o Ajax

                                $.ajax
                                ({
                                    type: "GET",
                                    dataType: "json",
                                    url: href,
                                    success: function (json) {
                                        // Exibir Alerta

                                        if (json['message']) {
                                            setTimeout(function () {
                                                toastr[json['type']](json['message'], 'AtenÃ§Ã£o');

                                            }, 1000);
                                        }

                                        // Resposta com erro

                                        if (json['type'] == 'error') {
                                            setTimeout(function () {
                                                // Ocultar Modal Progesso

                                                $.unblockUI();

                                            }, 1500);
                                        }

                                        // Se retornar a url do redirecionamento

                                        if (json['redirect']) {
                                            setTimeout(function () {
                                                $(location).attr('href', json['redirect']);
                                            }, 2000);
                                        }
                                    }
                                });
                            }
                        }
                }
        });
    });


    // Dialog Ajax Rest Delete
    // -------------------------------------------------------------------
    $(document).on('click', '.afiliado-rest-delete', function(e)
    {

        //Reproduzir som ao abrir modal

        reproduzirSom('2');

        // Segura o click padrÃ£o do objeto
        e.preventDefault();

        // Captura a URL do Elemento
        var href = $(this).attr('href');

        // Capturar titulo da caixa de dialog
        var htmlTitle = $(this).attr('title') == '' || $(this).attr('title') === undefined ? $(this).html() : $(this).attr('title');
        var dialogTitle = htmlTitle == '' ? $(this).attr('data-original-title') : htmlTitle;


        function form_to_json (selector) {
            var ary = $(selector).serializeArray();
            var obj = {};
            for (var a = 0; a < ary.length; a++) obj[ary[a].name] = ary[a].value;
            return obj;
        }

        // Exibe o Modal de Dialog
        var html = "<form id='confirm-delete'>\n" +
            "    <div class=\"form-group\">\n" +
            "        <label>\n" +
            "            Para confirmar a exclusÃ£o digite a senha administrativa\n" +
            "            <input type='text' class=\"form-control\" name='password'/>\n" +
            "        </label>\n" +
            "    </div>\n" +
            "    <div class=\"form-group\">\n" +
            "        <label>\n" +
            "            Informe o motivo da exclusÃ£o\n" +
            "        </label>\n" +
            "        <textarea class=\"form-control\" name='motivo' style='width: 100%;'/>\n" +
            "    </div>\n" +
            "    <div class=\"form-group\">\n" +
            "        <p>O que deseja fazer com a rede do afiliado?</p>\n" +
            "        <div style=\"display: block;\">\n" +
            "            <label for=\"manter\" style=\"margin-right: 15px;\">\n" +
            "                <input id=\"manter\" checked type=\"radio\" name=\"acao\" value=\"manter\"> Manter posiÃ§Ã£o\n" +
            "            </label>\n" +
            "            <label for=\"perder\">\n" +
            "                <input id=\"perder\" type=\"radio\" name=\"acao\" value=\"perder\"> Perder posiÃ§Ã£o\n" +
            "            </label>\n" +
            "        </div>\n" +
            "\n" +
            "    </div>\n" +
            "</form>\n";

        bootbox.confirm({
            title: dialogTitle,
            message: html,
            buttons: {
                confirm: {
                    label: '<i class="fa fa-check"></i> OK',
                    className: "btn-primary",
                },
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancelar',
                    className: "btn-danger pull-left",
                }
            },
            callback: function (result) {
                var form = form_to_json("form#confirm-delete");

                if (result) {

                    // Exibir modal progesso
                    blockPage();

                    // Executa o Ajax
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        data: form,
                        url: href,
                        success: function (json) {

                            // Exibir alerta
                            if (json['message']) {
                                setTimeout(function () {
                                    toastr[json['type']](json['message'], 'AtenÃ§Ã£o');
                                }, 400);
                            }

                            // Resposta com erro
                            if (json['type'] === 'error') {
                                setTimeout(function () {
                                    $.unblockUI();
                                }, 2000);
                            }

                            // Se retornar a url do redirecionamento
                            if (json['redirect']) {
                                setTimeout(function () {
                                    $(location).attr('href', json['redirect']);
                                }, 1800);
                            }
                        }
                    });
                }
            }
        });
    });

    // Dialog Ajax Rest Delete
    // -------------------------------------------------------------------
    $(document).on('click', '.ajax-rest-delete', function(e)
    {
        //Reproduzir som ao abrir modal
        
        reproduzirSom('2');
        
        // Segura o click padrÃ£o do objeto

        e.preventDefault();

        // Captura a URL do Elemento

        var href = $(this).attr('href');

        // Capturar titulo da caixa de dialog

        var htmlTitle   = $(this).attr('title') == '' || $(this).attr('title') === undefined ? $(this).html() : $(this).attr('title');
        var dialogTitle = htmlTitle == '' ? $(this).attr('data-original-title') : htmlTitle;

        // Exibe o Modal de Dialog

        bootbox.dialog
        ({
            message: 'Tem certeza que deseja deletar esse registro? <br><br> <div class="alert alert-red"> CUIDADO!!! ESTA AÃ‡ÃƒO Ã‰ IRREVERSÃVEL </div>',
            title: dialogTitle,
            buttons:
            {
                danger:
                {
                    label: '<i class="fa fa-times"></i> Cancelar',
                    className: "btn-red pull-left",
                    callback: function() { }
                },
                main:
                {
                    label: '<i class="fa fa-check"></i> OK',
                    className: "btn-primary",
                    callback: function()
                    {
                        // Exibir modal progesso

                        blockPage();

                        // Executa o Ajax

                        $.ajax
                        ({
                            type: 'DELETE',
                            dataType: 'json',
                            url: href,
                            success: function(json)
                            {
                                // Exibir alerta

                                if(json['message'])
                                {
                                    setTimeout(function()
                                    {
                                        toastr[json['type']](json['message'], 'AtenÃ§Ã£o');

                                    }, 400);
                                }

                                // Resposta com erro

                                if(json['type'] == 'error')
                                {
                                    setTimeout(function()
                                    {
                                        // Ocultar modal progesso

                                        $.unblockUI();

                                    }, 2000);
                                }

                                // Se retornar a url do redirecionamento

                                if(json['redirect'])
                                {
                                    setTimeout(function(){ $(location).attr('href', json['redirect']); }, 1800);
                                }
                            }
                        });
                    }
                }
            }
        });
    });


    // Form Submit via Ajax
    // -------------------------------------------------------------------
    $(document).on('click', '.ajax-rest-post', function (evt) {
        //Reproduzir som ao abrir modal
        
        reproduzirSom('2');

        // Segura o comportamento padrÃ£o do objeto
        evt.preventDefault();

        // Captura o botao submit

        var button = $(this);

        // Open confirmation

        if (button.attr('data-confirm') == 'true') {
            $('#ajaxModal').addClass('hidden');

            // Exibe o Modal de Dialog

            bootbox.dialog
            ({
                message: 'Tem certeza que deseja continuar ?',
                title: button.dialogTitle(),
                buttons:
                    {
                        danger:
                            {
                                label: '<i class="fa fa-times"></i> Cancelar',
                                className: "btn-danger pull-left",
                                callback: function () {
                                    $('#ajaxModal').removeClass('hidden');
                                }
                            },
                        main:
                            {
                                label: '<i class="fa fa-check"></i> OK',
                                className: "btn-primary",
                                callback: function () {
                                    $('#ajaxModal').removeClass('hidden');

                                    submitPost(button);
                                }
                            }
                    }
            });
        } else {
            submitPost(button);
        }
    });


    // Processar Post
    // ------------------------
    function submitPost(button) {
        // Desativa o botao submit

        button.prop('disabled', true);

        // Captura do formulario pai

        var parentForm = button.parents('form:first');

        // Alterar propriedades do formulario

        parentForm.attr('method', 'POST').attr('target', 'upload-iframe').attr('enctype', 'multipart/form-data');

        // Adicionar iFrame no Body

        $('body').append('<iframe name="upload-iframe" id="upload-iframe" class="hidden"></iframe>');

        // Exibir modal progesso

        blockPage();

        // Submit form

        parentForm.submit();

        // Capturar resposta do iframe ao concluir pedido

        $('#upload-iframe').bind('load', function (evt) {
            //Segura o comportamento padrÃ£o do objeto

            evt.preventDefault();

            // Capturar resposta

            textResponse = $('#upload-iframe').contents().text();

            // Remove o iframe (evita submit duplicado)

            $('#upload-iframe').remove();

            // Remover modal progesso

            setTimeout(function () {
                $.unblockUI();
            }, 100);

            // Validar resposta

            var isJson = true;
            try {
                // Converter para json

                var json = jQuery.parseJSON(textResponse);
            } catch (err) {
                isJson = false;

                toastr.error('Ocorreu um erro ao processar a requisiÃ§Ã£o. Por favor entre em contato com o administrador', 'AtenÃ§Ã£o');

                // Reativa o Botao Submit

                setTimeout(function () {
                    button.prop('disabled', false);
                }, 100);
            }

            // Verificar resposta

            if (isJson == true) {
                // Trigger event

                var ajaxPostEvent = new CustomEvent('ajaxPost',
                    {
                        detail: {
                            data: json,
                            form: parentForm
                        }
                    });
                window.dispatchEvent(ajaxPostEvent);

                // Remove as classes de erro

                $('.has-error').each(function () {
                    $(this).removeClass('has-error');
                });

                // Remove as mensagens de validaÃ§Ã£o

                $('label.validation').each(function () {
                    // Insere a mensagem de erro

                    $(this).remove();
                });

                // Exibir Alerta

                if (json['message']) {
                    toastr[json['type']](json['message'], 'AtenÃ§Ã£o');
                }

                // Validation Errors

                if (json['validation']) {
                    // Exibe o aviso de erro em cada campo

                    $.each(json['validation'], function (key, value) {
                        // Capturar elemento pai

                        var parent = $(parentForm).find('[name="' + key + '"],[name="' + key + '[]"]').parents('div:first');

                        // Verifica qual o tipo do elemento pai

                        if (parent.hasClass('input-group') || parent.hasClass('radio') || parent.hasClass('checkbox')) {
                            var parent = $(parentForm).find('[name="' + key + '"],[name="' + key + '[]"]').parents('div:first').parent();
                        } else {
                            var parent = $(parentForm).find('[name="' + key + '"],[name="' + key + '[]"]').parents('div:first');
                        }

                        // Insere a mensagem de erro

                        $(parent).append('<label class="validation text-danger">' + value + '</label>');
                        $(parent).children('.validation').removeClass('hidden');

                        // Insere classe de erro no form-group

                        $(parent).addClass('has-error');
                    });
                }

                // Se retornar a url do redirecionamento

                if (json['redirect']) {
                    if (typeof button.attr('data-redirect') === 'undefined') {
                        setTimeout(function () {
                            $(location).attr('href', json['redirect']);
                        }, 1500);
                    } else {
                        setTimeout(function () {
                            $(location).attr('href', button.attr('data-redirect'));
                        }, 1500);
                    }
                }
            }

            // Reativa o botao submit

            setTimeout(function () {
                // Reativa o Botao Submit

                button.prop('disabled', false);

                // Ocultar Modal Progesso

                $.unblockUI();

            }, 2500);
        });
    }


    // Remover alerta de erro ao alterar campo
    // --------------------------------------------------
    $(document).on('change keyup', '.has-error .form-control', function (e) {
        $(this).parents('.has-error').find('.validation').remove();
        $(this).parents('.has-error').removeClass('has-error');
    });


    // Validar campo
    // --------------------------------------------------
    $(document).on('click', '.ajax-validate', function (e) {
        
        //Reproduzir som ao abrir modal
        
        reproduzirSom('2');

        // Capturar botÃ£o

        var button = $(this);

        // Capturar formulario pai

        var parentForm = button.parents('form:first');

        // Post Data

        var postData = {};

        // Source title

        postData.receiver = $(parentForm).find('input[name="' + button.attr('data-source') + '"]').val();

        // Executa o Ajax

        $.ajax
        ({
            type: 'POST',
            dataType: 'json',
            data: postData,
            url: button.attr('data-url'),
            success: function (json) {
                // Capturar elemento pai

                parent = parentForm.find('[name="' + button.attr('data-source') + '"]').parent();

                // Destroy previous popover

                parent.popover('destroy');

                // Tipo de validacao

                if (json['validate'] == 'true') {
                    var validate = 'success';

                    // Popover message

                    var popoverMsg = '<div class="alert alert-success nomargin" role="alert"><strong>Sucesso!</strong> Afiliado validado.</div>';
                } else {
                    var validate = 'error';

                    // Popover message

                    var popoverMsg = '<div class="alert alert-danger nomargin" role="alert"><strong>Oops!</strong> Afiliado invÃ¡lido.</div>';
                }

                // Show popover message

                parent.popover({placement: 'bottom', content: popoverMsg, html: true}).popover('show');

                // Hide popover

                setTimeout(function () {
                    parent.popover('destroy');
                }, 2000);

                // Verifica qual o tipo do elemento pai

                if (parent.hasClass('input-group') || parent.hasClass('radio') || parent.hasClass('checkbox')) {
                    // Insere classe de erro no form-group

                    $('[name="' + button.attr('data-source') + '"]').parent().parent().removeClass('has-error has-success').addClass('has-' + validate);
                } else {
                    // Insere classe de erro no form-group

                    $('[name="' + button.attr('data-source') + '"]').parent().removeClass('has-error has-success').addClass('has-' + validate);
                }
            }
        });
    });


    // Deletar notificacoes
    // -------------------------------------------------------------------
    $(document).on('click', '.notifications .dropdown-menu .delete-notificacoes', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.notifications .dropdown-menu .delete-all-notifications', function (e) {
        e.stopPropagation();

        var $button = $(this);

        $button.attr('disabled', 'disabled');

        $('.notifications .dropdown-menu .delete-notificacoes').each(function () {
            setTimeout(function () {
                $(this).trigger('click');
            }, 300);
        });

        $button.removeAttr('disabled');
    });
    $(document).on('click', '.delete-notificacoes', function (e) {
        // Segura o comportamento padrÃ£o do objeto

        e.preventDefault();

        // Capturar o botao submit

        var button = $(this);

        // Executa o Ajax

        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: button.attr('href'),
            async: false,
            success: function (json) {
                // Verificar resposta

                if (json['type'] == 'success') {
                    // Dropdown pai

                    var dropdown = button.parents('.notifications');

                    // Remover container pai

                    button.parents('.list-group-item').fadeOut('normal', function () {
                        $(this).remove();

                        // Recontar notificacoes

                        setTimeout(function () {
                            var countItens = dropdown.find('.list-group-item').length;

                            dropdown.find('.count').html(countItens);
                        }, 200);
                    });
                }
            }
        });
    });


    // Ajax popover content
    // -------------------------------------------------------------------
    $(document).on('mouseenter', '.ajax-popover', function () {
        // Capture object

        var elem = $(this);

        // Get data using ajax

        setTimeout(function () {
            $.get(elem.attr('data-info-url'), function (data) {
                elem.popover({placement: 'auto top', content: data, html: true}).popover('show');
            });

        }, 1500);

    }).on('mouseleave', '.ajax-popover', function () {
        // Hide all popovers

        $('.ajax-popover').each(function () {
            // Hide popover

            $(this).popover('destroy');
        });
    });


    // Ativar 'enter' ao fazer submit no form
    // -------------------------------------------------------------------
    $(document).on('keydown', 'input[type=text], input[type=email], input[type=number], input[type=password], input[type=search]', function (event) {
        // Get 'enter' press

        if (event.keyCode == 13) {
            // Simulate click

            $(this).closest('form').find('button.ajax-rest-post').click();
        }
    });


    // Toogle Ajax Rest Get
    // -------------------------------------------------------------------
    $('.ajax-toggle-rest-get').change(function () {
        // Ajax url

        var ajaxUrl = $(this).attr('data-url');

        // Query data

        if ($(this).prop('tagName') == 'SELECT' || ($(this).prop('tagName') == 'INPUT' && $(this).prop('type') == 'radio')) {
            var data = '?' + $(this).attr('name') + '=' + $(this).val();
        } else {
            if ($(this).is(':checked')) {
                var data = '?' + $(this).attr('name') + '=1';
            } else {
                var data = '?' + $(this).attr('name') + '=0';
            }
        }

        // Reload

        var reload = $(this).attr('data-reload') == 'true' ? true : false;

        // Exibir Modal Progesso

        blockPage();

        // Executa o Ajax

        $.ajax
        ({
            type: 'GET',
            dataType: 'json',
            url: ajaxUrl + data,
            success: function (json) {
                // Exibir Alerta

                if (json['message']) {
                    toastr[json['type']](json['message'], 'AtenÃ§Ã£o');
                }

                // Resposta com erro

                if (json['type'] == 'error') {
                    setTimeout(function () {
                        // Ocultar Modal Progesso

                        $.unblockUI();

                    }, 2000);
                }

                // Se retornar a url do redirecionamento

                if (reload == true) {
                    location.reload(true);
                } else if (json['redirect']) {
                    setTimeout(function () {
                        $(location).attr('href', json['redirect']);
                    }, 1500);
                }
            }
        });
    });


    // Toogle Ajax Rest Get
    // -------------------------------------------------------------------
    $(document).on('click', '.ajax-reload-captcha', function (event) {
        //Reproduzir som ao abrir modal
        
        reproduzirSom('2');
        
        // Get image

        var img = $(this).parents('.form-group').find('.img-captcha');

        // Get current url

        var src = $(img).attr('src');

        // Base url

        var url = src.split('?')[0];

        var vars = [];

        var params = src.split('?')[1];

        if (params != undefined) {
            url = url + '?';

            params = params.split('&');

            for (var i = 0; i < params.length; i++) {
                hash = params[i].split('=');

                if (hash[0] != 'timestamp') {
                    url = url + hash[0] + '=' + hash[1] + '&';
                }
            }
        }

        $(img).attr('src', url + 'timestamp=' + new Date().getTime());
    });


    // Copy to clipboard
    // -----------------
    $(document).on('click', '.input-group-copy .btn', function () {
        var copyText = $(this).parents('.input-group-copy').find('input[type="text"]');

        $(copyText).select();

        document.execCommand('Copy');

        $(this).attr('title', 'Texto copiado!').tooltip('show');

        setTimeout(function () {
            $(this).tooltip('destroy');
        }, 300);
    });


    // Capturar post via ajax
    // ----------------------
    window.addEventListener('ajaxPost', function (event) {
        // Verificar erro

        if (event.detail.data.type == 'error') {
            // Recarregar captcha

            var captchaButton = $(event.detail.form).find('.ajax-reload-captcha');

            if (captchaButton.length > 0) {
                $(captchaButton).trigger('click');
            }
        }
    });


    // Extrair titulo da aÃ§Ã£o do botÃ£o
    // -------------------------------
    jQuery.fn.extend
    ({
        dialogTitle: function () {
            if ($(this).attr('title') == '' || $(this).attr('title') === undefined) {
                var htmlTitle = $(this).html();
            } else {
                var htmlTitle = $(this).attr('title');
            }

            if (htmlTitle == '') {
                return $(this).attr('data-original-title');
            }

            return htmlTitle;
        }
    });

        // NotificaÃ§Ã£o Alerta 
        function reproduzirSom(tipo){
            if(tipo == '1'){
                var audio = new Audio('/assets/global/audio/alerta1.ogg');
            }else{
                var audio = new Audio('/assets/global/audio/alerta2.ogg');
            }
            setTimeout(function() {
                audio.play();
            }, 300);
        };
        
 

});
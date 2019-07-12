
// Criar mensagem de processamento
// -------------------------------------------------------------------
function blockPage()
{
    $.blockUI
    ({
        message: '<div id="page-block"><div class="block-msg"><div class="loader">&nbsp;</div></div></div>',
        css:
        {
            height: '107px',
            background: 'none',
            border: 'none',
            padding: '0px',
            '-webkit-border-radius': '0px',
            '-moz-border-radius': '0px',
            opacity: 1,
            'z-index': 2010
        },
        overlayCSS:
        {
            opacity: 0.4,
            'z-index': 2000,
            'background-color': '#000000'
        }
    });
}


// Inicializar Player de Audio
// ---------------------------
function audioPlayerInit()
{
    audiojs.events.ready(function() {
        var as = audiojs.createAll();
    });
}


// Inicializar Mascaras de FormataÃ§Ã£o
// -------------------------------------------------------------------
function masksInit()
{
    // Date BR
    $(document).on('focus', '.date_br', function()
    {
        $(this).mask('99/99/9999');
    });

    // Date US
    $(document).on('focus', '.date_us', function()
    {
        $(this).mask('9999-99-99');
    });

    // DateTime BR
    $(document).on('focus', '.datetime_br', function()
    {
        $(this).mask('99/99/9999 99:99:99');
    });

    // DateTime US
    $(document).on('focus', '.datetime_us', function()
    {
        $(this).mask('9999-99-99 99:99:99');
    });

    // Telefone

    $(document).on('focus', '.tel', function()
    {
        $(this).mask('(99)99999-9999');

    }).on('blur', '.tel', function()
    {
        if($(this).val().replace(/[^\d.]/g, '').length == 11)
        {
            $(this).mask('(99)99999-9999');
        }
        else
        {
            $(this).mask('(99)9999-9999');
        }

    }).on('ready', '.tel', function()
    {
        if($(this).val().replace(/[^\d.]/g, '').length == 11)
        {
            $(this).mask('(99)99999-9999');
        }
        else
        {
            $(this).mask('(99)9999-9999');
        }
    });


    // CPF

    $(document).on('focus', 'input.cpf', function()
    {
        $(this).mask('99999999999');
    });

    // CNPJ

    $(document).on('focus', 'input.cnpj', function()
    {
        $(this).mask('99999999999999');
    });

    // Documento

    $(document).on('focus', 'input.documento', function()
    {
        $(this).unmask().attr('maxlength', 18);

        var documento = $(this).val().replace(/\D/g, '');

        $(this).val(documento);

    }).on('blur', 'input.documento', function()
    {
        $(this).unmask().attr('maxlength', 18);

        var documento = $(this).val().replace(/\D/g, '');

        $(this).val(documento);

        if(documento.length == 11)
        {
            $(this).mask('99999999999');
        }
        else
        {
            $(this).mask('99999999999999');
        }
    });

    // CEP

    $(document).on('focus', 'input.cep', function()
    {
        $(this).mask('99999999');
    });

    // No Inteiro

    $(document).on('focus', 'input.int1', function()
    {
        $(this).mask('9');
    }).on('focus', 'input.int2', function()
    {
        $(this).mask('99');
    }).on('focus', 'input.int3', function()
    {
        $(this).mask('999');
    }).on('focus', 'input.int4', function()
    {
        $(this).mask('9999');
    }).on('focus', 'input.int5', function()
    {
        $(this).mask('99999');
    }).on('focus', 'input.int6', function()
    {
        $(this).mask('999999');
    }).on('focus', 'input.int7', function()
    {
        $(this).mask('9999999');
    }).on('focus', 'input.int8', function()
    {
        $(this).mask('99999999');
    });

    // Decimal

    $(document).on('focus', 'input.decimal', function()
    {
        $(this).maskMoney({thousands : '', decimal : '.', precision: 2, allowZero: true});
    }).on('focus', 'input.decimal1', function()
    {
        $(this).maskMoney({thousands : '', decimal : '.', precision: 1, allowZero: true});
    }).on('focus', 'input.decimal3', function()
    {
        $(this).maskMoney({thousands : '', decimal : '.', precision: 3, allowZero: true});
    }).on('focus', 'input.decimal4', function()
    {
        $(this).maskMoney({thousands : '', decimal : '.', precision: 4, allowZero: true});
    }).on('focus', 'input.decimal5', function()
    {
        $(this).maskMoney({thousands : '', decimal : '.', precision: 5, allowZero: true});
    }).on('focus', 'input.decimal6', function()
    {
        $(this).maskMoney({thousands : '', decimal : '.', precision: 6, allowZero: true});
    }).on('focus', 'input.decimal7', function()
    {
        $(this).maskMoney({thousands : '', decimal : '.', precision: 7, allowZero: true});
    }).on('focus', 'input.decimal8', function()
    {
        $(this).maskMoney({thousands : '', decimal : '.', precision: 8, allowZero: true});
    });
}



// Inicializar Tooltip
// -------------------------------------------------------------------
function tooltipInit()
{
    // Tooltip
    // -------------------------------------------------------------------
    $(document).on('mouseover', '[data-rel="tooltip"],[data-toggle="tooltip"]', function() // Place Default
    {
        // ConfiguraÃ§Ãµes Globais
        $(this).tooltip({container: 'body'});

        // Exibir Tooltip
        $(this).tooltip('show');

    }).on('mouseout', '[data-rel="tooltip"],[data-toggle="tooltip"]', function()
    {
        // Ocultar Tooltip
        $(this).tooltip('hide');

    }).on('mouseover', '[data-rel="tooltip-left"],[data-toggle="tooltip-left"]', function() // Place Left
    {
        // ConfiguraÃ§Ãµes Globais
        $(this).tooltip({container: 'body', placement: 'left'});

        // Exibir Tooltip
        $(this).tooltip('show');

    }).on('mouseout', '[data-rel="tooltip-left"],[data-toggle="tooltip-left"]', function()
    {
        // Ocultar Tooltip
        $(this).tooltip('hide');

    }).on('mouseover', '[data-rel="tooltip-right"],[data-toggle="tooltip-right"]', function() // Place Right
    {
        // ConfiguraÃ§Ãµes Globais
        $(this).tooltip({container: 'body', placement: 'right'});

        // Exibir Tooltip
        $(this).tooltip('show');

    }).on('mouseout', '[data-rel="tooltip-right"],[data-toggle="tooltip-right"]', function()
    {
        // Ocultar Tooltip
        $(this).tooltip('hide');

    }).on('mouseover', '[data-rel="tooltip-top"],[data-toggle="tooltip-top"]', function() // Place Top
    {
        // ConfiguraÃ§Ãµes Globais
        $(this).tooltip({container: 'body', placement: 'top'});

        // Exibir Tooltip
        $(this).tooltip('show');

    }).on('mouseout', '[data-rel="tooltip-top"],[data-toggle="tooltip-top"]', function()
    {
        // Ocultar Tooltip
        $(this).tooltip('hide');

    }).on('mouseover', '[data-rel="tooltip-bottom"],[data-toggle="tooltip-bottom"]', function() // Place Bottom
    {
        // ConfiguraÃ§Ãµes Globais
        $(this).tooltip({container: 'body', placement: 'bottom'});

        // Exibir Tooltip
        $(this).tooltip('show');

    }).on('mouseout', '[data-rel="tooltip-bottom"],[data-toggle="tooltip-bottom"]', function()
    {
        // Ocultar Tooltip
        $(this).tooltip('hide');
    });


    // Popover
    // -------------------------------------------------------------------
    $(document).on('mouseover', '[data-rel="popover"],[data-toggle="popover"]', function() // Place Default
    {
        // ConfiguraÃ§Ãµes Globais
        $(this).popover({container: 'body'});

        // Exibir Popover
        $(this).popover('show');

    }).on('mouseout', '[data-rel="popover"],[data-toggle="popover"]', function()
    {
        // Ocultar Popover
        $(this).popover('hide');

    }).on('mouseover', '[data-rel="popover-left"],[data-toggle="popover-left"]', function() // Place Left
    {
        // ConfiguraÃ§Ãµes Globais
        $(this).popover({container: 'body', placement: 'left'});

        // Exibir Popover
        $(this).popover('show');

    }).on('mouseout', '[data-rel="popover-left"],[data-toggle="popover-left"]', function()
    {
        // Ocultar Popover
        $(this).popover('hide');

    }).on('mouseover', '[data-rel="popover-right"],[data-toggle="popover-right"]', function() // Place Right
    {
        // ConfiguraÃ§Ãµes Globais
        $(this).popover({container: 'body', placement: 'right'});

        // Exibir Popover
        $(this).popover('show');

    }).on('mouseout', '[data-rel="popover-right"],[data-toggle="popover-right"]', function()
    {
        // Ocultar Popover
        $(this).popover('hide');

    }).on('mouseover', '[data-rel="popover-top"],[data-toggle="popover-top"]', function() // Place Top
    {
        // ConfiguraÃ§Ãµes Globais
        $(this).popover({container: 'body', placement: 'top'});

        // Exibir Popover
        $(this).popover('show');

    }).on('mouseout', '[data-rel="popover-top"],[data-toggle="popover-top"]', function()
    {
        // Ocultar Popover
        $(this).popover('hide');

    }).on('mouseover', '[data-rel="popover-bottom"],[data-toggle="popover-bottom"]', function() // Place Bottom
    {
        // ConfiguraÃ§Ãµes Globais
        $(this).popover({container: 'body', placement: 'bottom'});

        // Exibir Popover
        $(this).popover('show');

    }).on('mouseout', '[data-rel="popover-bottom"],[data-toggle="popover-bottom"]', function()
    {
        // Ocultar Popover
        $(this).popover('hide');
    });
}
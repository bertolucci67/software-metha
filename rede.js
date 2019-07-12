/**
 * Navegar nas redes de afiliado
 *--------------------------------------------------*/
var globalRede = function()
{

    /**
     * Template de mensagem carregando
     *--------------------------------------------------*/

    spinnerBlock = '<div class="loading-message loading-message-boxed"><h3 class="nomargin"><i class="fa fa-spinner fa-spin"></i> Carregando</h3></div>';



    /**
     * Carregar rede ao iniciar pagina
     *--------------------------------------------------*/

    $(document).ready(function()
    {
        // URL

        var redeUrl = $('#pyramid-holder').attr('data-url');

        // Load content

        $('#pyramid-holder').load(redeUrl);
    });



    /**
     * Carregar rede ao clicar
     *--------------------------------------------------*/

    $(document).on('click', '.ajax-rede', function()
    {
        // URL

        var redeUrl = $(this).attr('data-url');

        // Mensagem de aguarde

        $('#pyramid-holder').block
        ({
            message: spinnerBlock,
            css: { border: 'none', background: 'transparent' }
        });

        // Load content

        $('#pyramid-holder').load(redeUrl);
    });
};
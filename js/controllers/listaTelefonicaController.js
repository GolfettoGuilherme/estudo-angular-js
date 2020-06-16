angular.module('listaTelefonica').controller("listaTelefonicaCtrl",function($scope, contatosAPI,contatos, operadoras, serialGenerator){
    $scope.app = "Lista Telefonica";
    $scope.contatos = contatos.data;
    $scope.operadoras = operadoras.data;

    var init = function(){
        calcularImpostos($scope.contatos);
    }

    var calcularImpostos = function(contatos){
        contatos.forEach(function(contato){
            contato.operadora.precoComImposto = calcularPreco(contato.operadora.preco);
        });
    }
    
    
    $scope.adicionarContato = function(contato){
        contato.id = serialGenerator.generateId()
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).then(function(data){
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
        
    }

    $scope.apagarContatos = async function(contatos){
        const aDeletar = contatos.filter(function(contato){
            if(contato.selecionado) return contato;
        });

        for(const el of aDeletar){
            await contatosAPI.deleteContato(el).then(function(data){
                console.log(data);
            });
        }
        carregarContatos();
    }

    $scope.verificarContatoSelecionado = function(contatos){
        $scope.hasContatoSelecionado =  contatos.some(function(contato){
            return contato.selecionado;
        });
    }

    $scope.ordernarPor = function(campo){
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    var calcularPreco = function(preco){
        var imposto = 1.2;
        return preco * imposto;
    }

    $scope.classe1 = "selecionado";
    $scope.classe2 = "negrito";

    init();
    
});
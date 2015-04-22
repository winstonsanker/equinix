angular.module('mobileCatalogApp', [])
  .controller('MobileController', ['$http',function($http) {
  	var scope=this;
  	this.searchedProduct={};

  	this.saveProduct=function(){
  		console.dir(this.searchedProduct);
  	};

  	this.updateSearchedProduct=function(product){
  		scope.searchedProduct=product;
  	}

  }]).directive('jqAutocomplete', ['$http',function($http) {
      return {
          restrict: 'A',
          scope:{
                  searchedProduct:'=product'
          },
          link: function(scope, elm, attrs) {
              var jqueryElm = $(elm);
              $(jqueryElm).autocomplete({
                source: ['sanker','madhuri','pooja','swathi'],
                select: function( event, ui ) {
                  var product=ui.item;
                  console.log(product);
                  $http.get('/getProductDetails?productId=4').
                    success(function(product) {
                        console.log('product detail from server :');
                     	console.dir(product);
                     	scope.searchedProduct=product;
                    }).error(function(err){
                        console.log('product detail from server failure');
                        console.dir(err);
                    });
                }
              });
          }
      };
  }]);

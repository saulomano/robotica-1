'use strict';
import _ from 'lodash';
export default angular
    .module('robotica.social.components.desafioCard', [])
    .directive('desafioCard', desafioCard)
    .name;

class DesafioCardController {
    /*@ngInject*/
    constructor($scope, $element, $state, Restangular){
        this.$scope = $scope;
        this.$element = $element;
        this.$state = $state;
        this.Restangular = Restangular;
        this.$element.addClass('resource-card');
        this.deleteUserBoolean = false;
        this.desafio = this.$scope.desafio;
        this.editable = this.$scope.editable === true;
    }

    editDesafio() {
        this.$state.go(`social.desafio`, { uid: this.desafio._id });
    }

    deleteDesafio(_id) {
        this.Desafio = this.Restangular.one('desafios', _id);
        this.Desafio
            .remove()
            .then( data => {
                this.$state.go(this.$state.current, {}, {reload: true});
            })
            .catch( err => {
                throw err;
            });
    }
}

function desafioCard($log){
    'ngInject';

    return {
        restrict: 'E',
        controller: DesafioCardController,
        controllerAs: '$ctrl',
        scope: {
            desafio: '=',
            editable: '='
        },
        template: require('./desafioCard.html')
    }
}
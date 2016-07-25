"use strict";

angular.module('confusionApp').controller('MenuController', ["$scope", "MenuFactory", function($scope, MenuFactory){
    $scope.tab = 1;
    $scope.filtText = "";
    $scope.showDetails = false;
    $scope.dishes = MenuFactory.getDishes();
    $scope.select = function(setTab){
        $scope.tab = setTab;
        if ($scope.tab === 2) {
            $scope.filtText = "appetizer";
        } else if ($scope.tab === 3) {
            $scope.filtText = "main";
        } else if ($scope.tab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };
    $scope.isSelected = function(checkTab) {
        return ($scope.tab === checkTab);
    };
    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    }
}]).controller("ContactController", ["$scope", function($scope){
    $scope.feedback = {
        myChannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: "",
    };
    var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
}]).controller("FeedbackController", ["$scope", function($scope){
    $scope.sendFeedback = function(){
        if ($scope.feedback.agree && ($scope.feedback.myChannel == "") && !$scope.feedback.myChannel) {
            $scope.invalidChannelSelection = true;
            console.log("Incorrect");
        } else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                myChannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: "",
            };
            $scope.feedback.myChannel = "";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
}]).controller('DishDetailController', ["$scope", "$stateParams", "MenuFactory", function($scope, $stateParams, MenuFactory) {
    var sortBy = "";        
    $scope.dish = MenuFactory.getDish(parseInt($stateParams.id, 10));
    $scope.sortBy = sortBy;
}]).controller("CommentController", ["$scope", function($scope){
    
    $scope.cmtStatus = {
        name: "",
        rating: "5",
        cmt: ""
    }

    $scope.sendComment = function() {
        var newCmt = {
            rating: parseInt($scope.cmtStatus.rating),
            comment: $scope.cmtStatus.cmt,
            author: $scope.cmtStatus.name,
            date: "" + Date.now()
        }
        $scope.dish.comments.push(newCmt);
        $scope.cmtStatus = {
            name: "",
            rating: "5",
            cmt: ""
        }        
        $scope.cmtForm.$setPristine();
    }
}]).controller("AboutController", ["$scope", "CorporateFactory", function($scope, CorporateFactory){
    $scope.leaderships = CorporateFactory.getLeaders();
}]).controller("IndexController", ["$scope", "MenuFactory", "CorporateFactory", function($scope, MenuFactory, CorporateFactory){
    $scope.dish = MenuFactory.getDish(0);
    $scope.promotion = MenuFactory.getPromotion(0);
    $scope.leadership = CorporateFactory.getLeader(3);
}]);
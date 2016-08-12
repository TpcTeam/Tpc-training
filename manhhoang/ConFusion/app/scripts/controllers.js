"use strict";

angular.module('confusionApp').controller('MenuController', ["$scope", "MenuFactory", function($scope, MenuFactory){
    $scope.tab = 1;
    $scope.filtText = "";
    $scope.showDetails = false;
    $scope.showMenu = true;
    $scope.message = "Loading ...";
    $scope.dishes = MenuFactory.getDishes().query(
        function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );
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
    };
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
}]).controller("FeedbackController", ["$scope", "FeedbackFactory", function($scope, FeedbackFactory){
    $scope.sendFeedback = function(){
        if ($scope.feedback.agree && ($scope.feedback.myChannel === "") && !$scope.feedback.myChannel) {
            $scope.invalidChannelSelection = true;
            console.log("Incorrect");
        } else {
            var feedbacks = FeedbackFactory.getFeedbacks().save($scope.feedback);
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
    $scope.dish = {};
    $scope.showDish = true;
    $scope.message="Loading ...";
    $scope.dish = MenuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
        function(response){
            $scope.dish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );
    $scope.sortBy = sortBy;
}]).controller("CommentController", ["$scope", "MenuFactory", function($scope, MenuFactory){
    
    $scope.cmtStatus = {
        name: "",
        rating: "5",
        cmt: ""
    };

    $scope.sendComment = function() {
        var newCmt = {
            rating: parseInt($scope.cmtStatus.rating),
            comment: $scope.cmtStatus.cmt,
            author: $scope.cmtStatus.name,
            date: new Date().toISOString()
        };
        $scope.dish.comments.push(newCmt);
        MenuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
        $scope.cmtStatus = {
            name: "",
            rating: "5",
            cmt: ""
        };        
        $scope.cmtForm.$setPristine();
    };
}]).controller("AboutController", ["$scope", "CorporateFactory", function($scope, CorporateFactory){
    $scope.showLeadership = false;
    $scope.leadershipMessage = "Loading ...";
    $scope.leaderships = CorporateFactory.getLeaders().query().$promise.then(
        function(response){
            $scope.leaderships = response;
            $scope.showLeadership = true;
        },
        function(response) {
            $scope.leadershipMessage = "Error: "+response.status + " " + response.statusText;
        }
    );;
}]).controller("IndexController", ["$scope", "MenuFactory", "CorporateFactory", function($scope, MenuFactory, CorporateFactory){
    $scope.dish = {};
    $scope.showDish = false;
    $scope.showPromotion = false;
    $scope.showLeadership = false;
    $scope.dishMessage = "Loading ...";
    $scope.promotionMessage = "Loading ...";
    $scope.leadershipMessage = "Loading ...";
    $scope.dish = MenuFactory.getDishes().get({id:0}).$promise.then(
        function(response){
            $scope.dish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.dishMessage = "Error: "+response.status + " " + response.statusText;
        }
    );
    $scope.promotion = MenuFactory.getPromotion().get({id:0}).$promise.then(
        function(response){
            $scope.promotion = response;
            $scope.showPromotion = true;
        },
        function(response) {
            $scope.promotionMessage = "Error: "+response.status + " " + response.statusText;
        }
    );
    $scope.leadership = CorporateFactory.getLeaders().get({id:3}).$promise.then(
        function(response){
            $scope.leadership= response;
            $scope.showLeadership = true;
        },
        function(response) {
            $scope.leadershipMessage = "Error: "+response.status + " " + response.statusText;
        }
    );
}]);
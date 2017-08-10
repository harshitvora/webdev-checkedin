(function () {
    angular
        .module("CheckedIn")
        .factory("userService", userService);
    function userService($http) {

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserByUserId": findUserByUserId,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUserId(userId) {
            return $http.get("/api/user/"+userId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" +username)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
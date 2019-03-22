

var UserProfile = (function() {
    var email = "";
    var username = "";
    var password = "";
    var getEmail = function() {
      return email;
    };
    var getUsername = function() {
        return username;
    };
    var getPassword = function() {
        return password;
    };
    var setEmail = function(name) {
        email = name;
    };
    var setUsername = function(name) {
        username = name;
    };
    var setPassword = function(name) {
        password = name;
    };
  
    return {
      getEmail: getEmail,
      setEmail: setEmail,
      getUsername: getUsername,
      setUsername: setUsername,
      getPassword: getPassword,
      setPassword: setPassword,
    }
  
})();
  
export default UserProfile;
  
const AmazonCognitoIdentity = require("amazon-cognito-identity-js-node");
const { POOL_ID, CLIENT_ID, REGION, IDENTITY_POOL_ID } = require("../config");

const poolData = {
  UserPoolId: POOL_ID,
  ClientId: CLIENT_ID,
};

const pool_region = REGION;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.Register = function (body, callback) {
  var { name, email, password } = body;

  var attributeList = [];

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email,
    })
  );

  userPool.signUp(name, password, attributeList, null, function (err, result) {
    if (err) return callback(err);

    var cognitoUser = result.user;
    callback(null, cognitoUser);
  });
};

exports.Login = function (body, callback) {
  var { name, password } = body;

  var authenticationData = {
    Username: name,
    Password: password,
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  var userData = {
    Username: name,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSucess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();

      AWS.config.region = pool_region;

      var loginURL = `cognito-idp.us-east2.amazonaws.com/${IDENTITY_POOL_ID}`;

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID,
        Logins: {
          [loginURL]: result.getIdToken().getJwtToken(),
        },
      });
      AWS.config.credentials.refresh((error) => {
        if (error) {
          callback(null, error);
        } else {
          return;
        }
      });
    },
    onFailure: function (err) {
      callback(null, err.message);
    },
  });
};

exports.Confirm = function (body, callback) {
  var { name, confirmationCode } = body;

  var userData = {
    Username: name,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  if (body.resend) {
    console.log("resend");
    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) return callback(err);
      callback(null, result);
    });
    return;
  }

  cognitoUser.confirmRegistration(
    confirmationCode,
    true,
    function (err, result) {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

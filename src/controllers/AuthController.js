const authService = require("../services/AuthService");

exports.register = function (req, res) {
  authService.Register(req.body, function (err, result) {
    if (err) return res.send(err);
    res.send(result);
  });
};

exports.login = function (req, res) {
  authService.Login(req.body, function (err, result) {
    if (err) res.send(err);
    console.log("success");
    res.json({ msg: "bad boy", result });
  });
};

exports.confirm = function (req, res) {
  authService.Confirm(req.body, function (err, result) {
    if (err) return res.send(err);
    res.send(result);
  });
};

exports.validate_token = function (req, res) {
  let validate = authService.Validate(req.body.token, function (err, result) {
    if (err) res.send(err.message);
    res.send(result);
  });
};

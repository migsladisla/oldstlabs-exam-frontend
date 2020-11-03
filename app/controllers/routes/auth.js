const express = require("express");
const router = express.Router();
const axios = require("axios");
const { setAccessToken, setRefreshToken } = require("./../common/accessToken");
const { hidePublicRoutes } = require("./../common/authorization");

const { setSession, destroySession } = require("./../common/session");

/* GET Login page */
router.get("/login", hidePublicRoutes, (req, res) => {
	res.render("login", {
		title: "Old St. Bookings | Login",
		errors: "",
	});
});

/* POST Login - Created this route for session and jwt setting */
router.post("/login", (req, res) => {
	axios
		.post("http://localhost:8010/api/login", req.body)
		.then((loginResult) => {
			setSession(req.session, loginResult.data.name);
			setAccessToken(res, loginResult.data.accessToken);
			setRefreshToken(res, loginResult.data.refreshToken);

			res.json({ status: "success" });
		})
		.catch((err) => {
			res.status(err.response.status).send(err.response.data);
		});
});

/* POST Logout */
router.post("/logout", (req, res) => {
	axios
		.delete("http://localhost:8010/api/logout")
		.then((result) => {
			destroySession(req.session);
			setAccessToken(res, "");
			setRefreshToken(res, "");

			res.json({ status: "success" });
		})
		.catch((err) => {
			res.status(err.response.status).send(err.response.data);
		});
});

/* GET Register page */
router.get("/register", hidePublicRoutes, (req, res) => {
	res.render("register", {
		title: "Old St. Bookings | Sign Up",
		message: "Register page",
	});
});

/* POST Register */
router.post("/register", (req, res) => {
	const { first_name, last_name, email, password } = req.body;
	const registrationCreds = {
		first_name,
		last_name,
		email,
		password,
	};

	axios
		.post("http://localhost:8010/api/register", registrationCreds)
		.then((result) => {
			const loginCreds = {
				email,
				password,
			};

			axios
				.post("http://localhost:8010/api/login", loginCreds)
				.then((loginResult) => {
					setSession(req.session, loginResult.data.name);
					setAccessToken(res, loginResult.data.accessToken);
					setRefreshToken(res, loginResult.data.refreshToken);

					res.json({ status: "success" });
				})
				.catch((err) => {
					res.status(err.response.status).send(err.response.data);
				});
		})
		.catch((err) => {
			res.status(err.response.status).send(err.response.data);
		});
});

module.exports = router;
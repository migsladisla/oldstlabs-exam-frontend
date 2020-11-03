const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getAccessToken } = require("./../common/accessToken");
const { hidePrivateRoutes } = require("./../common/authorization");

/* GET home page */
router.get("/profile", (req, res) => {
	getAccessToken(req, res)
		.then((accessToken) => {
			axios
				.get("http://localhost:8010/api/profile/appointments", {
					headers: {
						Authorization: accessToken,
					},
				})
				.then((result) => {
					res.render("profile", {
						title: "Old St. Bookings | Profile",
                        appointments: result.data,
                        name: req.session.user.name,
						authenticated: true,
					});
				})
				.catch((err) => {
					res.redirect("login");
				});
		})
		.catch((err) => {
			res.redirect("login");
		});
});

/* GET filter appointments page */
router.get("/profile/appointments", (req, res) => {
    const { start, end } = req.query;

	getAccessToken(req, res)
		.then((accessToken) => {
			axios
				.get(`http://localhost:8010/api/profile/appointments?start=${start}&end=${end}`, {
					headers: {
						Authorization: accessToken,
					},
				})
				.then((result) => {
					res.render("appointments/filtered", {
						title: "Old St. Bookings | Profile",
						appointments: result.data,
                        name: req.session.user.name,
						authenticated: true,
					});
				})
				.catch((err) => {
					res.redirect("login");
				});
		})
		.catch((err) => {
			res.redirect("login");
		});
});

/* GET appointment view */
router.get("/profile/appointment/create", hidePrivateRoutes, (req, res) => {
	res.render("appointments/create", {
		title: "Old St. Bookings | Book Appointment",
		authenticated: true,
	});
});

/* CREATE appointment */
router.post("/create_appointment", (req, res) => {
	const { date, hours, comments } = req.body;
	const values = {
		comments,
		start_date: `${date[0]}T${hours[0]}:00`,
		end_date: `${date[1]}T${hours[1]}:00`,
	};

	if (date[0] == "" || date[1] == "" || hours[0] == "" || hours[1] == "") {
        res.status(err.response.status).send(err.response.data);
	}

	getAccessToken(req, res)
		.then((accessToken) => {
			axios
				.post("http://localhost:8010/api/appointment", values, {
					headers: {
						Authorization: accessToken,
					},
				})
				.then((result) => {
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

/* EDIT appointment view */
router.get("/profile/appointment/:id/edit", (req, res) => {
	const requestId = req.params.id;

	getAccessToken(req, res)
		.then((accessToken) => {
			axios
				.get(`http://localhost:8010/api/appointment/${requestId}`, {
					headers: {
						Authorization: accessToken,
					},
				})
				.then((result) => {
                    var startTime = result.data[0].start_date.split(' ')[1].slice(0, 5);
                    var endTime = result.data[0].end_date.split(' ')[1].slice(0, 5);

                    var appointment = {
                        appointment_id: requestId,
                        start_date: result.data[0].start_date.split(' ')[0],
                        start_time: `${startTime} ${parseInt(startTime.split(':')[0]) >= 12 ? 'PM' : 'AM'}`,
                        end_date: result.data[0].end_date.split(' ')[0],
                        end_time: `${endTime} ${parseInt(endTime.split(':')[0]) >= 12 ? 'PM' : 'AM'}`,
                        comments: result.data[0].comments
                    }
                    
					res.render("appointments/edit", {
						title: "Old St. Bookings | Edit Appointment",
						authenticated: true,
						appointment
					});
				})
				.catch((err) => {
					res.status(err.response.status).send(err.response.data);
				});
		})
		.catch((err) => {
			res.status(err.response.status).send(err.response.data);
		});
});

/* UPDATE appointment */
router.post("/update_appointment/:id", (req, res) => {
	const requestId = req.params.id;
	const { date, hours, comments } = req.body;
	const values = {
		comments,
		start_date: `${date[0]}T${hours[0].split(" ")[0]}:00`,
		end_date: `${date[1]}T${hours[1].split(" ")[0]}:00`,
    };

	getAccessToken(req, res)
	    .then(accessToken => {
	        axios.put(`http://localhost:8010/api/appointment/${requestId}`, values, { headers: {
	            Authorization: accessToken
	        }})
	        .then(result => {
                res.json({ status: "success" });
	        })
	        .catch(err => {
                res.status(err.response.status).send(err.response.data);
	        });
	    })
	    .catch(err => {
			res.status(err.response.status).send(err.response.data);
	    });
});

/* DELETE appointment */
router.post("/delete_appointment/:id", (req, res) => {
	const requestId = req.params.id;

	getAccessToken(req, res)
		.then((accessToken) => {
			axios
				.delete(`http://localhost:8010/api/appointment/${requestId}`, {
					headers: {
						Authorization: accessToken,
					},
				})
				.then((result) => {
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
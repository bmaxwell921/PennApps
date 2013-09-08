/*
 This is what we need to do:
 	1) start up the WL thing with init
	2) Try to log in?
		i) if they're logged in, that's good
		ii) if not, send them to the login page
*/
function attemptLogin() {
	WL.Event.subscribe("auth.login", onLogin);
	WL.Event.subscribe("auth.sessionChange", onSessionChange);
	
	WL.init({client_id : '0000000040105199', redirect_uri: 'http://soundclouduploader.appspot.com/',
		scope: "wl.skydrive", response_type: "token"});

	var session = WL.getSession();
	if (session) {
		console.log("SD: User is already logged in");
	} else {
		WL.login({scope: "wl.signin"});
	}
	downloadFiles();
}

function onLogin() {
	var session = WL.getSession();
	if (session) {
		console.log("SD: User just logged in");
	}
}

function onSessionChange() {
	var session = WL.getSession();
	if (session) {
		console.log("SD: Session changed");
	}
}

function downloadFiles() {
	WL.fileDialog({
		mode: "open",
		select: "multi"
	}).then(function(response) {
		console.log("Doing shit");
		var data = {};
		data.numFiles = response.data.files.length;
		if (response.data.files.length > 0) {
			for (var file = 0; file < response.data.files.length; ++file) {
				console.log("Loopin");
				data["file" + file] = response.data.files[file].id; 
			}
		}
		console.log(data);
		var url = '/sdUpload';
		$.post(url, data, function(derter, status) {
			console.log(derter);
		});
	},
	function (responseFailed) {
		console.log(responseFailed.error.message);
	});
}

<!doctype html>

<html>

	<head>

		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

		<title>Maritess Wall v0.1</title>

		<style>

			* {
				margin: 0;
				padding: 0;
				font-family: monospace;
				box-sizing: border-box;
			}

			html, body {
				width: 100%;
				height: 100%;
			}

			#chat {
				width: 100%;
				height: 100%;
			}

		</style>

	</head>

	<body>

		<div id="curpos"></div>

		<textarea id="chat"></textarea>

		<script>

			var chat=document.getElementById("chat");

			var loadInterval=null;



			function saveFile(url,data,cb) {
			    var request = new XMLHttpRequest();
			    request.open("POST",url,false);
			    request.setRequestHeader("content-type","application/json");
			    request.onreadystatechange = function() {
			  		if (request.readyState === 4 && request.status === 200) {
			     		cb(this.responseText);
			  		}
			    };
			    request.send(JSON.stringify(data));
			}



			function loadFile(url,cb) {
			  var request = new XMLHttpRequest();
			  request.onreadystatechange = function () {
			  	if (request.readyState === 4 && request.status === 200) {
			      cb(request.responseText);
			    }
			  }
			  request.open("GET",url,false);
			  request.send();
			}

			function loadText() {
				loadFile("data.txt",function(text) {
					chat.value=text;
				});
			}

			function setLoadInterval() {
				loadInterval=setInterval(function() {
					loadText();
				},5000);
			}

			loadText();
			setLoadInterval();

			chat.onkeyup = function(e) {
				if(e.keyCode<37 && e.keyCode>40) {
					clearInterval(loadInterval);
					saveFile("save.php",{data:chat.value},function(text) {
          	setLoadInterval();
          });       
				}
			};
		


		</script>
	
	</body>

</html>

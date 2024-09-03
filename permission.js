custom_permission_request_ui_async = function(callback) {
    let e = document.createElement("div");
    e.classList.add("custom-permission-request");
    e.innerHTML = `<style>
        .custom-permission-request {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.9);
            font-family: sans-serif;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .custom-inner {
            max-width: 400px;
            text-align: center;
        }
        .custom-title {
            font-size: 20px;
        }
        .custom-text {
            font-size: 14px;
            padding: 15px;
        }
        .custom-inner > button {
            background: none;
            outline: none;
            border: 2px solid white;
            border-radius: 10px;
            color: white;
            padding: 10px 40px;
            text-transform: uppercase;
        }
    </style> 
  <div class="custom-inner">
        <div class="zappar-title">Presque là...</div>
        <div class="zappar-text">Afin de fournir cette expérience de réalité augmentée, nous avons besoin d'accéder à la caméra et aux capteurs de mouvement de votre appareil.</div>
        <button id="custom-permission-request-button">Accorder l'accès</button>
    </div>`;
    document.body.append(e);


    let b = e.querySelector("#custom-permission-request-button");
    
    const constraints= {
        video: !0,
	audio: !1
    };

    b.onclick = async function () {
        //navigator.mediaDevices.getUserMedia(constraints).then(permission_allowed).catch(permission_denied);
	await zappar.permission_request_all();

	e.remove();

	if(zappar.permission_denied_any())
		callback(false);
	else if(zappar.permission_granted_all())
		callback(true);
    };

}
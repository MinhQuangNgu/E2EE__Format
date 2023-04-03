import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
	const [publicKey, setPublicKey] = useState("");
	useEffect(() => {
		if (!publicKey) {
			axios.get("/end_end").then(async (res) => {
				const data = await importPublicKey(res?.data?.publicKey);
				setPublicKey(data);
			});
		}
	}, []);

	useEffect(() => {}, []);
	function importPublicKey(pem) {
		const pemHeader = "-----BEGIN PRIVATE KEY-----";
		const pemFooter = "-----END PRIVATE KEY-----";
		const pemContents = pem.substring(
			pemHeader.length,
			pem.length - pemFooter.length
		);
		const binaryDerString = window.atob(pemContents);
		const binaryDer = str2ab(binaryDerString);
		return window.crypto.subtle.importKey(
			"spki",
			binaryDer,
			{
				name: "RSA-OAEP",
				hash: { name: "SHA-256" },
			},
			true,
			["encrypt"]
		);
	}
	function str2ab(str) {
		const buf = new ArrayBuffer(str.length);
		const bufView = new Uint8Array(buf);
		for (let i = 0, strLen = str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	}
	const sendMessage = (message) => {
		const message = message;
		const encoder = new TextEncoder();
		const data = encoder.encode(message);
		crypto.subtle
			.encrypt(
				{
					name: "RSA-OAEP",
				},
				key,
				data
			)
			.then((encrypted) => {
				const base64 = window.btoa(
					String.fromCharCode.apply(null, new Uint8Array(encrypted))
				);
				return base64;
			});
	};
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;

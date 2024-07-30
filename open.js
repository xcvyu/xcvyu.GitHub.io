let Engines={
	base:document.getElementById('Engines'),
	visibler:0,
	upload:function (origin,target=this.base){
		let EnginesReader = new FileReader();
		EnginesReader.onload = function(){
			EnginesContent=document.createElement("textarea");
			EnginesContent.className="0";
			EnginesContent.value=this.result;
			target.appendChild(EnginesContent);
		}
		EnginesReader.readAsText(origin.files[0]);
	},
	imgupload:function (origin,target=this.base){
		let preview = document.createElement("img");
		let file = origin.files[0];
		let reader = new FileReader().addEventListener("load",() => {preview.src = reader.result;},false,);
		if (file) {
			reader.readAsDataURL(file);
		}
		target.appendChild(preview);
	},
	download:(name,obj)=>{
		let EnginesAnchor = document.createElement("a"); 
		EnginesAnchor.href = window.URL.createObjectURL(new Blob([obj]));
		EnginesAnchor.download = name;
		EnginesAnchor.target ="_blank";
		EnginesAnchor.click();
	},
	newopen:(obj)=>{
		let EnginesWindow=window.open();
		EnginesWindow.opener = null;
		EnginesWindow.document.write(obj);
		EnginesWindow.document.close();
	},
	insert:function (elements,target=this.base){
		let EnginesInserter=document.createElement("div");
		EnginesInserter.innerHTML = elements;
		target.appendChild(EnginesInserter);
		this.scriptfinder(EnginesInserter);
	},
	scriptfinder:function (obj){
		for(let i of obj.children){
			if(i.tagName=='SCRIPT'){
				let g = document.createElement("script");
				g.text = i.innerHTML;
				if(i.src!=''){
					g.src=i.src;
					g.charset = i.charset;
					g.async=i.async;
					g.defer=i.defer;
				}
				i.before(g);
				g.remove();
			}
			this.scriptfinder(i);
		}
	},
	visible:function (){
		this.base.style.display = this.visibler?'block':'none';
		this.visibler=!this.visibler;
	},
	delete:function (){
		// document.querySelector('#Engines :last-child').remove();
		this.base.lastChild.remove();
	}
};
function EnginesEnjoy(){
	let val = () => document.getElementsByClassName("0")[document.getElementsByClassName("0").length - 1].value;
	u = Engines, n = (value) => { Engines.newopen(value) }, d = u.delete.bind(u), s = (name, obj = val()) => { u.download.call(u, name, obj) }, i = (obj = val()) => { u.insert.call(u, obj) };
	let up=(isimg=0)=>{
		let uploader=document.createElement("input");
		uploader.type="file";
		uploader.name="file";
		uploader.onchange=(isimg=="img")?(()=>{Engines.imgupload.call(u,uploader)}):(()=>{Engines.upload(uploader)});
		uploader.click();
	}
	eval(document.getElementById('EnginesEval').value);
}
function change(obj) {
	Engines.delete();
	Engines.insert(obj);
}
let initdoc = `
<textarea id="EnginesEval" cols="40%" rows="4"></textarea><br /><button type="button" onclick="EnginesEnjoy()">enjoy!</button>
<ul>
<li><a href="./index.html#read%20board">read board</a></li>
<li><a href="./index.html">index.html</a></li>
<li><a href="javascript:change(musicdoc)">xcvyu-music</a></li>
<li><a href="javascript:change(feeddoc)">xcvyu-feed</a></li>
<li><a href="https://pwa.sspai.com/">sspai</a></li>
</ul>`
Engines.insert(initdoc);
let musicdoc = `
<title>xcvyu-music</title>
<style>
	@font-face {
		font-family: OPPOSans;
		src: url("./fonts/OPPOSans-Regular.ttf");
		font-weight: 100;
	}

	body {
		font-family: OPPOSans, SourceHanSansCN-ExtraLight;
		background: url("./starail.png") no-repeat center/cover fixed;
	}

	.musicDiv {
		border: 1px solid skyblue;
		margin: 20px 0;
		padding: 20px;
		border-radius: 6px;
		overflow: auto;
	}
</style>
<a href="javascript:change(initdoc)">点开有惊喜!</a>
<div id="musicplayer">
	<script>
		function upload() {
			let musicReader = new FileReader();
			musicReader.onload = function () {
				document.getElementById("song_sheet").value = this.result;
			}
			musicReader.readAsText(document.getElementById("filePicker_music").files[0]);
		}
		function randomNum(minNum, maxNum) {
			switch (arguments.length) {
				case 1:
					return parseInt(Math.random() * minNum + 1, 10);
					break;
				case 2:
					return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
					break;
				default:
					return 0;
					break;
			}
		}
		function randSort(arr) {
			for (var i = 0, len = arr.length; i < len; i++) {
				var rand = parseInt(Math.random() * len);
				var temp = arr[rand];
				arr[rand] = arr[i];
				arr[i] = temp;
			}
			return arr;
		}
		function playMusic(musicList) {
			musicList = musicList.reverse();
			musicDiv = document.createElement("div");
			musicDiv.style = \`
					border: 1px solid skyblue;
					margin: 20px 0;
					padding: 20px;
					border-radius: 6px;
					overflow:auto;
				\`
			let israndom = false;
			let player = new Audio();
			player.preload = true;
			player.controls = true;
			player.loop = false;
			player.autoplay = true;
			musicDiv.appendChild(player);
			let musicInforUrl = document.createElement("p");
			musicDiv.appendChild(musicInforUrl);
			let musiclooping = document.createElement('a');
			musiclooping.innerText = "PlayLoop!:" + player.loop;
			musiclooping.addEventListener("click", music_looping, false);
			musicDiv.appendChild(musiclooping);
			musicDiv.appendChild(document.createElement("br"));
			let musicrandoming = document.createElement('a');
			musicrandoming.innerText = "randomer!:" + israndom;
			musicrandoming.addEventListener("click", () => {
				israndom = !israndom;
				musicrandoming.innerText = "randomer!:" + israndom;
			}, false);
			musicDiv.appendChild(musicrandoming);
			musicDiv.appendChild(document.createElement("br"));
			let musiccontrolup = document.createElement('a');
			musiccontrolup.innerText = "upper!";
			musiccontrolup.addEventListener("click", music_next, false);
			musicDiv.appendChild(musiccontrolup);
			let musiccontroldown = document.createElement('a');
			musiccontroldown.innerText = "lower!";
			musiccontroldown.addEventListener("click", music_last, false);
			musicDiv.appendChild(musiccontroldown);
			function playwer(src) {
				player.load();
				player.src = src;
				musicInforUrl.innerHTML = "url:" + src;
				setTimeout(() => {
					player.play();
				}, 512);
			}
			function music_next() {
				let src = musicList.pop();
				musicList.unshift(src);
				return playwer(src);
			}
			function music_last() {
				let src = musicList.shift();
				musicList.push(src);
				return playwer(src);
			}
			function music_random() {
				new Promise((resolve, reject) => {
					let randomsrc = musicList[randomNum(0, musicList.length)];
					if (randomsrc != undefined) resolve(randomsrc);
					else reject();
				}).then((randomsrc) => {
					playwer(randomsrc);
				}).catch(music_random)
			}
			function music_src() {
				return (israndom) ? music_random() : music_next();
			}
			function music_looping() {
				player.loop = !player.loop;
				musiclooping.innerText = "PlayLoop!:" + player.loop;
			}
			player.loop = false;
			let musicer = music_src();
			player.addEventListener("ended", music_src, false);
			return musicDiv;
		}
	</script>
	<mark>仅限配置 server 后可加载本地音乐</mark><br />
	<input type="file" name="file" id="filePicker_music" onchange="upload()" /><br />
	<textarea id="song_sheet" rows="15" cols="40%">
[
	"http://music.163.com/song/media/outer/url?id=2049101868.mp3#致：黯淡星",
	"http://music.163.com/song/media/outer/url?id=2604592456.mp3#暮色回响",
	"http://music.163.com/song/media/outer/url?id=406072138.mp3#心要野",
	"http://music.163.com/song/media/outer/url?id=2116106898.mp3#再次与你同行",
	"http://music.163.com/song/media/outer/url?id=2144805050.mp3#人生是旷野",
	"./可能.mp3",
	"http://music.163.com/song/media/outer/url?id=2160850755#未行之路",
	"http://music.163.com/song/media/outer/url?id=2155423468#希望有羽毛和翅膀",
	"http://music.163.com/song/media/outer/url?id=2155422573#使一颗心免于哀伤",
	"http://music.163.com/song/media/outer/url?id=2155423467#在银河中孤独摇摆",
	"http://music.163.com/song/media/outer/url?id=2112196350.mp3#浮光",
	"http://music.163.com/song/media/outer/url?id=1959528822.mp3#紫荆花盛开",
	"/music/终焉×end of all[原神 2024 新春会].mp3",
	"http://music.163.com/song/media/outer/url?id=2100372359.mp3#轻涟 Chinese",
	"http://music.163.com/song/media/outer/url?id=2100334024.mp3#轻涟 France",
	"http://music.163.com/song/media/outer/url?id=2026286081.mp3#舍离去",
	"http://music.163.com/song/media/outer/url?id=31234244.mp3#blessing(world))",
	"http://music.163.com/song/media/outer/url?id=2026565329.mp3#da capo",
	"http://music.163.com/song/media/outer/url?id=1859652717.mp3#moon halo",
	"/music/G大调弦乐小乐曲.mp3",
	"/music/春.mp3",
	"/music/Interstellar Main Theme.mp3",
	"/music/ryukyuvania.m4a",
	"/music/诀别书.mp3",
	"/music/rise(heroes).mp3",
	"/music/野火.mp3",
	"/music/双笙（陈元汐） - 女孩你为何踮脚尖.mp3",
	"/music/Alone.mp3",
	"/music/At The Edge.mp3",
	"/music/Crying In The Sun.mp3",
	"/music/Energy Drink.mp3",
	"/music/HOYO-MiX - Hustle and Bustle of Ormos 喧繁之港 [qmms2].flac",
	"/music/KemimikE - Mountains (Original Mix).mp3",
	"/music/Masked Heroes.mp3",
	"/music/Middle Of The Night-Original Mix.mp3",
	"/music/Monsters-Katie Sky.flac",
	"/music/Moonlight Sonata.mp3",
	"/music/Nevada.mp3",
	"/music/Rise - Epic Music.mp3",
	"/music/Sold Out-Hawk Nelson.flac",
	"/music/Sorry-Alan Walker.mp3",
	"/music/Sunburst.mp3",
	"/music/Tabata W.O.D.mp3",
	"/music/Unstoppable-Sia.flac",
	"/music/Unstoppable-The Score.mp3",
	"/music/X-Ray Dog - Playing Through [qmms2].mp3",
	"/music/You Are My Everything.mp3",
	"/music/drown.mp3",
	"/music/experience.mp3",
	"/music/faded.mp3",
	"http://music.163.com/song/media/outer/url?id=1862710424.mp3#stay",
	"/music/一路生花.mp3",
	"/music/万里归途.mp3",
	"/music/下山.mp3",
	"/music/不屈的信仰-张艺兴.mp3",
	"/music/你从未离去.wav",
	"/music/你的酒馆对我打了烊-陈雪凝.flac",
	"/music/侧脸.mp3",
	"/music/出山.mp3",
	"/music/加油 ! 向未来.mp3",
	"/music/发光时代.mp3",
	"/music/和平精英-717电音节主题bgm.mp3",
	"/music/回到那一天.flac",
	"/music/外婆的澎湖湾.mp3",
	"/music/夜空中最亮的星.mp3",
	"/music/夜航星.mp3",
	"/music/夜航星伴奏.flac",
	"/music/她的微笑（ Original Mix ).mp3",
	"/music/如愿.mp3",
	"/music/姚六一-雾里.mp3",
	"/music/孤勇者.mp3",
	"/music/小梦想.mp3",
	"/music/少年.mp3",
	"/music/平凡之路(中秋晚会).mp3",
	"/music/平凡之路.mp3",
	"/music/平凡的一天.mp3",
	"/music/悲伤的旋律.mp3",
	"/music/所念皆星河.mp3",
	"/music/无名之辈.mp3",
	"/music/时光洪流.flac",
	"/music/旺仔小乔-雾里.mp3",
	"/music/明天会更好.mp3",
	"/music/星辰大海.mp3",
	"/music/是你.flac",
	"/music/最美的光.mp3",
	"/music/有我.mp3",
	"/music/本草纲目.mp3",
	"/music/李峪钊-翻山越岭.mp3",
	"/music/溜冰圆舞曲.mp3",
	"/music/玫瑰少年.mp3",
	"/music/生僻字.mp3",
	"/music/破茧.mp3",
	"/music/离别开出花.mp3",
	"/music/第九交响曲.mp3",
	"/music/翻山越岭.mp3",
	"/music/耍把戏-张东尼.mp3",
	"/music/耍把戏-阿禹ayy.mp3",
	"/music/芒种.mp3",
	"/music/葬花.mp3",
	"/music/蓝莲花.mp3",
	"/music/蜜雪冰城主题曲.mp3",
	"/music/调查中.mp3",
	"/music/起风了.mp3",
	"/music/量子力学之歌.mp3",
	"/music/错位时空-五四特别版.mp3",
	"/music/错位时空.mp3",
	"/music/青春跃起来 (Live) .mp3"
]
		</textarea><br />
	<button type="button"
		onclick="document.getElementById('musicplayer').appendChild(new playMusic(JSON.parse(document.getElementById('song_sheet').value)))">enjoy!</button>
</div>`;
feeddoc = `
<title>xcvyu-feed</title>
<script>
function xml_upload() {
	let xml_reader = new FileReader();
	xml_reader.onload = function() {document.getElementById('rss').innerHTML = document.getElementById('rss').innerHTML + this.result;}
	xml_reader.readAsText(document.getElementById("filePicker_feed").files[0]);
}

function xml_download() {
	let xml_text = document.getElementById("rss").innerHTML;
	let xml_blob = new Blob([xml_text]);
	let xml_anchor = document.createElement("a");
	xml_anchor.href = window.URL.createObjectURL(xml_blob);
	//xml_anchor.download = "my-filename.txt";
	xml_anchor.download = "RSS" + Date.now();
	xml_anchor.target = "_blank";
	xml_anchor.style.display = "none"; // just to be safe! 
	document.body.appendChild(xml_anchor);
	xml_anchor.click();
	document.body.removeChild(xml_anchor);
}
function loadXMLDoc(url) {
	xmlhttp = null;
	if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest(); // code for IE7, Firefox, Mozilla, etc.
	else if (window.ActiveXObject) xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE5, IE6
	if (xmlhttp != null) {
		xmlhttp.open("get", url);
		// xmlhttp.setRequestHeader("Access-Control-Expose-Headers","Access-Control-Allow-Origin");
		// xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*");
		xmlhttp.onreadystatechange = function(){
			onResponse(url);
		};
		xmlhttp.send();
	} else alert("Your browser does not support XMLHTTP.");
}
function onResponse(url) {
	if (xmlhttp.readyState != 4 || xmlhttp.status != 200) {
		console.error("Problem retrieving XML data");
		xmlhttp.onerror=(error) => { 
			console.log(error);
		}
		xmlhttp.addEventListener('error',(error) => { 
			console.log(error);
		})
		console.warn("maybe because cors.if yes,start down details to get solution");
		// window.open(url);
	}else{
		Infor(xmlhttp.responseXML.documentElement.getElementsByTagName("title")[0].innerHTML,xmlhttp.responseXML.documentElement.getElementsByTagName("item"));
	}
}
function Infor(channeltitle,items){
	let readals = document.createElement("div");
	readals.id = document.getElementById("direction").value;
	readals.innerHTML=\`<h1>\${channeltitle\}</h1>\`;
	document.getElementById("rss").appendChild(readals);
	for (let i of items) {
		readals.innerHTML+=
\`<div class="feeder-style">
<a href="\${i.getElementsByTagName("link")[0].innerHTML\}"><h3>\${i.getElementsByTagName("title")[0].innerHTML\}</h3></a>
<p>\${i.getElementsByTagName("pubDate")[0].innerHTML\}</p>
<p>\${i.getElementsByTagName("description")[0].firstChild.nodeValue\}</p>
</div>\`;
		//enclosure=i.getElementsByTagName("enclosure")[0].getAttribute("url")
	}
}
</script>
<p>import:<input type="file" name="file" id="filePicker_feed" onchange="xml_upload()" /></p>
<p><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164 75" width="164" height="75" onclick="xml_download()">
	<!-- svg-source:excalidraw -->
	<defs>
		<style class="style-fonts">
			@font-face {
				font-family: "Virgil";
				src: url("https://excalidraw.com/Virgil.woff2");
			}

			@font-face {
				font-family: "Cascadia";
				src: url("https://excalidraw.com/Cascadia.woff2");
			}
		</style>
	</defs>
	<rect x="0" y="0" width="164" height="75" fill="rgba(0,0,0,0)"></rect>
	<g stroke-linecap="round" transform="translate(10 10) rotate(0 72 27.5)">
		<path d="M1.79 5.53 C1.79 5.53, 1.79 5.53, 1.79 5.53 M1.79 5.53 C1.79 5.53, 1.79 5.53, 1.79 5.53 M1.53 11.93 C3.33 9.87, 5.12 7.8, 9.4 2.87 M1.53 11.93 C3.56 9.59, 5.6 7.25, 9.4 2.87 M1.93 17.57 C5.92 12.98, 9.91 8.39, 15.7 1.73 M1.93 17.57 C4.77 14.31, 7.61 11.04, 15.7 1.73 M1.66 23.97 C6.7 18.18, 11.74 12.38, 20.69 2.09 M1.66 23.97 C7.36 17.41, 13.07 10.86, 20.69 2.09 M1.4 30.37 C9.22 21.38, 17.03 12.39, 26.33 1.69 M1.4 30.37 C8.65 22.03, 15.9 13.7, 26.33 1.69 M1.8 36.01 C8.91 27.83, 16.03 19.64, 31.32 2.05 M1.8 36.01 C8.72 28.05, 15.64 20.08, 31.32 2.05 M1.54 42.41 C9.56 33.18, 17.58 23.95, 36.96 1.66 M1.54 42.41 C12.56 29.73, 23.58 17.05, 36.96 1.66 M3.24 46.54 C12.93 35.4, 22.61 24.26, 41.95 2.02 M3.24 46.54 C16.69 31.08, 30.13 15.61, 41.95 2.02 M3.64 52.19 C13.42 40.93, 23.21 29.68, 47.59 1.62 M3.64 52.19 C14.13 40.12, 24.63 28.04, 47.59 1.62 M7.31 54.06 C16.9 43.02, 26.5 31.99, 52.58 1.98 M7.31 54.06 C19.59 39.93, 31.87 25.81, 52.58 1.98 M10.33 56.68 C28.17 36.16, 46 15.65, 58.22 1.59 M10.33 56.68 C26.77 37.77, 43.21 18.86, 58.22 1.59 M15.97 56.29 C33.57 36.04, 51.17 15.8, 63.21 1.95 M15.97 56.29 C29.55 40.66, 43.13 25.04, 63.21 1.95 M20.96 56.65 C36.43 38.85, 51.9 21.06, 68.85 1.55 M20.96 56.65 C34.98 40.52, 49.01 24.38, 68.85 1.55 M25.95 57.01 C35.76 45.72, 45.58 34.42, 73.84 1.91 M25.95 57.01 C36.77 44.55, 47.6 32.1, 73.84 1.91 M31.59 56.61 C50.65 34.68, 69.72 12.75, 79.48 1.52 M31.59 56.61 C43.75 42.62, 55.91 28.63, 79.48 1.52 M36.58 56.97 C51.36 39.97, 66.13 22.97, 84.47 1.88 M36.58 56.97 C54.06 36.86, 71.55 16.74, 84.47 1.88 M42.22 56.58 C56.48 40.18, 70.74 23.78, 90.11 1.48 M42.22 56.58 C60.98 35, 79.74 13.42, 90.11 1.48 M47.21 56.94 C62.03 39.89, 76.84 22.84, 95.1 1.84 M47.21 56.94 C63.08 38.68, 78.96 20.42, 95.1 1.84 M52.85 56.54 C71.95 34.57, 91.05 12.6, 100.74 1.45 M52.85 56.54 C70.55 36.19, 88.24 15.83, 100.74 1.45 M57.84 56.9 C75.08 37.07, 92.32 17.23, 105.73 1.81 M57.84 56.9 C67.43 45.87, 77.02 34.84, 105.73 1.81 M63.48 56.51 C75.68 42.48, 87.87 28.45, 111.37 1.41 M63.48 56.51 C75.42 42.77, 87.36 29.04, 111.37 1.41 M68.47 56.87 C79.94 43.67, 91.41 30.47, 116.36 1.77 M68.47 56.87 C87.39 35.1, 106.32 13.33, 116.36 1.77 M74.11 56.47 C88.25 40.21, 102.39 23.95, 122 1.38 M74.11 56.47 C92.85 34.91, 111.6 13.35, 122 1.38 M79.1 56.83 C91.25 42.86, 103.4 28.88, 126.99 1.74 M79.1 56.83 C97.69 35.45, 116.28 14.06, 126.99 1.74 M84.74 56.44 C100.18 38.68, 115.62 20.91, 131.98 2.1 M84.74 56.44 C101.49 37.18, 118.23 17.92, 131.98 2.1 M89.73 56.8 C105.76 38.36, 121.78 19.93, 137.62 1.71 M89.73 56.8 C108.87 34.78, 128.02 12.75, 137.62 1.71 M95.37 56.41 C106.06 44.11, 116.75 31.81, 141.3 3.58 M95.37 56.41 C113.55 35.49, 131.73 14.58, 141.3 3.58 M100.36 56.77 C114.91 40.02, 129.47 23.28, 143 7.71 M100.36 56.77 C113.1 42.1, 125.85 27.44, 143 7.71 M106 56.37 C116.55 44.24, 127.09 32.11, 144.71 11.84 M106 56.37 C120.37 39.85, 134.73 23.32, 144.71 11.84 M110.99 56.73 C123.23 42.64, 135.48 28.56, 145.1 17.49 M110.99 56.73 C121.32 44.84, 131.65 32.96, 145.1 17.49 M116.63 56.34 C127.41 43.94, 138.19 31.54, 144.84 23.88 M116.63 56.34 C123.24 48.73, 129.85 41.13, 144.84 23.88 M121.62 56.7 C131.06 45.84, 140.49 34.98, 145.24 29.53 M121.62 56.7 C128.17 49.16, 134.73 41.62, 145.24 29.53 M127.26 56.3 C132.12 50.71, 136.98 45.12, 144.98 35.92 M127.26 56.3 C133.25 49.41, 139.24 42.52, 144.98 35.92 M132.25 56.66 C136.01 52.34, 139.77 48.01, 144.71 42.32 M132.25 56.66 C135.2 53.26, 138.16 49.86, 144.71 42.32" stroke="#a5d8ff" stroke-width="0.5" fill="none"></path>
		<path d="M13.75 0 M13.75 0 C53.18 0, 92.61 0, 130.25 0 M13.75 0 C52.57 0, 91.39 0, 130.25 0 M130.25 0 C139.42 0, 144 4.58, 144 13.75 M130.25 0 C139.42 0, 144 4.58, 144 13.75 M144 13.75 C144 24.18, 144 34.6, 144 41.25 M144 13.75 C144 20.35, 144 26.96, 144 41.25 M144 41.25 C144 50.42, 139.42 55, 130.25 55 M144 41.25 C144 50.42, 139.42 55, 130.25 55 M130.25 55 C89.29 55, 48.34 55, 13.75 55 M130.25 55 C94.55 55, 58.86 55, 13.75 55 M13.75 55 C4.58 55, 0 50.42, 0 41.25 M13.75 55 C4.58 55, 0 50.42, 0 41.25 M0 41.25 C0 33.48, 0 25.72, 0 13.75 M0 41.25 C0 34.07, 0 26.89, 0 13.75 M0 13.75 C0 4.58, 4.58 0, 13.75 0 M0 13.75 C0 4.58, 4.58 0, 13.75 0" stroke="#1971c2" stroke-width="1" fill="none"></path>
	</g>
	<g transform="translate(20.404037475585938 15) rotate(0 61.59596252441406 22.5)"><text x="61.59596252441406" y="0" font-family="Virgil, HanziPen SC, Cangnanshoujiti, KaiTi, Segoe UI Emoji" font-size="36px" fill="#1971c2" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">backup!</text></g>
</svg></p>
<p><input class="input" type="text" id="direction" placeholder="要访问的源从此开始！" /></p>
<p id="feed_feeder"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164 75" width="164" height="75" onclick="loadXMLDoc(document.getElementById('direction').value);">
			<!-- svg-source:excalidraw -->
			<defs>
				<style class="style-fonts">
					@font-face {
						font-family: "Virgil";
						src: url("https://excalidraw.com/Virgil.woff2");
					}

					@font-face {
						font-family: "Cascadia";
						src: url("https://excalidraw.com/Cascadia.woff2");
					}
				</style>
			</defs>
			<rect x="0" y="0" width="164" height="75" fill="rgba(0,0,0,0)"></rect>
			<g stroke-linecap="round" transform="translate(10 10) rotate(0 72 27.5)">
				<path d="M1.79 5.53 C1.79 5.53, 1.79 5.53, 1.79 5.53 M1.79 5.53 C1.79 5.53, 1.79 5.53, 1.79 5.53 M1.53 11.93 C3.33 9.87, 5.12 7.8, 9.4 2.87 M1.53 11.93 C3.56 9.59, 5.6 7.25, 9.4 2.87 M1.93 17.57 C5.92 12.98, 9.91 8.39, 15.7 1.73 M1.93 17.57 C4.77 14.31, 7.61 11.04, 15.7 1.73 M1.66 23.97 C6.7 18.18, 11.74 12.38, 20.69 2.09 M1.66 23.97 C7.36 17.41, 13.07 10.86, 20.69 2.09 M1.4 30.37 C9.22 21.38, 17.03 12.39, 26.33 1.69 M1.4 30.37 C8.65 22.03, 15.9 13.7, 26.33 1.69 M1.8 36.01 C8.91 27.83, 16.03 19.64, 31.32 2.05 M1.8 36.01 C8.72 28.05, 15.64 20.08, 31.32 2.05 M1.54 42.41 C9.56 33.18, 17.58 23.95, 36.96 1.66 M1.54 42.41 C12.56 29.73, 23.58 17.05, 36.96 1.66 M3.24 46.54 C12.93 35.4, 22.61 24.26, 41.95 2.02 M3.24 46.54 C16.69 31.08, 30.13 15.61, 41.95 2.02 M3.64 52.19 C13.42 40.93, 23.21 29.68, 47.59 1.62 M3.64 52.19 C14.13 40.12, 24.63 28.04, 47.59 1.62 M7.31 54.06 C16.9 43.02, 26.5 31.99, 52.58 1.98 M7.31 54.06 C19.59 39.93, 31.87 25.81, 52.58 1.98 M10.33 56.68 C28.17 36.16, 46 15.65, 58.22 1.59 M10.33 56.68 C26.77 37.77, 43.21 18.86, 58.22 1.59 M15.97 56.29 C33.57 36.04, 51.17 15.8, 63.21 1.95 M15.97 56.29 C29.55 40.66, 43.13 25.04, 63.21 1.95 M20.96 56.65 C36.43 38.85, 51.9 21.06, 68.85 1.55 M20.96 56.65 C34.98 40.52, 49.01 24.38, 68.85 1.55 M25.95 57.01 C35.76 45.72, 45.58 34.42, 73.84 1.91 M25.95 57.01 C36.77 44.55, 47.6 32.1, 73.84 1.91 M31.59 56.61 C50.65 34.68, 69.72 12.75, 79.48 1.52 M31.59 56.61 C43.75 42.62, 55.91 28.63, 79.48 1.52 M36.58 56.97 C51.36 39.97, 66.13 22.97, 84.47 1.88 M36.58 56.97 C54.06 36.86, 71.55 16.74, 84.47 1.88 M42.22 56.58 C56.48 40.18, 70.74 23.78, 90.11 1.48 M42.22 56.58 C60.98 35, 79.74 13.42, 90.11 1.48 M47.21 56.94 C62.03 39.89, 76.84 22.84, 95.1 1.84 M47.21 56.94 C63.08 38.68, 78.96 20.42, 95.1 1.84 M52.85 56.54 C71.95 34.57, 91.05 12.6, 100.74 1.45 M52.85 56.54 C70.55 36.19, 88.24 15.83, 100.74 1.45 M57.84 56.9 C75.08 37.07, 92.32 17.23, 105.73 1.81 M57.84 56.9 C67.43 45.87, 77.02 34.84, 105.73 1.81 M63.48 56.51 C75.68 42.48, 87.87 28.45, 111.37 1.41 M63.48 56.51 C75.42 42.77, 87.36 29.04, 111.37 1.41 M68.47 56.87 C79.94 43.67, 91.41 30.47, 116.36 1.77 M68.47 56.87 C87.39 35.1, 106.32 13.33, 116.36 1.77 M74.11 56.47 C88.25 40.21, 102.39 23.95, 122 1.38 M74.11 56.47 C92.85 34.91, 111.6 13.35, 122 1.38 M79.1 56.83 C91.25 42.86, 103.4 28.88, 126.99 1.74 M79.1 56.83 C97.69 35.45, 116.28 14.06, 126.99 1.74 M84.74 56.44 C100.18 38.68, 115.62 20.91, 131.98 2.1 M84.74 56.44 C101.49 37.18, 118.23 17.92, 131.98 2.1 M89.73 56.8 C105.76 38.36, 121.78 19.93, 137.62 1.71 M89.73 56.8 C108.87 34.78, 128.02 12.75, 137.62 1.71 M95.37 56.41 C106.06 44.11, 116.75 31.81, 141.3 3.58 M95.37 56.41 C113.55 35.49, 131.73 14.58, 141.3 3.58 M100.36 56.77 C114.91 40.02, 129.47 23.28, 143 7.71 M100.36 56.77 C113.1 42.1, 125.85 27.44, 143 7.71 M106 56.37 C116.55 44.24, 127.09 32.11, 144.71 11.84 M106 56.37 C120.37 39.85, 134.73 23.32, 144.71 11.84 M110.99 56.73 C123.23 42.64, 135.48 28.56, 145.1 17.49 M110.99 56.73 C121.32 44.84, 131.65 32.96, 145.1 17.49 M116.63 56.34 C127.41 43.94, 138.19 31.54, 144.84 23.88 M116.63 56.34 C123.24 48.73, 129.85 41.13, 144.84 23.88 M121.62 56.7 C131.06 45.84, 140.49 34.98, 145.24 29.53 M121.62 56.7 C128.17 49.16, 134.73 41.62, 145.24 29.53 M127.26 56.3 C132.12 50.71, 136.98 45.12, 144.98 35.92 M127.26 56.3 C133.25 49.41, 139.24 42.52, 144.98 35.92 M132.25 56.66 C136.01 52.34, 139.77 48.01, 144.71 42.32 M132.25 56.66 C135.2 53.26, 138.16 49.86, 144.71 42.32" stroke="#a5d8ff" stroke-width="0.5" fill="none"></path>
				<path d="M13.75 0 M13.75 0 C53.18 0, 92.61 0, 130.25 0 M13.75 0 C52.57 0, 91.39 0, 130.25 0 M130.25 0 C139.42 0, 144 4.58, 144 13.75 M130.25 0 C139.42 0, 144 4.58, 144 13.75 M144 13.75 C144 24.18, 144 34.6, 144 41.25 M144 13.75 C144 20.35, 144 26.96, 144 41.25 M144 41.25 C144 50.42, 139.42 55, 130.25 55 M144 41.25 C144 50.42, 139.42 55, 130.25 55 M130.25 55 C89.29 55, 48.34 55, 13.75 55 M130.25 55 C94.55 55, 58.86 55, 13.75 55 M13.75 55 C4.58 55, 0 50.42, 0 41.25 M13.75 55 C4.58 55, 0 50.42, 0 41.25 M0 41.25 C0 33.48, 0 25.72, 0 13.75 M0 41.25 C0 34.07, 0 26.89, 0 13.75 M0 13.75 C0 4.58, 4.58 0, 13.75 0 M0 13.75 C0 4.58, 4.58 0, 13.75 0" stroke="#1971c2" stroke-width="1" fill="none"></path>
			</g>
			<g transform="translate(20.404037475585938 15) rotate(0 61.59596252441406 22.5)"><text x="61.59596252441406" y="0" font-family="Virgil, HanziPen SC, Cangnanshoujiti, KaiTi, Segoe UI Emoji" font-size="36px" fill="#1971c2" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">feeder!</text></g>
		</svg></p>
<div id="rss"></div>`;
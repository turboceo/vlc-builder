const fs = require("fs");
const Handlebars = require("handlebars");

const template = Handlebars.compile(`<?xml version="1.0" encoding="UTF-8"?>
<playlist xmlns="http://xspf.org/ns/0/" xmlns:vlc="http://www.videolan.org/vlc/playlist/ns/0/" version="1">
	<title>播放列表</title>
  <trackList>
    {{#each arr}}
        <track>
        <location>{{ url }}</location>
        <title>{{ title }}</title>
        <extension application="http://www.videolan.org/vlc/playlist/0">
          <vlc:id>{{ id }}</vlc:id>
        </extension>
      </track>
    {{/each}}
	</trackList>
  <extension application="http://www.videolan.org/vlc/playlist/0">
    {{#each tidList}}
      <vlc:item tid="{{@index}}"/>
    {{/each}}
	</extension>
</playlist>`);

let trackArr = []
let s = fs.readFileSync('./src/2.txt').toString()
let arr = s.split(/\r?\n/)
arr.forEach((line, id) => {
  let [title, url] = line.split(",");
  console.log(title, url)
  if(url !== undefined) {
    trackArr.push({
      title,
      url,
      id
    })
  }
})

let len = trackArr.length;
let tidList = []
for (let index = 0; index < len; index++) {
  tidList.push(index)  
}
let str = template({ arr: trackArr, tidList })
fs.writeFileSync('iptv.xspf', str)
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

let trackArr = [];
let parse = require("csv-parse");
let parser = parse({ 
  columns: true,
}, (err, record) => {
    console.log(record);
});

fs.createReadStream("./src/2.txt").pipe(parser);

// let len = trackArr.length;
// let tidList = []
// for (let index = 0; index < len; index++) {
//   tidList.push(index)
// }
// let str = template({ arr: trackArr, tidList })
// fs.writeFileSync('iptv.xspf', str)

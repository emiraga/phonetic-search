// Get mp3 files from EveryAyah
//

var sys = require('sys');

// This list Downloaded from: http://www.everyayah.com/data/recitations.js
var recitations = {
   "ayahCount":[
      7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
   ],
   "1":{
      "subfolder":"Abdul_Basit_Murattal_64kbps",
      "name":"Abdul Basit Murattal",
      "bitrate":"64kbps" //there was an error in original text
   },
   "2":{
      "subfolder":"Abdul_Basit_Murattal_192kbps",
      "name":"Abdul Basit Murattal",
      "bitrate":"192kbps"
   },
   "3":{
      "subfolder":"Abdul_Basit_Mujawwad_128kbps",
      "name":"Abdul Basit Mujawwad",
      "bitrate":"128kbps"
   },
   "4":{
      "subfolder":"Abdullah_Basfar_32kbps",
      "name":"Abdullah Basfar",
      "bitrate":"32kbps"
   },
   "5":{
      "subfolder":"Abdullah_Basfar_64kbps",
      "name":"Abdullah Basfar",
      "bitrate":"64kbps"
   },
   "6":{
      "subfolder":"Abdullah_Basfar_192kbps",
      "name":"Abdullah Basfar",
      "bitrate":"192kbps"
   },
   "7":{
      "subfolder":"Abdurrahmaan_As-Sudais_64kbps",
      "name":"Abdurrahmaan As-Sudais",
      "bitrate":"64kbps"
   },
   "8":{
      "subfolder":"Abdurrahmaan_As-Sudais_192kbps",
      "name":"Abdurrahmaan As-Sudais",
      "bitrate":"192kbps"
   },
   "9":{
      "subfolder":"AbdulSamad_64kbps_QuranExplorer.Com",
      "name":"AbdulSamad QuranExplorer.Com",
      "bitrate":"64kbps"
   },
   "10":{
      "subfolder":"Abu_Bakr_Ash-Shaatree_64kbps",
      "name":"Abu Bakr Ash-Shaatree",
      "bitrate":"64kbps"
   },
   "11":{
      "subfolder":"Abu Bakr Ash-Shaatree_128kbps",
      "name":"Abu Bakr Ash-Shaatree",
      "bitrate":"128kbps"
   },
   "12":{
      "subfolder":"Ahmed_ibn_Ali_al-Ajamy_64kbps_QuranExplorer.Com",
      "name":"Ahmed ibn Ali al-Ajamy QuranExplorer.Com",
      "bitrate":"64kbps"
   },
   "13":{
	"subfolder":"Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net",
	"name":"Ahmed ibn Ali al-Ajamy KetabAllah.Net",
	"bitrate":"128kbps"
   },
   "14":{
      "subfolder":"Alafasy_64kbps",
      "name":"Alafasy",
      "bitrate":"64kbps"
   },
   "15":{
      "subfolder":"Alafasy_128kbps",
      "name":"Alafasy",
      "bitrate":"128kbps"
   },
   "16":{
      "subfolder":"Ghamadi_40kbps",
      "name":"Ghamadi",
      "bitrate":"40kbps"
   },
   "17":{
      "subfolder":"Hani_Rifai_64kbps",
      "name":"Hani Rifai",
      "bitrate":"64kbps"
   },
   "18":{
      "subfolder":"Hani_Rifai_192kbps",
      "name":"Hani Rifai",
      "bitrate":"192kbps"
   },
   "19":{
      "subfolder":"Husary_64kbps",
      "name":"Husary",
      "bitrate":"64kbps"
   },
   "20":{
      "subfolder":"Husary_128kbps",
      "name":"Husary",
      "bitrate":"128kbps"
   },
   "21":{
      "subfolder":"Husary_Mujawwad_64kbps",
      "name":"Husary Mujawwad",
      "bitrate":"64kbps"
   },
   "22":{
      "subfolder":"Husary_128kbps_Mujawwad",
      "name":"Husary Mujawwad",
      "bitrate":"128kbps"
   },
   "23":{
      "subfolder":"Hudhaify_32kbps",
      "name":"Hudhaify",
      "bitrate":"32kbps"
   },
   "24":{
      "subfolder":"Hudhaify_64kbps",
      "name":"Hudhaify",
      "bitrate":"64kbps"
   },
   "25":{
      "subfolder":"Hudhaify_128kbps",
      "name":"Hudhaify",
      "bitrate":"128kbps"
   },
   "26":{
      "subfolder":"Ibrahim_Akhdar_32kbps",
      "name":"Ibrahim Akhdar",
      "bitrate":"32kbps"
   },
   "27":{
      "subfolder":"Ibrahim_Akhdar_64kbps",
      "name":"Ibrahim Akhdar",
      "bitrate":"64kbps"
   },
   "28":{
	"subfolder":"Maher_AlMuaiqly_64kbps",
	"name":"Maher Al Muaiqly",
	"bitrate":"64kbps"
   },
   "29":{
	"subfolder":"MaherAlMuaiqly128kbps",
	"name":"Maher Al Muaiqly",
	"bitrate":"128kbps"
   },
   "30":{
      "subfolder":"Menshawi_16kbps",
      "name":"Menshawi",
      "bitrate":"16kbps"
   },
   "31":{
      "subfolder":"Menshawi_32kbps",
      "name":"Menshawi",
      "bitrate":"32kbps"
   },
   "32":{
      "subfolder":"Minshawy_Mujawwad_64kbps",
      "name":"Minshawy Mujawwad",
      "bitrate":"64kbps"
   },
   "33":{
      "subfolder":"Minshawy_Mujawwad_192kbps",
      "name":"Minshawy Mujawwad",
      "bitrate":"192kbps"
   },
   "34":{
      "subfolder":"Minshawy_Murattal_128kbps",
      "name":"Minshawy Murattal",
      "bitrate":"128kbps"
   },
   "35":{
      "subfolder":"Mohammad_al_Tablaway_64kbps",
      "name":"Mohammad al Tablaway",
      "bitrate":"64kbps"
   },
   "36":{
      "subfolder":"Mohammad_al_Tablaway_128kbps",
      "name":"Mohammad al Tablaway",
      "bitrate":"128kbps"
   },
   "37":{
      "subfolder":"Muhammad_Ayyoub_128kbps",
      "name":"Muhammad Ayyoub",
      "bitrate":"128kbps"
   },
   "38":{
      "subfolder":"Muhammad_Ayyoub_64kbps",
      "name":"Muhammad Ayyoub",
      "bitrate":"64kbps"
   },
   "39":{
      "subfolder":"Muhammad_Ayyoub_32kbps",
      "name":"Muhammad Ayyoub",
      "bitrate":"32kbps"
   },
   "40":{
      "subfolder":"Muhammad_Jibreel_64kbps",
      "name":"Muhammad Jibreel",
      "bitrate":"64kbps"
   },
   "41":{
      "subfolder":"Muhammad_Jibreel_128kbps",
      "name":"Muhammad Jibreel",
      "bitrate":"128kbps"
   },
   "42":{
      "subfolder":"Mustafa_Ismail_48kbps",
      "name":"Mustafa Ismail",
      "bitrate":"48kbps"
   },
   "43":{
      "subfolder":"Saood_ash-Shuraym_64kbps",
      "name":"Saood bin Ibraaheem Ash-Shuraym",
      "bitrate":"64kbps"
   },
   "44":{
      "subfolder":"Saood bin Ibraaheem Ash-Shuraym_128kbps",
      "name":"Saood bin Ibraaheem Ash-Shuraym",
      "bitrate":"128kbps"
   },
   "45":{
      "subfolder":"English\/Ibrahim_Walk_192kbps_TEST",
      "name":"English\/Ibrahim Walk TEST",
      "bitrate":"192kbps"
   },
   "46":{
      "subfolder":"MultiLanguage\/Basfar_Walk_192kbps",
      "name":"MultiLanguage\/Basfar Walk",
      "bitrate":"192kbps"
   },
   "47":{
      "subfolder":"translations\/Makarem_Kabiri_16Kbps",
      "name":"(Persian) Translated by Makarem Recited by Kabiri",
      "bitrate":"64Kbps"
   },
   "48":{
      "subfolder":"translations\/Fooladvand_Hedayatfar_40Kbps",
      "name":"(Persian) Translated by Fooladvand Recited by Hedayatfar",
      "bitrate":"64Kbps"      
   },
   "49":{
      "subfolder":"Parhizgar_48kbps",
      "name" : "Parhizgar_64Kbps",
      "bitrate":"64Kbps"
   }   
};

function threeDigits(num) {
  var temp = '000'+ num;
  return temp.substr(temp.length-3);
}

var needSurah = [ 0 ];
for (var i=100;i<=113;i++) {
    needSurah.push(i);
}

var needRecit = [];
console.log("#'recit_list': [");
for (var j in recitations) {
    if (recitations[j].bitrate === '32kbps') {
        var folder = recitations[j].subfolder;
        if(folder.indexOf('English') < 0 && folder.indexOf('MultiLang') < 0) {
            needRecit.push(folder);
            console.log('#'+folder);
        }
    }
}
console.log("#]");

var shellprefix = 'wget -nc ';

for (var i=needSurah.length;i--;) {
    var surah = needSurah[i];
    var numayah = recitations.ayahCount[surah];
    var isurah = surah+1; //1-based
    for (var ayah = 1; ayah <= numayah; ayah++) {
        //console.log(shellprefix+"http://www.everyayah.com/data/images_png/"+isurah+"_"+ayah+".png");
        //console.log('('+isurah+','+ayah+'),')
        var mp3file = threeDigits(isurah)+threeDigits(ayah)+".mp3";
        for (var j=needRecit.length;j--;) {
            console.log(shellprefix+"http://www.everyayah.com/data/"+needRecit[j]+"/"+mp3file+" -O "+j+"_"+isurah+"_"+ayah+".mp3");
        }
    }
}


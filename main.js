document.onreadystatechange = ready;

	mMask = {
		input: 0,
		init: function(){
			mMask.regionMap.load();
			mMask.input = document.getElementsByClassName("mMask")[0];

			var event = document.createEvent('HTMLEvents');
			event.initEvent('input', true, false);
			mMask.input.dispatchEvent(event);
			mMask.input.type = 'tel'
			mMask.input.onkeypress = mMask.onkeypress;
			mMask.input.onkeydown = mMask.onkeydown;
			mMask.input.oninput = mMask.oninput;
			mMask.input.onfocus = mMask.input.onclick = onclick;
		},
		onclick: function(){
			str = mMask.input.value;
			if(str == '+')
				mMask.input.selectionStart = 1;
		},
		onkeydown: function(e){
			str = mMask.input.value;
			if(str == '+')
				mMask.input.selectionStart = 1;

			if(e.keyCode == 8){	
				str = mMask.input.value;
				start = mMask.input.selectionStart;
				end = mMask.input.selectionEnd;
				if(start - end == 0){
					while((str.charAt(start-1) < '0' || str.charAt(start-1) > '9')  && str.charAt(start-1) != '+' && start > 0)
						start--;
					mMask.input.selectionStart = start;
					mMask.input.selectionEnd = start;
				}
			}
		},
		onkeypress: function(e){
			if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8) {
				return false;
			}
		},
		oninput: function(e){	
			e = e || event;

			str = mMask.input.value;
			start = mMask.input.selectionStart;

			str = str.replace(/\+/g,"");
			str = str.replace(/\D+/g,"");
			reg = mMask.getRegion(str);

			str = mMask.masked(str,reg);

			if(str.indexOf('_') != -1)
				str = str.substring(0,str.indexOf('_'));

			for(i = 0;i < str.length;i++)
				if(str.charAt(start) > '9' || str.charAt(start) < '0')
					start++;

			mMask.input.value = str;

			if(isMobile.any()){
				setTimeout(function(){
					mMask.input.selectionStart = start;
					mMask.input.selectionEnd = start;
				},1)
			}else{	
				mMask.input.selectionStart = start;
				mMask.input.selectionEnd = start;
			}			
		},
		masked: function(str,region){
			if(!region){
				return str;
			}
			tmp = mMask.regionMap.mask[region];
			for(i = 0;i < str.length;i++){
				tmp = tmp.replace("_",str[i]);
			}
			return tmp;
		},
		getRegion: function(str){
			var tmp = -1;
			mMask.regionMap.list.forEach(function(item, i, arr) {
				if(('+'+str).indexOf('+'+i) >= 0){
					tmp = i;
				}
			});
			return tmp;
		},
		regionMap: {
			list: [],
			mask: [],
			load: function(){
				mMask.regionMap.add(-1,'undef','+____________');
				mMask.regionMap.add(7,'RU','+_ (___) ___-__-__');
				mMask.regionMap.add(375,'BY','+___ (__) ___-__-__');
				mMask.regionMap.add(380,'UA','+___ (__) ___-__-__');
				mMask.regionMap.add(370,'LT','+___ (___) _____');
				mMask.regionMap.add(371,'LV','+___ ________');
			},
			add: function(code,name,mask){
				mMask.regionMap.list[code] = name;
				mMask.regionMap.mask[code] = mask;
			}
		}
	}

var isMobile = {
    Android: function() {return navigator.userAgent.match(/Android/i);},
    BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
    iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
    Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
    any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

function ready(){
	if(document.getElementsByClassName("mMask")[0] != undefined)
		mMask.init();	
}
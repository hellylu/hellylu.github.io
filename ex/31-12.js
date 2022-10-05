

//<![CDATA[

<!--


function Client(){
//if not a DOM browser, hopeless
	this.min = false; if (document.getElementById){this.min = true;};

	this.ua = navigator.userAgent;
	this.name = navigator.appName;
	this.ver = navigator.appVersion;  

//Get data about the browser
	this.mac = (this.ver.indexOf('Mac') != -1);
	this.win = (this.ver.indexOf('Windows') != -1);

//Look for Gecko
	this.gecko = (this.ua.indexOf('Gecko') > 1);
	if (this.gecko){
		this.geckoVer = parseInt(this.ua.substring(this.ua.indexOf('Gecko')+6, this.ua.length));
		if (this.geckoVer < 20020000){this.min = false;}
	}
	
//Look for Firebird
	this.firebird = (this.ua.indexOf('Firebird') > 1);
	
//Look for Safari
	this.safari = (this.ua.indexOf('Safari') > 1);
	if (this.safari){
		this.gecko = false;
	}
	
//Look for IE
	this.ie = (this.ua.indexOf('MSIE') > 0);
	if (this.ie){
		this.ieVer = parseFloat(this.ua.substring(this.ua.indexOf('MSIE')+5, this.ua.length));
		if (this.ieVer < 5.5){this.min = false;}
	}
	
//Look for Opera
	this.opera = (this.ua.indexOf('Opera') > 0);
	if (this.opera){
		this.operaVer = parseFloat(this.ua.substring(this.ua.indexOf('Opera')+6, this.ua.length));
		if (this.operaVer < 7.04){this.min = false;}
	}
	if (this.min == false){
		alert('Your browser may not be able to handle this page.');
	}
	
//Special case for the horrible ie5mac
	this.ie5mac = (this.ie&&this.mac&&(this.ieVer<6));
}

var C = new Client();

//for (prop in C){
//	alert(prop + ': ' + C[prop]);
//}



//CODE FOR HANDLING NAV BUTTONS AND FUNCTION BUTTONS

//[strNavBarJS]
function NavBtnOver(Btn){
	if (Btn.className != 'NavButtonDown'){Btn.className = 'NavButtonUp';}
}

function NavBtnOut(Btn){
	Btn.className = 'NavButton';
}

function NavBtnDown(Btn){
	Btn.className = 'NavButtonDown';
}
//[/strNavBarJS]

function FuncBtnOver(Btn){
	if (Btn.className != 'FuncButtonDown'){Btn.className = 'FuncButtonUp';}
}

function FuncBtnOut(Btn){
	Btn.className = 'FuncButton';
}

function FuncBtnDown(Btn){
	Btn.className = 'FuncButtonDown';
}

function FocusAButton(){
	if (document.getElementById('CheckButton1') != null){
		document.getElementById('CheckButton1').focus();
	}
	else{
		if (document.getElementById('CheckButton2') != null){
			document.getElementById('CheckButton2').focus();
		}
		else{
			document.getElementsByTagName('button')[0].focus();
		}
	}
}




//CODE FOR HANDLING DISPLAY OF POPUP FEEDBACK BOX

var topZ = 1000;

function ShowMessage(Feedback){
	var Output = Feedback + '<br /><br />';
	document.getElementById('FeedbackContent').innerHTML = Output;
	var FDiv = document.getElementById('FeedbackDiv');
	topZ++;
	FDiv.style.zIndex = topZ;
	FDiv.style.top = TopSettingWithScrollOffset(30) + 'px';

	FDiv.style.display = 'block';

	ShowElements(false, 'input');
	ShowElements(false, 'select');
	ShowElements(false, 'object');

//Focus the OK button
	setTimeout("document.getElementById('FeedbackOKButton').focus()", 50);
	
//
}

function ShowElements(Show, TagName){
//Special for IE bug -- hide all the form elements that will show through the popup
	if (C.ie){
		var Els = document.getElementsByTagName(TagName);
		for (var i=0; i<Els.length; i++){
			if (Show == true){
				Els[i].style.display = 'inline';
			}
			else{
				Els[i].style.display = 'none';
			}
		}
	} 
}

function HideFeedback(){
	document.getElementById('FeedbackDiv').style.display = 'none';
	ShowElements(true, 'input');
	ShowElements(true, 'select');
	ShowElements(true, 'object');
	if (Finished == true){
		Finish();
	}
}


//GENERAL UTILITY FUNCTIONS AND VARIABLES

//PAGE DIMENSION FUNCTIONS
function PageDim(){
//Get the page width and height
	this.W = 600;
	this.H = 400;
	this.W = document.getElementsByTagName('body')[0].clientWidth;
	this.H = document.getElementsByTagName('body')[0].clientHeight;
}

var pg = null;

function GetPageXY(El) {
	var XY = {x: 0, y: 0};
	while(El){
		XY.x += El.offsetLeft;
		XY.y += El.offsetTop;
		El = El.offsetParent;
	}
	return XY;
}

function GetScrollTop(){
	if (document.documentElement && document.documentElement.scrollTop){
		return document.documentElement.scrollTop;
	}
	else{
		if (document.body){
 			return document.body.scrollTop;
		}
		else{
			return window.pageYOffset;
		}
	}
}

function GetViewportHeight(){
	if (window.innerHeight){
		return window.innerHeight;
	}
	else{
		return document.getElementsByTagName('body')[0].clientHeight;
	}
}

function TopSettingWithScrollOffset(TopPercent){
	var T = Math.floor(GetViewportHeight() * (TopPercent/100));
	return GetScrollTop() + T; 
}

//CODE FOR AVOIDING LOSS OF DATA WHEN BACKSPACE KEY INVOKES history.back()
var InTextBox = false;

function SuppressBackspace(e){ 
	if (InTextBox == true){return;}
	if (C.ie) {
		thisKey = window.event.keyCode;
	}
	else {
		thisKey = e.keyCode;
	}

	var Suppress = false;

	if (thisKey == 8) {
		Suppress = true;
	}

	if (Suppress == true){
		if (C.ie){
			window.event.returnValue = false;	
			window.event.cancelBubble = true;
		}
		else{
			e.preventDefault();
		}
	}
}

if (C.ie){
	document.attachEvent('onkeydown',SuppressBackspace);
	window.attachEvent('onkeydown',SuppressBackspace);
}
else{
	if (window.addEventListener){
		window.addEventListener('keypress',SuppressBackspace,false);
	}
}

function ReduceItems(InArray, ReduceToSize){
	var ItemToDump=0;
	var j=0;
	while (InArray.length > ReduceToSize){
		ItemToDump = Math.floor(InArray.length*Math.random());
		InArray.splice(ItemToDump, 1);
	}
}

function Shuffle(InArray){
	var Num;
	var Temp = new Array();
	var Len = InArray.length;

	var j = Len;

	for (var i=0; i<Len; i++){
		Temp[i] = InArray[i];
	}

	for (i=0; i<Len; i++){
		Num = Math.floor(j  *  Math.random());
		InArray[i] = Temp[Num];

		for (var k=Num; k < (j-1); k++) {
			Temp[k] = Temp[k+1];
		}
		j--;
	}
	return InArray;
}

function WriteToInstructions(Feedback) {
	document.getElementById('InstructionsDiv').innerHTML = Feedback;

}




function EscapeDoubleQuotes(InString){
	return InString.replace(/"/g, '&quot;')
}

function TrimString(InString){
        var x = 0;

        if (InString.length != 0) {
                while ((InString.charAt(InString.length - 1) == '\u0020') || (InString.charAt(InString.length - 1) == '\u000A') || (InString.charAt(InString.length - 1) == '\u000D')){
                        InString = InString.substring(0, InString.length - 1)
                }

                while ((InString.charAt(0) == '\u0020') || (InString.charAt(0) == '\u000A') || (InString.charAt(0) == '\u000D')){
                        InString = InString.substring(1, InString.length)
                }

                while (InString.indexOf('  ') != -1) {
                        x = InString.indexOf('  ')
                        InString = InString.substring(0, x) + InString.substring(x+1, InString.length)
                 }

                return InString;
        }

        else {
                return '';
        }
}

function FindLongest(InArray){
	if (InArray.length < 1){return -1;}

	var Longest = 0;
	for (var i=1; i<InArray.length; i++){
		if (InArray[i].length > InArray[Longest].length){
			Longest = i;
		}
	}
	return Longest;
}

//UNICODE CHARACTER FUNCTIONS
function IsCombiningDiacritic(CharNum){
	var Result = (((CharNum >= 0x0300)&&(CharNum <= 0x370))||((CharNum >= 0x20d0)&&(CharNum <= 0x20ff)));
	Result = Result || (((CharNum >= 0x3099)&&(CharNum <= 0x309a))||((CharNum >= 0xfe20)&&(CharNum <= 0xfe23)));
	return Result;
}

function IsCJK(CharNum){
	return ((CharNum >= 0x3000)&&(CharNum < 0xd800));
}

//SETUP FUNCTIONS
//BROWSER WILL REFILL TEXT BOXES FROM CACHE IF NOT PREVENTED
function ClearTextBoxes(){
	var NList = document.getElementsByTagName('input');
	for (var i=0; i<NList.length; i++){
		if ((NList[i].id.indexOf('Guess') > -1)||(NList[i].id.indexOf('Gap') > -1)){
			NList[i].value = '';
		}
		if (NList[i].id.indexOf('Chk') > -1){
			NList[i].checked = '';
		}
	}
}

//EXTENSION TO ARRAY OBJECT
function Array_IndexOf(Input){
	var Result = -1;
	for (var i=0; i<this.length; i++){
		if (this[i] == Input){
			Result = i;
		}
	}
	return Result;
}
Array.prototype.indexOf = Array_IndexOf;

//IE HAS RENDERING BUG WITH BOTTOM NAVBAR
function RemoveBottomNavBarForIE(){
	if ((C.ie)&&(document.getElementById('Reading') != null)){
		if (document.getElementById('BottomNavBar') != null){
			document.getElementById('TheBody').removeChild(document.getElementById('BottomNavBar'));
		}
	}
}




//HOTPOTNET-RELATED CODE

var HPNStartTime = (new Date()).getTime();
var SubmissionTimeout = 30000;
var Detail = ''; //Global that is used to submit tracking data

function Finish(){
//If there's a form, fill it out and submit it
	if (document.store != null){
		Frm = document.store;
		Frm.starttime.value = HPNStartTime;
		Frm.endtime.value = (new Date()).getTime();
		Frm.mark.value = Score;
		Frm.detail.value = Detail;
		Frm.submit();
	}
}



//JCLOZE CORE JAVASCRIPT CODE

function ItemState(){
	this.ClueGiven = false;
	this.HintsAndChecks = 0;
	this.MatchedAnswerLength = 0;
	this.ItemScore = 0;
	this.AnsweredCorrectly = false;
	this.Guesses = new Array();
	return this;
}

var Feedback = '';
var Correct = '&#x041F;&#x043E;&#x0437;&#x0434;&#x0440;&#x0430;&#x0432;&#x043B;&#x044F;&#x0435;&#x043C;! &#x0412;&#x0441;&#x0435; &#x043E;&#x0442;&#x0432;&#x0435;&#x0442;&#x044B; &#x0432;&#x0435;&#x0440;&#x043D;&#x044B;. &#x041C;&#x043E;&#x0436;&#x0435;&#x0442;&#x0435; &#x0437;&#x0430;&#x043A;&#x0440;&#x044B;&#x0442;&#x044C; &#x044D;&#x0442;&#x043E; &#x043E;&#x043A;&#x043D;&#x043E;.';
var Incorrect = '<P align=left>&#x041D;&#x0435;&#x043A;&#x043E;&#x0442;&#x043E;&#x0440;&#x044B;&#x0435; &#x0438;&#x0437; &#x0432;&#x0430;&#x0448;&#x0438;&#x0445; &#x043E;&#x0442;&#x0432;&#x0435;&#x0442;&#x043E;&#x0432; &#x043D;&#x0435;&#x0432;&#x0435;&#x0440;&#x043D;&#x044B;. <BR>&#x0412;&#x0430;&#x0448; &#x0440;&#x0435;&#x0437;&#x0443;&#x043B;&#x044C;&#x0442;&#x0430;&#x0442; &#x043C;&#x043E;&#x0436;&#x043D;&#x043E; &#x0443;&#x043B;&#x0443;&#x0447;&#x0448;&#x0438;&#x0442;&#x044C;, &#x0435;&#x0441;&#x043B;&#x0438; &#x0438;&#x0441;&#x043F;&#x0440;&#x0430;&#x0432;&#x0438;&#x0442;&#x044C; &#x043E;&#x0448;&#x0438;&#x0431;&#x043A;&#x0438; &#x0438; &#x0441;&#x043D;&#x043E;&#x0432;&#x0430; &#x043D;&#x0430;&#x0436;&#x0430;&#x0442;&#x044C; &#x043A;&#x043D;&#x043E;&#x043F;&#x043A;&#x0443; "&#x0413;&#x043E;&#x0442;&#x043E;&#x0432;&#x043E;".'; 
var GiveHint = '&#x041E;&#x0434;&#x043D;&#x0430; &#x043F;&#x0440;&#x0430;&#x0432;&#x0438;&#x043B;&#x044C;&#x043D;&#x0430;&#x044F; &#x0431;&#x0443;&#x043A;&#x0432;&#x0430; &#x0434;&#x043E;&#x0431;&#x0430;&#x0432;&#x043B;&#x0435;&#x043D;&#x0430; &#x0432; &#x043C;&#x0435;&#x0441;&#x0442;&#x043E; &#x0440;&#x0430;&#x0441;&#x043F;&#x043E;&#x043B;&#x043E;&#x0436;&#x0435;&#x043D;&#x0438;&#x044F; &#x043C;&#x0438;&#x0433;&#x0430;&#x044E;&#x0449;&#x0435;&#x0433;&#x043E; &#x043A;&#x0443;&#x0440;&#x0441;&#x043E;&#x0440;&#x0430; &#x043F;&#x043E; &#x0432;&#x0430;&#x0448;&#x0435;&#x0439; &#x043F;&#x0440;&#x043E;&#x0441;&#x044C;&#x0431;&#x0435;. &#x042D;&#x0442;&#x043E; &#x0447;&#x0430;&#x0441;&#x0442;&#x0438;&#x0447;&#x043D;&#x043E; &#x0443;&#x0445;&#x0443;&#x0434;&#x0448;&#x0438;&#x0442; &#x0432;&#x0430;&#x0448; &#x0440;&#x0435;&#x0437;&#x0443;&#x043B;&#x044C;&#x0442;&#x0430;&#x0442;.';
var CaseSensitive = false;
var YourScoreIs = '&#x0412;&#x0430;&#x0448; &#x0440;&#x0435;&#x0437;&#x0443;&#x043B;&#x044C;&#x0442;&#x0430;&#x0442;:';
var Finished = false;
var Locked = false;
var Score = 0;
var CurrentWord = 0;
var Guesses = '';
var TimeOver = false;

I = new Array();

I[0] = new Array();
I[0][1] = new Array();
I[0][1][0] = new Array();
I[0][1][0][0] = '\u002D';
I[0][2]='';

I[1] = new Array();
I[1][1] = new Array();
I[1][1][0] = new Array();
I[1][1][0][0] = '\u0430\u0440\u0445\u0430\u043D\u0433\u0435\u043B\u044C\u0446\u044B';
I[1][2]='';

I[2] = new Array();
I[2][1] = new Array();
I[2][1][0] = new Array();
I[2][1][0][0] = '\u0430\u0440\u0445\u0430\u043D\u0433\u0435\u043B\u043E\u0433\u043E\u0440\u043E\u0434\u0435\u0446';
I[2][2]='';

I[3] = new Array();
I[3][1] = new Array();
I[3][1][0] = new Array();
I[3][1][0][0] = '\u0430\u0440\u0445\u0430\u043D\u0433\u0435\u043B\u043E\u0433\u043E\u0440\u043E\u0434\u043A\u0430';
I[3][2]='';

I[4] = new Array();
I[4][1] = new Array();
I[4][1][0] = new Array();
I[4][1][0][0] = '\u0430\u0440\u0445\u0430\u043D\u0433\u0435\u043B\u043E\u0433\u043E\u0440\u043E\u0434\u0446\u044B';
I[4][2]='';

I[5] = new Array();
I[5][1] = new Array();
I[5][1][0] = new Array();
I[5][1][0][0] = '\u0431\u0430\u0440\u043D\u0430\u0443\u043B\u0435\u0446';
I[5][2]='';

I[6] = new Array();
I[6][1] = new Array();
I[6][1][0] = new Array();
I[6][1][0][0] = '\u002D';
I[6][2]='';

I[7] = new Array();
I[7][1] = new Array();
I[7][1][0] = new Array();
I[7][1][0][0] = '\u0431\u0430\u0440\u043D\u0430\u0443\u043B\u044C\u0446\u044B';
I[7][2]='';

I[8] = new Array();
I[8][1] = new Array();
I[8][1][0] = new Array();
I[8][1][0][0] = '\u0432\u043E\u043B\u043E\u0433\u0436\u0430\u043D\u043A\u0430';
I[8][2]='';

I[9] = new Array();
I[9][1] = new Array();
I[9][1][0] = new Array();
I[9][1][0][0] = '\u0432\u043E\u043B\u043E\u0433\u0436\u0430\u043D\u0435';
I[9][2]='';

I[10] = new Array();
I[10][1] = new Array();
I[10][1][0] = new Array();
I[10][1][0][0] = '\u0432\u043E\u043B\u043E\u0433\u043E\u0434\u0435\u0446';
I[10][2]='';

I[11] = new Array();
I[11][1] = new Array();
I[11][1][0] = new Array();
I[11][1][0][0] = '\u002D';
I[11][2]='';

I[12] = new Array();
I[12][1] = new Array();
I[12][1][0] = new Array();
I[12][1][0][0] = '\u0432\u043E\u043B\u043E\u0433\u043E\u0434\u0446\u044B';
I[12][2]='';

I[13] = new Array();
I[13][1] = new Array();
I[13][1][0] = new Array();
I[13][1][0][0] = '\u0432\u043E\u0440\u043E\u043D\u0435\u0436\u0435\u0446';
I[13][2]='';

I[14] = new Array();
I[14][1] = new Array();
I[14][1][0] = new Array();
I[14][1][0][0] = '\u002D';
I[14][2]='';

I[15] = new Array();
I[15][1] = new Array();
I[15][1][0] = new Array();
I[15][1][0][0] = '\u0432\u043E\u0440\u043E\u043D\u0435\u0436\u0446\u044B';
I[15][2]='';

I[16] = new Array();
I[16][1] = new Array();
I[16][1][0] = new Array();
I[16][1][0][0] = '\u0435\u0432\u043F\u0430\u0442\u043E\u0440\u0438\u0435\u0446';
I[16][2]='';

I[17] = new Array();
I[17][1] = new Array();
I[17][1][0] = new Array();
I[17][1][0][0] = '\u0435\u0432\u043F\u0430\u0442\u043E\u0440\u0438\u0439\u043A\u0430';
I[17][2]='';

I[18] = new Array();
I[18][1] = new Array();
I[18][1][0] = new Array();
I[18][1][0][0] = '\u0435\u0432\u043F\u0430\u0442\u043E\u0440\u0438\u0439\u0446\u044B';
I[18][2]='';

I[19] = new Array();
I[19][1] = new Array();
I[19][1][0] = new Array();
I[19][1][0][0] = '\u0439\u043E\u0448\u043A\u0430\u0440\u043E\u043B\u0438\u043D\u0435\u0446';
I[19][2]='';

I[20] = new Array();
I[20][1] = new Array();
I[20][1][0] = new Array();
I[20][1][0][0] = '\u0439\u043E\u0448\u043A\u0430\u0440\u043E\u043B\u0438\u043D\u043A\u0430';
I[20][2]='';

I[21] = new Array();
I[21][1] = new Array();
I[21][1][0] = new Array();
I[21][1][0][0] = '\u0439\u043E\u0448\u043A\u0430\u0440\u043E\u043B\u0438\u043D\u0446\u044B';
I[21][2]='';

I[22] = new Array();
I[22][1] = new Array();
I[22][1][0] = new Array();
I[22][1][0][0] = '\u043A\u0443\u0440\u044F\u043D\u0438\u043D';
I[22][2]='';

I[23] = new Array();
I[23][1] = new Array();
I[23][1][0] = new Array();
I[23][1][0][0] = '\u043A\u0443\u0440\u044F\u043D\u043A\u0430';
I[23][2]='';

I[24] = new Array();
I[24][1] = new Array();
I[24][1][0] = new Array();
I[24][1][0][0] = '\u043A\u0443\u0440\u044F\u043D\u0435';
I[24][2]='';

I[25] = new Array();
I[25][1] = new Array();
I[25][1][0] = new Array();
I[25][1][0][0] = '\u002D';
I[25][2]='';

I[26] = new Array();
I[26][1] = new Array();
I[26][1][0] = new Array();
I[26][1][0][0] = '\u043C\u0443\u0440\u043E\u043C\u0446\u044B';
I[26][2]='';

I[27] = new Array();
I[27][1] = new Array();
I[27][1][0] = new Array();
I[27][1][0][0] = '\u043C\u0443\u0440\u043E\u043C\u0447\u0430\u043D\u043A\u0430';
I[27][2]='';

I[28] = new Array();
I[28][1] = new Array();
I[28][1][0] = new Array();
I[28][1][0][0] = '\u043C\u0443\u0440\u043E\u043C\u0447\u0430\u043D\u0435';
I[28][2]='';

I[29] = new Array();
I[29][1] = new Array();
I[29][1][0] = new Array();
I[29][1][0][0] = '\u043C\u0443\u0440\u043E\u043C\u043B\u044F\u043D\u0438\u043D';
I[29][2]='';

I[30] = new Array();
I[30][1] = new Array();
I[30][1][0] = new Array();
I[30][1][0][0] = '\u043C\u0443\u0440\u043E\u043C\u043B\u044F\u043D\u043A\u0430';
I[30][2]='';

I[31] = new Array();
I[31][1] = new Array();
I[31][1][0] = new Array();
I[31][1][0][0] = '\u043C\u0443\u0440\u043E\u043C\u043B\u044F\u043D\u0435';
I[31][2]='';

I[32] = new Array();
I[32][1] = new Array();
I[32][1][0] = new Array();
I[32][1][0][0] = '\u043D\u0438\u0436\u0435\u0433\u043E\u0440\u043E\u0434\u0435\u0446';
I[32][2]='';

I[33] = new Array();
I[33][1] = new Array();
I[33][1][0] = new Array();
I[33][1][0][0] = '\u043D\u0438\u0436\u0435\u0433\u043E\u0440\u043E\u0434\u043A\u0430';
I[33][2]='';

I[34] = new Array();
I[34][1] = new Array();
I[34][1][0] = new Array();
I[34][1][0][0] = '\u043D\u0438\u0436\u0435\u0433\u043E\u0440\u043E\u0434\u0446\u044B';
I[34][2]='';

I[35] = new Array();
I[35][1] = new Array();
I[35][1][0] = new Array();
I[35][1][0][0] = '\u043E\u043C\u0438\u0447\u043A\u0430';
I[35][2]='';

I[36] = new Array();
I[36][1] = new Array();
I[36][1][0] = new Array();
I[36][1][0][0] = '\u043E\u043C\u0438\u0447\u0438';
I[36][2]='';

I[37] = new Array();
I[37][1] = new Array();
I[37][1][0] = new Array();
I[37][1][0][0] = '\u043E\u043C\u0447\u0430\u043D\u043A\u0430';
I[37][2]='';

I[38] = new Array();
I[38][1] = new Array();
I[38][1][0] = new Array();
I[38][1][0][0] = '\u043E\u043C\u0447\u0430\u043D\u0435';
I[38][2]='';

I[39] = new Array();
I[39][1] = new Array();
I[39][1][0] = new Array();
I[39][1][0][0] = '\u043E\u043C\u0435\u0446';
I[39][2]='';

I[40] = new Array();
I[40][1] = new Array();
I[40][1][0] = new Array();
I[40][1][0][0] = '\u002D';
I[40][2]='';

I[41] = new Array();
I[41][1] = new Array();
I[41][1][0] = new Array();
I[41][1][0][0] = '\u043E\u043C\u0446\u044B';
I[41][2]='';

I[42] = new Array();
I[42][1] = new Array();
I[42][1][0] = new Array();
I[42][1][0][0] = '\u043E\u0440\u0435\u043D\u0431\u0443\u0440\u0436\u0435\u0446';
I[42][2]='';

I[43] = new Array();
I[43][1] = new Array();
I[43][1][0] = new Array();
I[43][1][0][0] = '\u043E\u0440\u0435\u043D\u0431\u0443\u0440\u0436\u0435\u043D\u043A\u0430';
I[43][2]='';

I[44] = new Array();
I[44][1] = new Array();
I[44][1][0] = new Array();
I[44][1][0][0] = '\u043E\u0440\u0435\u043D\u0431\u0443\u0440\u0436\u0446\u044B';
I[44][2]='';

I[45] = new Array();
I[45][1] = new Array();
I[45][1][0] = new Array();
I[45][1][0][0] = '\u043F\u0435\u043D\u0437\u0435\u043D\u0435\u0446';
I[45][2]='';

I[46] = new Array();
I[46][1] = new Array();
I[46][1][0] = new Array();
I[46][1][0][0] = '\u043F\u0435\u043D\u0437\u0435\u043D\u043A\u0430';
I[46][2]='';

I[47] = new Array();
I[47][1] = new Array();
I[47][1][0] = new Array();
I[47][1][0][0] = '\u043F\u0435\u043D\u0437\u0435\u043D\u0446\u044B';
I[47][2]='';

I[48] = new Array();
I[48][1] = new Array();
I[48][1][0] = new Array();
I[48][1][0][0] = '\u043F\u0435\u0440\u043C\u044F\u043A';
I[48][2]='';

I[49] = new Array();
I[49][1] = new Array();
I[49][1][0] = new Array();
I[49][1][0][0] = '\u043F\u0435\u0440\u043C\u044F\u0447\u043A\u0430';
I[49][2]='';

I[50] = new Array();
I[50][1] = new Array();
I[50][1][0] = new Array();
I[50][1][0][0] = '\u043F\u0435\u0440\u043C\u044F\u043A\u0438';
I[50][2]='';

I[51] = new Array();
I[51][1] = new Array();
I[51][1][0] = new Array();
I[51][1][0][0] = '\u043F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0436\u0435\u043D\u043A\u0430';
I[51][1][1] = new Array();
I[51][1][1][0]='\u043F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0436\u043A\u0430';
I[51][2]='';

I[52] = new Array();
I[52][1] = new Array();
I[52][1][0] = new Array();
I[52][1][0][0] = '\u043F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0436\u0446\u044B';
I[52][2]='';

I[53] = new Array();
I[53][1] = new Array();
I[53][1][0] = new Array();
I[53][1][0][0] = '\u043F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0436\u0430\u043D\u0438\u043D';
I[53][2]='';

I[54] = new Array();
I[54][1] = new Array();
I[54][1][0] = new Array();
I[54][1][0][0] = '\u043F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0436\u0430\u043D\u043A\u0430';
I[54][2]='';

I[55] = new Array();
I[55][1] = new Array();
I[55][1][0] = new Array();
I[55][1][0][0] = '\u043F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0436\u0430\u043D\u0435';
I[55][2]='';

I[56] = new Array();
I[56][1] = new Array();
I[56][1][0] = new Array();
I[56][1][0][0] = '\u043F\u0441\u043A\u043E\u0432\u0438\u0447\u0430\u043D\u043A\u0430';
I[56][2]='';

I[57] = new Array();
I[57][1] = new Array();
I[57][1][0] = new Array();
I[57][1][0][0] = '\u043F\u0441\u043A\u043E\u0432\u0438\u0442\u044F\u043D\u0435';
I[57][2]='';

I[58] = new Array();
I[58][1] = new Array();
I[58][1][0] = new Array();
I[58][1][0][0] = '\u043F\u0441\u043A\u043E\u0432\u0438\u0447\u0430\u043D\u043A\u0430';
I[58][2]='';

I[59] = new Array();
I[59][1] = new Array();
I[59][1][0] = new Array();
I[59][1][0][0] = '\u043F\u0441\u043A\u043E\u0432\u0438\u0447\u0430\u043D\u0435';
I[59][2]='';

I[60] = new Array();
I[60][1] = new Array();
I[60][1][0] = new Array();
I[60][1][0][0] = '\u043F\u0441\u043A\u043E\u0432\u0438\u0447';
I[60][2]='';

I[61] = new Array();
I[61][1] = new Array();
I[61][1][0] = new Array();
I[61][1][0][0] = '\u043F\u0441\u043A\u043E\u0432\u0438\u0447\u043A\u0430';
I[61][2]='';

I[62] = new Array();
I[62][1] = new Array();
I[62][1][0] = new Array();
I[62][1][0][0] = '\u043F\u0441\u043A\u043E\u0432\u0438\u0447\u0438';
I[62][2]='';

I[63] = new Array();
I[63][1] = new Array();
I[63][1][0] = new Array();
I[63][1][0][0] = '\u0440\u043E\u0441\u0442\u043E\u0432\u043A\u0430';
I[63][2]='';

I[64] = new Array();
I[64][1] = new Array();
I[64][1][0] = new Array();
I[64][1][0][0] = '\u0440\u043E\u0441\u0442\u043E\u0432\u0446\u044B';
I[64][2]='';

I[65] = new Array();
I[65][1] = new Array();
I[65][1][0] = new Array();
I[65][1][0][0] = '\u0440\u043E\u0441\u0442\u043E\u0432\u0447\u0430\u043D\u0438\u043D';
I[65][2]='';

I[66] = new Array();
I[66][1] = new Array();
I[66][1][0] = new Array();
I[66][1][0][0] = '\u0440\u043E\u0441\u0442\u043E\u0432\u0447\u0430\u043D\u043A\u0430';
I[66][2]='';

I[67] = new Array();
I[67][1] = new Array();
I[67][1][0] = new Array();
I[67][1][0][0] = '\u0440\u043E\u0441\u0442\u043E\u0432\u0447\u0430\u043D\u0435';
I[67][2]='';

I[68] = new Array();
I[68][1] = new Array();
I[68][1][0] = new Array();
I[68][1][0][0] = '\u0441\u0430\u0440\u0430\u0442\u043E\u0432\u043A\u0430';
I[68][2]='';

I[69] = new Array();
I[69][1] = new Array();
I[69][1][0] = new Array();
I[69][1][0][0] = '\u0441\u0430\u0440\u0430\u0442\u043E\u0432\u0446\u044B';
I[69][2]='';

I[70] = new Array();
I[70][1] = new Array();
I[70][1][0] = new Array();
I[70][1][0][0] = '\u0441\u0430\u0440\u0430\u0442\u043E\u0432\u0447\u0430\u043D\u0438\u043D';
I[70][2]='';

I[71] = new Array();
I[71][1] = new Array();
I[71][1][0] = new Array();
I[71][1][0][0] = '\u0441\u0430\u0440\u0430\u0442\u043E\u0432\u0447\u0430\u043D\u043A\u0430';
I[71][2]='';

I[72] = new Array();
I[72][1] = new Array();
I[72][1][0] = new Array();
I[72][1][0][0] = '\u0441\u0430\u0440\u0430\u0442\u043E\u0432\u0447\u0430\u043D\u0435';
I[72][2]='';

I[73] = new Array();
I[73][1] = new Array();
I[73][1][0] = new Array();
I[73][1][0][0] = '\u0441\u0435\u0440\u043F\u0443\u0445\u043E\u0432\u0438\u0447\u043A\u0430';
I[73][2]='';

I[74] = new Array();
I[74][1] = new Array();
I[74][1][0] = new Array();
I[74][1][0][0] = '\u0441\u0435\u0440\u043F\u0443\u0445\u043E\u0432\u0438\u0447\u0438';
I[74][2]='';

I[75] = new Array();
I[75][1] = new Array();
I[75][1][0] = new Array();
I[75][1][0][0] = '\u0441\u0435\u0440\u043F\u0443\u0445\u043E\u0432\u0447\u0430\u043D\u043A\u0430';
I[75][2]='';

I[76] = new Array();
I[76][1] = new Array();
I[76][1][0] = new Array();
I[76][1][0][0] = '\u0441\u0435\u0440\u043F\u0443\u0445\u043E\u0432\u0447\u0430\u043D\u0435';
I[76][2]='';

I[77] = new Array();
I[77][1] = new Array();
I[77][1][0] = new Array();
I[77][1][0][0] = '\u0441\u0435\u0440\u043F\u0443\u0445\u043E\u0432\u0435\u0446';
I[77][2]='';

I[78] = new Array();
I[78][1] = new Array();
I[78][1][0] = new Array();
I[78][1][0][0] = '\u002D';
I[78][2]='';

I[79] = new Array();
I[79][1] = new Array();
I[79][1][0] = new Array();
I[79][1][0][0] = '\u0441\u0435\u0440\u043F\u0443\u0445\u043E\u0432\u0446\u044B';
I[79][2]='';

I[80] = new Array();
I[80][1] = new Array();
I[80][1][0] = new Array();
I[80][1][0][0] = '\u0441\u0442\u0430\u0440\u043E\u0440\u0443\u0441\u043A\u0430';
I[80][2]='';

I[81] = new Array();
I[81][1] = new Array();
I[81][1][0] = new Array();
I[81][1][0][0] = '\u0441\u0442\u0430\u0440\u043E\u0440\u0443\u0441\u0446\u044B';
I[81][2]='';

I[82] = new Array();
I[82][1] = new Array();
I[82][1][0] = new Array();
I[82][1][0][0] = '\u0441\u0442\u0430\u0440\u043E\u0440\u0443\u0448\u0430\u043D\u043A\u0430';
I[82][2]='';

I[83] = new Array();
I[83][1] = new Array();
I[83][1][0] = new Array();
I[83][1][0][0] = '\u0441\u0442\u0430\u0440\u043E\u0440\u0443\u0448\u0430\u043D\u0435';
I[83][2]='';

I[84] = new Array();
I[84][1] = new Array();
I[84][1][0] = new Array();
I[84][1][0][0] = '\u0441\u0442\u0430\u0440\u043E\u0440\u0443\u0441\u044F\u043D\u0438\u043D';
I[84][2]='';

I[85] = new Array();
I[85][1] = new Array();
I[85][1][0] = new Array();
I[85][1][0][0] = '\u0441\u0442\u0430\u0440\u043E\u0440\u0443\u0441\u044F\u043D\u043A\u0430';
I[85][2]='';

I[86] = new Array();
I[86][1] = new Array();
I[86][1][0] = new Array();
I[86][1][0][0] = '\u0441\u0442\u0430\u0440\u043E\u0440\u0443\u0441\u044F\u043D\u0435';
I[86][2]='';

I[87] = new Array();
I[87][1] = new Array();
I[87][1][0] = new Array();
I[87][1][0][0] = '\u0442\u0430\u0440\u0443\u0441\u044F\u043D\u043A\u0430';
I[87][2]='';

I[88] = new Array();
I[88][1] = new Array();
I[88][1][0] = new Array();
I[88][1][0][0] = '\u0442\u0430\u0440\u0443\u0441\u044F\u043D\u0435';
I[88][2]='';

I[89] = new Array();
I[89][1] = new Array();
I[89][1][0] = new Array();
I[89][1][0][0] = '\u0442\u0430\u0440\u0443\u0441\u0435\u0446';
I[89][2]='';

I[90] = new Array();
I[90][1] = new Array();
I[90][1][0] = new Array();
I[90][1][0][0] = '\u002D';
I[90][2]='';

I[91] = new Array();
I[91][1] = new Array();
I[91][1][0] = new Array();
I[91][1][0][0] = '\u0442\u0430\u0440\u0443\u0441\u0446\u044B';
I[91][2]='';

I[92] = new Array();
I[92][1] = new Array();
I[92][1][0] = new Array();
I[92][1][0][0] = '\u0442\u043E\u043C\u0438\u0447\u043A\u0430';
I[92][2]='';

I[93] = new Array();
I[93][1] = new Array();
I[93][1][0] = new Array();
I[93][1][0][0] = '\u0442\u043E\u043C\u0438\u0447\u0438';
I[93][2]='';

I[94] = new Array();
I[94][1] = new Array();
I[94][1][0] = new Array();
I[94][1][0][0] = '\u0442\u043E\u043C\u0447\u0430\u043D\u043A\u0430';
I[94][2]='';

I[95] = new Array();
I[95][1] = new Array();
I[95][1][0] = new Array();
I[95][1][0][0] = '\u0442\u043E\u043C\u0447\u0430\u043D\u0435';
I[95][2]='';

I[96] = new Array();
I[96][1] = new Array();
I[96][1][0] = new Array();
I[96][1][0][0] = '\u0442\u043E\u043C\u0438\u0447\u0430\u043D\u0438\u043D';
I[96][2]='';

I[97] = new Array();
I[97][1] = new Array();
I[97][1][0] = new Array();
I[97][1][0][0] = '\u0442\u043E\u043C\u0438\u0447\u0430\u043D\u043A\u0430';
I[97][2]='';

I[98] = new Array();
I[98][1] = new Array();
I[98][1][0] = new Array();
I[98][1][0][0] = '\u0442\u043E\u043C\u0438\u0447\u0430\u043D\u0435';
I[98][2]='';

I[99] = new Array();
I[99][1] = new Array();
I[99][1][0] = new Array();
I[99][1][0][0] = '\u0442\u0443\u043B\u044F\u0447\u043A\u0430';
I[99][2]='';

I[100] = new Array();
I[100][1] = new Array();
I[100][1][0] = new Array();
I[100][1][0][0] = '\u0442\u0443\u043B\u044F\u043A\u0438';
I[100][2]='';

I[101] = new Array();
I[101][1] = new Array();
I[101][1][0] = new Array();
I[101][1][0][0] = '\u0442\u0443\u043B\u044C\u0447\u0430\u043D\u043A\u0430';
I[101][2]='';

I[102] = new Array();
I[102][1] = new Array();
I[102][1][0] = new Array();
I[102][1][0][0] = '\u0442\u0443\u043B\u044C\u0447\u0430\u043D\u0435';
I[102][2]='';

I[103] = new Array();
I[103][1] = new Array();
I[103][1][0] = new Array();
I[103][1][0][0] = '\u0442\u0443\u043B\u044F\u043D\u0438\u043D';
I[103][2]='';

I[104] = new Array();
I[104][1] = new Array();
I[104][1][0] = new Array();
I[104][1][0][0] = '\u0442\u0443\u043B\u044F\u043D\u043A\u0430';
I[104][2]='';

I[105] = new Array();
I[105][1] = new Array();
I[105][1][0] = new Array();
I[105][1][0][0] = '\u0442\u0443\u043B\u044F\u043D\u0435';
I[105][2]='';

I[106] = new Array();
I[106][1] = new Array();
I[106][1][0] = new Array();
I[106][1][0][0] = '\u0443\u0444\u0438\u043C\u043A\u0430';
I[106][2]='';

I[107] = new Array();
I[107][1] = new Array();
I[107][1][0] = new Array();
I[107][1][0][0] = '\u0443\u0444\u0438\u043C\u0446\u044B';
I[107][2]='';

I[108] = new Array();
I[108][1] = new Array();
I[108][1][0] = new Array();
I[108][1][0][0] = '\u0443\u0444\u0438\u043C\u0447\u0430\u043D\u0438\u043D';
I[108][2]='';

I[109] = new Array();
I[109][1] = new Array();
I[109][1][0] = new Array();
I[109][1][0][0] = '\u0443\u0444\u0438\u043C\u0447\u0430\u043D\u043A\u0430';
I[109][2]='';

I[110] = new Array();
I[110][1] = new Array();
I[110][1][0] = new Array();
I[110][1][0][0] = '\u0443\u0444\u0438\u043C\u0447\u0430\u043D\u0435';
I[110][2]='';

I[111] = new Array();
I[111][1] = new Array();
I[111][1][0] = new Array();
I[111][1][0][0] = '\u0445\u0430\u0431\u0430\u0440\u043E\u0432\u0447\u0430\u043D\u043A\u0430';
I[111][2]='';

I[112] = new Array();
I[112][1] = new Array();
I[112][1][0] = new Array();
I[112][1][0][0] = '\u0445\u0430\u0431\u0430\u0440\u043E\u0432\u0447\u0430\u043D\u0435';
I[112][2]='';

I[113] = new Array();
I[113][1] = new Array();
I[113][1][0] = new Array();
I[113][1][0][0] = '\u0445\u0430\u0431\u0430\u0440\u043E\u0432\u0435\u0446';
I[113][2]='';

I[114] = new Array();
I[114][1] = new Array();
I[114][1][0] = new Array();
I[114][1][0][0] = '\u002D';
I[114][2]='';

I[115] = new Array();
I[115][1] = new Array();
I[115][1][0] = new Array();
I[115][1][0][0] = '\u0445\u0430\u0431\u0430\u0440\u043E\u0432\u0446\u044B';
I[115][2]='';

I[116] = new Array();
I[116][1] = new Array();
I[116][1][0] = new Array();
I[116][1][0][0] = '\u044F\u0440\u043E\u0441\u043B\u0430\u0432\u043A\u0430';
I[116][2]='';

I[117] = new Array();
I[117][1] = new Array();
I[117][1][0] = new Array();
I[117][1][0][0] = '\u044F\u0440\u043E\u0441\u043B\u0430\u0432\u0446\u044B';
I[117][2]='';

I[118] = new Array();
I[118][1] = new Array();
I[118][1][0] = new Array();
I[118][1][0][0] = '\u044F\u0440\u043E\u0441\u043B\u0430\u0432\u0438\u0447';
I[118][2]='';

I[119] = new Array();
I[119][1] = new Array();
I[119][1][0] = new Array();
I[119][1][0][0] = '\u002D';
I[119][2]='';

I[120] = new Array();
I[120][1] = new Array();
I[120][1][0] = new Array();
I[120][1][0][0] = '\u044F\u0440\u043E\u0441\u043B\u0430\u0432\u0438\u0447\u0438';
I[120][2]='';


State = new Array();

function StartUp(){
	RemoveBottomNavBarForIE();
//Show a keypad if there is one	(added bugfix for 6.0.4.12)
	if (document.getElementById('CharacterKeypad') != null){
		document.getElementById('CharacterKeypad').style.display = 'block';
	}





	var i = 0;

	State.length = 0;
	for (i=0; i<I.length; i++){
		State[i] = new ItemState();
	}
	
	ClearTextBoxes();
	


}

function ShowClue(ItemNum){
	if (Locked == true){return;}
	State[ItemNum].ClueGiven = true;
	ShowMessage(I[ItemNum][2]);
}

function SaveCurrentAnswers(){
	var Ans = '';
	for (var i=0; i<I.length; i++){
		Ans = GetGapValue(i);
		if ((Ans.length > 0)&&(Ans != State[i].Guesses[State[i].Guesses.length-1])){
			State[i].Guesses[State[i].Guesses.length] = Ans;
		}
	}
}

function CompileGuesses(){
	var F = document.getElementById('store');
	if (F != null){
		var Temp = '<?xml version="1.0"?><hpnetresult><fields>';
		var GapLabel = '';
		for (var i=0; i<State.length; i++){
			GapLabel = 'Gap ' + (i+1).toString();
			Temp += '<field><fieldname>' + GapLabel + '</fieldname>';
			Temp += '<fieldtype>student-responses</fieldtype><fieldlabel>' + GapLabel + '</fieldlabel>';
			Temp += '<fieldlabelid>JClozeStudentResponses</fieldlabelid><fielddata>';
			for (var j=0; j<State[i].Guesses.length; j++){
				if (j>0){Temp += '| ';}
				Temp += State[i].Guesses[j] + ' ';	
			}	
  		Temp += '</fielddata></field>';
		}
		Temp += '</fields></hpnetresult>';
		Detail = Temp;
	}
}

function CheckAnswers(){
	if (Locked == true){return;}
	SaveCurrentAnswers();
	var AllCorrect = true;

//Check each answer
	for (var i = 0; i<I.length; i++){

		if (State[i].AnsweredCorrectly == false){
//If it's right, calculate its score
			if (CheckAnswer(i, true) > -1){
				var TotalChars = GetGapValue(i).length;
				State[i].ItemScore = (TotalChars-State[i].HintsAndChecks)/TotalChars;
				if (State[i].ClueGiven == true){State[i].ItemScore /= 2;}
				if (State[i].ItemScore <0 ){State[i].ItemScore = 0;}
				State[i].AnsweredCorrectly = true;
//Drop the correct answer into the page, replacing the text box
				SetCorrectAnswer(i, GetGapValue(i));
			}
			else{
//Otherwise, increment the hints for this item, as a penalty
				State[i].HintsAndChecks++;

//then set the flag
				AllCorrect = false;
			}
		}
	}

//Calculate the total score
	var TotalScore = 0;
	for (i=0; i<State.length; i++){
		TotalScore += State[i].ItemScore;
	}
	TotalScore = Math.floor((TotalScore * 100)/I.length);

//Compile the output
	Output = '';

	if (AllCorrect == true){
		Output = Correct + '<br />';
	}

	Output += YourScoreIs + ' ' + TotalScore + '%.<br />';
	if (AllCorrect == false){
		Output += '<br />' + Incorrect;
	}
	ShowMessage(Output);
	setTimeout('WriteToInstructions(Output)', 50);
	
	Score = TotalScore;
	CompileGuesses();
	
	if ((AllCorrect == true)||(Finished == true)){


		TimeOver = true;
		Locked = true;
		Finished = true;
		setTimeout('Finish()', SubmissionTimeout);
	}
}

function TrackFocus(BoxNumber){
	CurrentWord = BoxNumber;
	InTextBox = true;
}

function LeaveGap(){
	InTextBox = false;
}

function CheckBeginning(Guess, Answer){
	var OutString = '';
	var i = 0;
	var UpperGuess = '';
	var UpperAnswer = '';

	if (CaseSensitive == false) {
		UpperGuess = Guess.toUpperCase();
		UpperAnswer = Answer.toUpperCase();
	}
	else {
		UpperGuess = Guess;
		UpperAnswer = Answer;
	}

	while (UpperGuess.charAt(i) == UpperAnswer.charAt(i)) {
		OutString += Guess.charAt(i);
		i++;
	}
	OutString += Answer.charAt(i);
	return OutString;
}

function GetGapValue(GNum){
	var RetVal = '';
	if ((GNum<0)||(GNum>=I.length)){return RetVal;}
	if (document.getElementById('Gap' + GNum) != null){
		RetVal = document.getElementById('Gap' + GNum).value;
		RetVal = TrimString(RetVal);
	}
	else{
		RetVal = State[GNum].Guesses[State[GNum].Guesses.length-1];
	}
	return RetVal;
}

function SetGapValue(GNum, Val){
	if ((GNum<0)||(GNum>=I.length)){return;}
	if (document.getElementById('Gap' + GNum) != null){
		document.getElementById('Gap' + GNum).value = Val;
		document.getElementById('Gap' + GNum).focus();
	}
}

function SetCorrectAnswer(GNum, Val){
	if ((GNum<0)||(GNum>=I.length)){return;}
	if (document.getElementById('GapSpan' + GNum) != null){
		document.getElementById('GapSpan' + GNum).innerHTML = Val;
	}
}

function FindCurrent() {
	var x = 0;
	FoundCurrent = -1;

//Test the current word:
//If its state is not set to already correct, check the word.
	if (State[CurrentWord].AnsweredCorrectly == false){
		if (CheckAnswer(CurrentWord, false) < 0){
			return CurrentWord;
		}
	}
	
	x=CurrentWord + 1;
	while (x<I.length){
		if (State[x].AnsweredCorrectly == false){
			if (CheckAnswer(x, false) < 0){
				return x;
			}
		}
	x++;	
	}

	x = 0;
	while (x<CurrentWord){
		if (State[x].AnsweredCorrectly == false){
			if (CheckAnswer(x, false) < 0){
				return x;
			}
		}
	x++;	
	}
	return FoundCurrent;
}

function CheckAnswer(GapNum, MarkAnswer){
	var Guess = GetGapValue(GapNum);
	var UpperGuess = '';
	var UpperAnswer = '';
	if (CaseSensitive == false){
		UpperGuess = Guess.toUpperCase();
	}
	else{
		UpperGuess = Guess;
	}
	var Match = -1;
	for (var i = 0; i<I[GapNum][1].length; i++){
		if (CaseSensitive == false){
			UpperAnswer = I[GapNum][1][i][0].toUpperCase();
		}
		else{
			UpperAnswer = I[GapNum][1][i][0];
		}
		if (TrimString(UpperGuess) == UpperAnswer){
			Match = i;
			if (MarkAnswer == true){
				State[GapNum].AnsweredCorrectly = true;
			}
		}
	}
	return Match;
}

function GetHint(GapNum){
	Guess = GetGapValue(GapNum);

	if (CheckAnswer(GapNum, false) > -1){return ''}
	RightBits = new Array();
	for (var i=0; i<I[GapNum][1].length; i++){
		RightBits[i] = CheckBeginning(Guess, I[GapNum][1][i][0]);
	}
	var RightOne = FindLongest(RightBits);
	var Result = I[GapNum][1][RightOne][0].substring(0,RightBits[RightOne].length);
//Add another char if the last one is a space
	if (Result.charAt(Result.length-1) == ' '){
		Result = I[GapNum][1][RightOne][0].substring(0,RightBits[RightOne].length+1);
	}
	return Result;
}

function ShowHint(){
	if (Locked == true){return;}
	var CurrGap = FindCurrent();
	if (CurrGap < 0){return;}

	var HintString = GetHint(CurrGap);

	if (HintString.length > 0){
		SetGapValue(CurrGap, HintString);
		State[CurrGap].HintsAndChecks += 1;
	}
	ShowMessage(GiveHint);
}

function TypeChars(Chars){
	var CurrGap = FindCurrent();
	if (CurrGap < 0){return;}
	if (document.getElementById('Gap' + CurrGap) != null){
		SetGapValue(CurrGap, document.getElementById('Gap' + CurrGap).value + Chars);
	}
}








//-->

//]]>



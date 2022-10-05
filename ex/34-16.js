

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
I[0][1][0][0] = '\u0430';
I[0][2]='';

I[1] = new Array();
I[1][1] = new Array();
I[1][1][0] = new Array();
I[1][1][0][0] = '\u043E';
I[1][1][1] = new Array();
I[1][1][1][0]='\u002D';
I[1][2]='';

I[2] = new Array();
I[2][1] = new Array();
I[2][1][0] = new Array();
I[2][1][0][0] = '\u002D';
I[2][2]='';

I[3] = new Array();
I[3][1] = new Array();
I[3][1][0] = new Array();
I[3][1][0][0] = '\u043E';
I[3][2]='';

I[4] = new Array();
I[4][1] = new Array();
I[4][1][0] = new Array();
I[4][1][0][0] = '\u002D';
I[4][2]='';

I[5] = new Array();
I[5][1] = new Array();
I[5][1][0] = new Array();
I[5][1][0][0] = '\u002D';
I[5][2]='';

I[6] = new Array();
I[6][1] = new Array();
I[6][1][0] = new Array();
I[6][1][0][0] = '\u043E';
I[6][2]='';

I[7] = new Array();
I[7][1] = new Array();
I[7][1][0] = new Array();
I[7][1][0][0] = '\u002D';
I[7][2]='';

I[8] = new Array();
I[8][1] = new Array();
I[8][1][0] = new Array();
I[8][1][0][0] = '\u0430';
I[8][2]='';

I[9] = new Array();
I[9][1] = new Array();
I[9][1][0] = new Array();
I[9][1][0][0] = '\u043E';
I[9][2]='';

I[10] = new Array();
I[10][1] = new Array();
I[10][1][0] = new Array();
I[10][1][0][0] = '\u043E';
I[10][1][1] = new Array();
I[10][1][1][0]='\u002D';
I[10][2]='';

I[11] = new Array();
I[11][1] = new Array();
I[11][1][0] = new Array();
I[11][1][0][0] = '\u002D';
I[11][2]='';

I[12] = new Array();
I[12][1] = new Array();
I[12][1][0] = new Array();
I[12][1][0][0] = '\u0430';
I[12][2]='';

I[13] = new Array();
I[13][1] = new Array();
I[13][1][0] = new Array();
I[13][1][0][0] = '\u043E';
I[13][2]='';

I[14] = new Array();
I[14][1] = new Array();
I[14][1][0] = new Array();
I[14][1][0][0] = '\u043E';
I[14][2]='';

I[15] = new Array();
I[15][1] = new Array();
I[15][1][0] = new Array();
I[15][1][0][0] = '\u0438';
I[15][2]='';

I[16] = new Array();
I[16][1] = new Array();
I[16][1][0] = new Array();
I[16][1][0][0] = '\u0430';
I[16][2]='';

I[17] = new Array();
I[17][1] = new Array();
I[17][1][0] = new Array();
I[17][1][0][0] = '\u002D';
I[17][2]='';

I[18] = new Array();
I[18][1] = new Array();
I[18][1][0] = new Array();
I[18][1][0][0] = '\u044B';
I[18][2]='';

I[19] = new Array();
I[19][1] = new Array();
I[19][1][0] = new Array();
I[19][1][0][0] = '\u002D';
I[19][2]='';


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



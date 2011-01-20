if (window.addEventListener) //DOM method for binding an event
window.addEventListener("load", startTestCases, false);
else if (window.attachEvent) //IE exclusive method for binding an event
window.attachEvent("onload", startTestCases)

function startTestCases() {
	var $r = $('#results');
	if(typeof window.setUp == 'function') {
	    var setup = window.setUp;
	}
	if(typeof window.tearDown == 'function') {
	    var teardown = window.tearDown;
	}
	var passed = 0;
	var failed = 0;
	$r.append('<ul>');
	for(var e in window){ 
		if(e.indexOf('test') == 0 && (typeof window[e] == 'function')){
			try {		
    		    if(setup) eval(setup());
				eval(e + '()');
				$r.append('<li style="background: #00FF00">' + e + '</li>');
				passed++;
			} catch (err) {
			    $r.append('<li style="background: #FF0000">FAILED: ' + e + ': ' + err + '</li>'); 
				failed++;
			}
			if(teardown) eval(teardown());
		}
	}
	$r.prepend('<p>Succeeded: ' + passed + ' of ' + (passed + failed) + '</p>');
	$('#results p').css('background', (failed==0) ? '#00FF00' : '#FF0000'); 
}
function assertTrue(a) {
	if(!eval(a)) throw Error('assertTrue(' + a + ')');
}
function assertFalse(a) {
	if(eval(a)) throw Error('assertFalse(' + a + ')');
}
function assertEquals(a,b) {
	if(!(a==b)) throw Error('assertEquals(' + a + ', ' + b+')');
}
function assertTripleEquals(a, b) {
	if(!(a===b)) throw Error('assertTripleEquals('+ a + ', ' + b + ')');
}
function fail(){
    throw Error('fail()');
}

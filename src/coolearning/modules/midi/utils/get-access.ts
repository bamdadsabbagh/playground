export function getAccess(){
    var midi = null;  // global MIDIAccess object todo move to state
    function onMIDISuccess( midiAccess ) {
        console.log( "MIDI ready!" );
        midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
    }

    function onMIDIFailure(msg) {
        console.log( "Failed to get MIDI access - " + msg );
    }

    // todo only compatible with chrome...
    //@ts-ignore
    navigator.requestMIDIAccess()
        .then( onMIDISuccess, onMIDIFailure );
}
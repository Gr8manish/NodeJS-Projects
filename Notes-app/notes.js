const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(err) {
        return [];
    }
}

var saveNotes = (note) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(note));
}

var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter(note => note.title == title);
    
    if (duplicateNotes.length == 0 ){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var getAll = () => {
    return fetchNotes();
}

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter(note => note.title == title);
    return filteredNotes;
}

var removeNote = (title) => {
    var notes = fetchNotes();
    var filterNotes = notes.filter(note => note.title != title);
    return filterNotes.length != notes.length; 
}

var logNote = (note) => {
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}
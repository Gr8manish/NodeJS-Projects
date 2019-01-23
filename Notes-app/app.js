const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

// Constant for title and body options which is shown in --help
const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of Note',
    demand: true,
    alias: 'b'
};

// Adding the help for all different commands using yargs 3rd party package
const argv = yargs
                .command('add','Add a new note',{
                    title: titleOptions,
                    body: bodyOptions
                })
                .command('list','List of notes')
                .command('read', 'Read a note',{
                    title: titleOptions
                })
                .command('remove','Remove a note',{
                    title: titleOptions
                })
                .help()
                .argv;

// Getting the command name
var command = argv._[0];

if(command=="add"){
    var note = notes.addNote(argv.title,argv.body);
    if (note) {
        console.log('Note created');
        console.log('-----------------');
        notes.logNote(note);
        console.log('-----------------');
    } else {
        console.log("Note with same title already exist, Please use different title");
    }
} else if (command=="list"){
    var allNotes = notes.getAll();
    console.log(`---------- NOTES --------------`);
    allNotes.forEach(note => {
        notes.logNote(note);
        console.log("");
    });
    console.log(`-------------------------------`);
} else if (command == "read"){
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('---------Note------------');
        notes.logNote(note[0]);
    } else {
        console.log('-----------------');
        console.log(`Note with title ${argv.title} does not exist`);
        console.log('-----------------');
    }
} else if (command == "remove") {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note removed' : 'Note not found';
    console.log('-----------------');
    console.log(message);
    console.log('-----------------');
} else {
    console.log('-----------------');
    console.log("Command not recognized"); 
    console.log('-----------------');
}
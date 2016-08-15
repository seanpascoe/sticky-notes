$(document).ready(function() {

  //toggle the form and button txt
  function slideForm() {
    var btnText = $('#create-note-form').is(':visible') ? "Add Note" : "Cancel";
    $('#create-note-form').slideToggle();
    $('#create-note').text(btnText);
    $('#title').focus();
  }

  //when create note button is clicked, toggle the form and button txt
  $('#create-note').click(function() {
    slideForm();
  });

  //get all notes and return notes object
  function getAllNotes() {
    $.ajax({
      url: '/notes',
      method: 'GET',
      dataType: 'JSON'
    }).done(function(notes) {
      displayNotes(notes);
    }).fail(function(err) {
      console.log(err);
    });
  }

  //'add note' button click handler
  $("button[type='submit']").on('click', function(e) {
    e.preventDefault();
    if ($.trim($('#title').val())) {
      addNote();
    } else {
      Materialize.toast('You need to enter a title!', 2000, 'rounded')
    }
  });

  //add note logic
  function addNote() {
    slideForm();
    var titleEl = $('#title');
    var contentEl = $('#content');

    $.ajax({
      url: '/',
      method: 'POST',
      data: {
        title: titleEl.val(),
        content: contentEl.val()
      },
      dataType: 'JSON'
    }).done(function(msg) {
      titleEl.closest('form')[0].reset();
      getAllNotes();
      console.log(msg.success ? "Note Created!" : "Somthing went wrong");
    }).fail(function(err) {
      console.log(err);
    });
  };

  //display all notes
  function displayNotes(notes) {
    var notesBoard = $('#notes-board');
    notesBoard.empty()

    notes.forEach(function(note) {
      let noteHTML = `
        <div id="${note._id}" class="note col s12 m6 l4">
          <div class="card small amber accent-1">
            <div class="card-content blue-grey-text">
              <span class="card-title">${note.title}</span>
              <p class="note-content">${note.content}</p>
            </div>
            <div class="card-action">
              <a class="view-note">View/Edit</a>
              <a class="delete-note no-select right">Delete</a>
            </div>
          </div>
        </div>
        `
      notesBoard.prepend(noteHTML);
    });
  }

  //"double click to delete" toast
  $('#notes-board').one('click', '.delete-note', function(e) {
    Materialize.toast('Double-click to delete note', 3000, 'rounded')
  });

  //delete note
  $('#notes-board').on('dblclick', '.delete-note', function(e) {
    var noteId = $(e.target).closest('.note').attr('id');

    $.ajax({
      url: '/',
      method: 'DELETE',
      data: { id: noteId }
    }).done(function(err, result) {
      getAllNotes();
      console.log(result);
    }).fail(function(err) {
      console.log(err);
    });
  })


  //view/edit note
  $('#notes-board').on('click', '.view-note', function(e) {
    var noteEl = $(e.target).closest('.note')
    var noteId = noteEl.attr('id');
    var noteTitle = noteEl.find('.card-title').text();
    var noteContent = noteEl.find('.note-content').text();
    var notesBoard = $('#notes-board');

    notesBoard.empty()

    var note = {
      id: noteId,
      title: noteTitle,
      content: noteContent
    }

    let noteHTML = `
      <div id="${note.id}" class="note">
        <div class="card col s12 m10 offset-m1 amber accent-1">
          <div class="card-content blue-grey-text">
            <span class="card-title" contenteditable>${note.title}</span>
            <p class="note-content" contenteditable>${note.content}</p>
          </div>
          <div class="card-action">
              <a class="save-note right">Save</a>
              <a class="cancel-note right">Back</a>
          </div>
        </div>
      </div>
      `
      notesBoard.html(noteHTML);
  });

  //save note with view/edit mode
  $('#notes-board').on('click', '.save-note', function(e) {
    var noteEl = $(e.target).closest('.note')
    var noteId = noteEl.attr('id');
    var noteTitle = noteEl.find('.card-title').text();
    var noteContent = noteEl.find('.note-content').text();

    $.ajax({
      url: '/',
      method: 'PUT',
      data: {
        id: noteId,
        title: noteTitle,
        content: noteContent
      },
      dataType: 'JSON'
    }).done(function(err, data) {
      Materialize.toast('Note saved!', 1000, 'rounded');
      console.log(msg.success ? "Note Updated!" : "Somthing went wrong");
    }).fail(function(err) {
      console.log(err);
    });
  });


  //cancel view/edit mode
  $('#notes-board').on('click', '.cancel-note', function(e) {
    getAllNotes();
  });

  getAllNotes();

});

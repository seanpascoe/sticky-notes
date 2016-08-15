$(document).ready(function() {

  //toggle the form and button txt
  function slideForm() {
    var btnText = $('#create-note-form').is(':visible') ? "Add Note" : "Cancel";
    $('#create-note-form').slideToggle();
    $('#create-note').text(btnText);
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

  //add note logic
  $("button[type='submit']").on('click', function(e) {
    e.preventDefault();
    slideForm();
    var titleEl = $('#title');
    var contentEl = $('#content');

    $.ajax({
      url: '/create',
      method: 'POST',
      data: {
        title: titleEl.val(),
        content: contentEl.val()
      },
      dataType: 'JSON'
    }).done(function(note) {
      titleEl.val('');
      contentEl.val('');
      getAllNotes();
    }).fail(function(err) {
      console.log(err);
    })
  })


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
              <p>${note.content}</p>
            </div>
            <div class="card-action">
              <a href="#">View/Edit</a>
              <a id="delete-note" note-id="${note._id}" class="right">Delete</a>
            </div>
          </div>
        </div>
        `
      notesBoard.prepend(noteHTML);
    });
  }

  //delete note
  $('#notes-board').on('dblclick', '#delete-note', function(e) {
    var noteId = $(e.target).attr('note-id');

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

  getAllNotes();

});

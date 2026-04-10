document.addEventListener('DOMContentLoaded', function() {
  const addBtn = document.getElementById('add');
  const noteForm = document.getElementById('noteForm');
  const cancelNoteBtn = document.getElementById('cancelNote');
  
  // Show the form when plus button is clicked
  addBtn.addEventListener('click', function() {
    noteForm.classList.remove('hidden');
    this.classList.add('hidden');
  });
  
  // Hide the form when cancel is clicked
  cancelNoteBtn.addEventListener('click', function() {
    noteForm.classList.add('hidden');
    addBtn.classList.remove('hidden');
    noteForm.reset(); // Reset form fields
  });
  
  // Handle form submission
  noteForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    const formData = new FormData(this);
    const title = formData.get('title');
    const content = formData.get('content');
    
    addNoteToList(title, content);
    
    // Reset and hide the form
    this.reset();
    this.classList.add('hidden');
    addBtn.classList.remove('hidden');
  });
  
  function addNoteToList(title, content, shouldSave = true) {
    const noteLists = document.getElementById('noteLists');
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `
      <span class="delete-btn">×</span>
      <h3>${title}</h3>
      <p>${content}</p>
    `;
    // Delete button
    noteElement.querySelector('.delete-btn').addEventListener('click', function() {
      noteElement.remove();
      deleteNote(title, content);
    });

    noteLists.prepend(noteElement);
    if (shouldSave) {
      SaveData(title, content);
    }
  };
  
  // Save and load data after refresh
  function SaveData(title, content) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ title, content });
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  function LoadData() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
      addNoteToList(note.title, note.content, false);
    });
  };

  // Delete button
  function deleteNote(title, content) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.title !== title || note.content !== content);
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  LoadData();
  
});
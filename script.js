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
    showNoteFormBtn.classList.remove('hidden');
  });
  
  function addNoteToList(title, content) {
    const notesList = document.getElementById('notesList');
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `
      <h3>${title}</h3>
      <p>${content}</p>
    `;
    notesList.prepend(noteElement);
  }
});
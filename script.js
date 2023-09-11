document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById("noteInput");
    const addNoteButton = document.getElementById("addNote");
    const notesContainer = document.getElementById("notesContainer");

    // Load notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    // Function to save notes to local storage
    const saveNotes = () => {
        localStorage.setItem("notes", JSON.stringify(savedNotes));
    };

    // Function to create a new note element
    const createNoteElement = (noteText) => {
        const note = document.createElement("li");
        note.className = "note";
        note.innerHTML = `
            <span>${noteText}</span>
            <button class="delete-button">Delete</button>
        `;

        const deleteButton = note.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            notesContainer.removeChild(note);
            // Remove the note from savedNotes array
            const index = savedNotes.indexOf(noteText);
            if (index !== -1) {
                savedNotes.splice(index, 1);
                saveNotes();
                displayMessage(`Deleted note: ${noteText}`);
            }
        });

        notesContainer.appendChild(note);
        displayMessage(`Added note: ${noteText}`);
    };

    addNoteButton.addEventListener("click", () => {
        const noteText = noteInput.value.trim();

        if (noteText !== "") {
            createNoteElement(noteText);
            // Add the note to savedNotes array and save to local storage
            savedNotes.push(noteText);
            saveNotes();
            noteInput.value = "";
        }
    });
});

let currentColor = 0; // 0 for yellow, 1 for pink, 2 for another color
const colors = ["GhostWhite", "HoneyDew","WhiteSmoke","Thistle"]; // Define your colors here

function updateColor() {
    let body = document.querySelector("body");
    
    // Change to the next color in the array
    currentColor = (currentColor + 1) % colors.length;

    body.style.backgroundColor = colors[currentColor];
}

setInterval(updateColor, 1000);

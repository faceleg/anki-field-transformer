# Anki Field Transformer - Modify Anki card fields 

> _Note: This README has been improved by ChatGPT 😀_

Anki Field Transformer is a tool that lets you (with some fiddling) find fields with wrongly shaped data and correct it.

For example, I had a deck with hundreds of cards with data in the "Simplified" field populated with spaces I didn't want. I made this tool as a modification of https://github.com/mhujer/ankiai aimed at transforming fields only.

# How to fiddle

1. **Identify Target Fields**: Determine which fields in your Anki notes you want to update. Examples could include "Traditional," "Definition," or any custom fields specific to your Anki deck setup.

2. **Modify the Code**:
    - Open the `primeProcessNote` function in the `src/utils/process-note.ts` file.
    - Adjust the logic within this function to handle the fields you want to modify. Update regex patterns, field names, and any transformations as necessary.
    - Replace occurrences of `"Simplified"` with the name of the field you want to update.
    - If needed, adjust data structures and types defined in the code (`NotesInfoItemFields`, `UpdateNoteFieldsFields`, etc.) to accommodate new fields, in the `src/anki/api.ts` file.

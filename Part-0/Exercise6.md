```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: HTTP GET https://fullstack-exampleapp.herokuapp.com/new_note_spa
    activate server
    server-->>browser: 201 created
    deactivate server

    Note right of browser: The browser executes the callback to display the new note
```
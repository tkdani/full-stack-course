sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: satus code: 201
    deactivate server


    Note right of browser: The browser executes the callback function that renders the notes
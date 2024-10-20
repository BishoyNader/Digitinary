# API Testing Project

This project focuses on automated testing of various API endpoints including user registration, login, profile updates, password changes, note creation, updates, deletions, and health checks using Playwright and TypeScript.

## Table of Contents

- [Installation](#installation)
- [Running the Tests](#running-the-tests)
- [Test Cases](#test-cases)
- [Helpers](#helpers)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/api-testing-project.git

2. Navigate to the project directory

    ```bash
    cd api-testing-project
3. Install dependencies

    ```bash
    npm install
4. Running the Tests
    Execute the following command to run the tests:

    ```bash
    npx playwright test
5. Test Cases
    User APIs
    ```Registration

    ```apiRegisterUser.spec.ts: Tests user registration, including positive and negative scenarios.

    ```Login

    ```apiLogin.spec.ts: Tests user login with valid and invalid credentials.

    ```Profile Update

    ```apiUpdateUser.spec.ts: Tests profile updates including valid and invalid scenarios.

    ```Password Change

    ```apiChangePasswordUser.spec.ts: Tests changing user passwords with various scenarios.

    Note APIs
    ```Create Note

    ```apiCreateNote.spec.ts: Tests creating notes and verifying creation in the note list.

    ```Update Note

    ```apiUpdateNote.spec.ts: Tests updating notes and verifies updates.

    ```Delete Note

    ```apiDeleteNote.spec.ts: Tests deleting notes and verifies deletion.

    Health Check
    ```API Health Check

    ```apiHealthCheck.spec.ts: Tests the health of the API.

6. Helpers
    Helper functions are defined in apiHelper.ts and apiUserHelper.ts. These functions include:

    ```createNote

    ```updateNote

    ```deleteNote

    ```getAllNotes

    ```registerUser

    ```loginUser

    ```updateUserProfile

    ```changeUserPassword

    ```checkHealth

7. Contributing
    Contributions are welcome! Please follow these steps:

    ```Fork the repository.

    ```Create a new branch (git checkout -b feature-branch).

    ```Make your changes.

    ```Commit your changes (git commit -m 'Add new feature').

    ```Push to the branch (git push origin feature-branch).

    ```Open a pull request.
8. License
    This project is licensed under the MIT License.
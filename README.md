# Angular Project

## Project Overview

This Angular project is a simple blog-like application that allows authenticated users to:

- List, create, and edit posts.
- View and manage comments on each post (add/delete).
- Emit messages using WebSocket.
- Display real-time notifications using WebSocket events.

## Technologies Used

- Angular CLI
- TypeScript
- RxJS
- SCSS
- HTML

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/remantp6/angular-blog.git
   cd angular-blog
2. Install dependency:
   npm install

3. Run application:
   ng serve

### Project Structure
```
src/
│
├── app/
│ ├── auth/
│ ├── core/
│ │ ├── guard/
│ │ ├── interceptor/
│ │ └── services/
│ ├── models/
│ ├── pages/
│ └── shared/
├── environment/
├── index.html
├── main.ts
├── styles.scss
└── angular.json
  ```
   

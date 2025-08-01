# 🚀 NASA Explorer

**A React.js application that lets you explore NASA’s open APIs—view the Astronomy Picture of the Day, browse Mars rover photos, and more!**

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Environment Variables](#environment-variables)  
   - [Running Locally](#running-locally)   
4. [Contributing](#contributing)  
5. [License](#license)  
6. [Acknowledgements](#acknowledgements)

---

## Tech Stack

- **Framework:** React (v18+)  
- **Styling:** Tailwind CSS  
- **State Management:** React Context API
- **HTTP Client:** Axios (or Fetch API)  
- **Tooling:** ESLint, Prettier  

---
## Getting Started

### Prerequisites

- Node.js ≥ 16.x  
- npm ≥ 8.x (or yarn ≥ 1.22.x)  
- A (free) NASA API key from [api.nasa.gov](https://api.nasa.gov/)

### Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/nasa-explorer.git
   cd nasa-explorer
   ```
2. **Install Content**
  ```bash
  npm install
  # or
  yarn install
  ```

### Environement Variables
Create a .env.local file in the root directory and add your NASA API key:
```bash
REACT_APP_NASA_API_KEY=YOUR_NASA_API_KEY_HERE
```

### Running Locally
```bash
npm start
# or
yarn start
```

## Contributing
Contributions are welcome! Please:

Fork the repo

Create a feature branch (`git checkout -b feature/YourFeature`)

Commit your changes (`git commit -m 'Add YourFeature'`)

Push to branch (`git push origin feature/YourFeature`)

Open a Pull Request

Be sure to follow the existing code style and add tests where appropriate.

## License
Distributed under the MIT License. See the LICENSE file for more information.

## Acknowledgements
NASA Open API for providing amazing data

React

Tailwind CSS



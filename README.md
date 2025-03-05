# Hacker News Client

## Description

A modern Hacker News client built with Preact and Material-UI. Features include:

1. **Story Categories**: Browse different types of stories including Top, New, Best, Ask HN, Show HN, and Job stories
2. **Nested Comments**: View and navigate through nested comment threads
3. **Real-time Updates**: Fetches latest stories and comments from the official Hacker News API

## Live Demo

[Try the Hacker News Client](https://your-demo-link-here.com)

## Installation

To install and run the application, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/hacker-news-client.git
    ```

2. Navigate to the project folder:
    ```bash
    cd hacker-news-client
    ```

3. Install dependencies using Yarn:
    ```bash
    yarn install
    ```

4. Start the development server:
    ```bash
    yarn start
    ```

## Technologies Used

- **Frontend Framework**: Preact
- **UI Components**: Material-UI
- **Routing**: Wouter
- **State Management**: Jotai
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Type Checking**: TypeScript
- **Code Quality**: ESLint, Prettier

## Project Structure

- `/src`
  - `/atoms` - Jotai atoms for state management
  - `/components` - Reusable UI components
  - `/helpers` - API and utility functions
  - `/pages` - Main page components
  - `App.tsx` - Root component
  - `index.tsx` - Application entry point

## Development

### Available Scripts

- `yarn start` - Starts development server
- `yarn build` - Creates production build
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint checks
- `yarn pretty` - Run Prettier checks

### Code Style

The project uses ESLint and Prettier for code formatting. Configuration can be found in:
- `.eslintrc.json`
- `.prettierrc.json`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.





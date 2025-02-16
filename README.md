# Festival Lights

Welcome to **Festival Lights**, a Next.js application celebrating festive traditions with interactive visual components. This project showcases different themes, including Ramadan and Diwali, through dynamic animations and decorative elements.

## Features

- **Theme Switcher:** Toggle between Ramadan, Diwali, and a Halftone Wave effect.
- **Ramadan Lights:** Beautiful lanterns, crescent moon, and star animations for the Ramadan theme.
- **Diwali Lights:** Vibrant diyas and rangoli patterns for the Diwali theme.
- **Ramadan Cannon:** An interactive cannon animation complete with recoil, smoke, and flash effects.
- **Halftone Wave:** An animated canvas wave with adjustable frequency controls.
- **Responsive Design:** Built with Tailwind CSS for a consistent experience across devices.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd react-app-shell
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- **app/**: Contains the Next.js App Router files including `layout.tsx`, `page.tsx`, and others.
- **components/**: Contains React components for decorative elements:
  - `ramadan-cannon.tsx`: Implements the Ramadan Cannon animation.
  - `ramadan-lights.tsx` & `diwali-lights.tsx`: Implement the themed light displays.
  - `halftone-wave.tsx`: Implements the canvas-based animated wave with interactive controls.
- **components/ui/**: Contains UI components built with shadcn/ui patterns.
- **lib/**: Contains utility functions such as `cn` for class name merging.
- **app/globals.css**: Global styles and Tailwind CSS configurations.

## Usage

- **Theme Switching:** Use the dropdown on the top-right corner to toggle between Ramadan, Diwali, and Halftone Wave themes.
- **Interactive Controls:** In the Halftone Wave view, adjust the `Frequency X` and `Frequency Y` sliders to control the animation.
- **Ramadan Cannon:** Click the cannon to signal Iftar and watch the firing animation.

## Development

This project uses the following technologies:

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

Feel free to contribute by submitting issues or pull requests.

## License

This project is licensed under the MIT License. 
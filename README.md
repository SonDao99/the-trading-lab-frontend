# The Trading Lab

## Functionalities

- Authentication using Google account.
- User can edit first name and last name.
- Create (with the help of OpenAI, based on user input), render, update and delete strategies.
- Create (select stock, start time), render, delete backtests associated with each strategy.
- View stock prices and trades on a candlestick chart in backtest pages.
- View theoretical trades, gains and losses of a strategy on a line chart in backtest pages.

## Dependencies

- React 18
- Next.js 14
- Shadcn for components (certain components require radix-ui and that's why they're in the package.json file)
- D3.js for data visualization
- React Hook Form for form handling
- Tailwind CSS for styling

## Getting Started

First, install all the dependencies:

```bash
npm install
```

Then, run the development environment:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the page.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

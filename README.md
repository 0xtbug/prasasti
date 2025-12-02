# PRASASTI - Decentralized Academic Records Management

PRASASTI is a Decentralized Application (DApp) designed for secure and transparent management of academic records using blockchain technology. It allows institutions to issue verifiable academic credentials and enables students and third parties to verify them.

## Features

-   **Admin Portal:** Secure login for administrators to manage and issue academic records.
-   **Student Portal:** Access for students to view their academic history.
-   **Record Creation:** Issue immutable academic records on the blockchain.
-   **Record Verification:** Publicly verify the authenticity of academic records using transaction hashes or student IDs.
-   **Wallet Integration:** Seamless connection with various crypto wallets via Reown AppKit and WalletConnect.

## Tech Stack

-   **Frontend Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:**
    -   [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
    -   [shadcn/ui](https://ui.shadcn.com/) for re-usable components.
    -   [tweakcn](https://tweakcn.com/) for customizing shadcn/ui themes.
    -   [Radix UI](https://www.radix-ui.com/) for accessible UI primitives.
    -   [Framer Motion](https://www.framer.com/motion/) for animations.
    -   [Lucide React](https://lucide.dev/) for icons.
-   **Web3 Integration:**
    -   [Wagmi](https://wagmi.sh/) for Ethereum hooks.
    -   [Viem](https://viem.sh/) for low-level Ethereum interfaces.
    -   [Reown AppKit](https://reown.com/) for wallet connection and modal.
    -   [Ethers.js](https://docs.ethers.org/) for additional blockchain interactions.
-   **State Management:** [TanStack Query](https://tanstack.com/query/latest) (React Query).
-   **Routing:** [React Router](https://reactrouter.com/).

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [pnpm](https://pnpm.io/) (or npm/yarn)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/0xtbug/prasasti
    cd prasasti
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Environment Configuration:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    VITE_PROJECT_ID=your_reown_project_id
    VITE_APP_NAME=PRASASTI DApp
    VITE_APP_DESCRIPTION=Decentralized Academic Records Management
    VITE_APP_URL=http://localhost:5173
    VITE_APP_ICON=https://avatars.githubusercontent.com/u/37784886
    ```

    > **Note:** You can obtain a Project ID from [Reown Cloud](https://cloud.reown.com/).

4.  **Run the development server:**

    ```bash
    pnpm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Scripts

-   `pnpm run dev`: Starts the development server.
-   `pnpm run build`: Builds the application for production.
-   `pnpm run lint`: Runs ESLint to check for code quality issues.
-   `pnpm run preview`: Previews the production build locally.

## Using on Sepolia Testnet

To use this application on the Sepolia testnet:

1.  **Deploy the Contract:**
    Deploy the `EducationRecord.sol` contract (located in `contracts/EducationRecord.sol`) to the Sepolia testnet using Remix IDE or Hardhat.

2.  **Update Contract Address:**
    After deployment, copy the new contract address and update the `CONTRACT_ADDRESS` variable in `src/lib/contract.ts`:

    ```typescript
    export const CONTRACT_ADDRESS = "YOUR_SEPOLIA_CONTRACT_ADDRESS";
    ```

3.  **Connect Wallet:**
    Ensure your wallet (e.g., MetaMask) is connected to the Sepolia network and has some Sepolia ETH for gas fees.

## License

[MIT](LICENSE)

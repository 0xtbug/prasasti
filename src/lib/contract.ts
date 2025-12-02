import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const CONTRACT_ADDRESS = "0xD3498Fb8dd22a0584fe78D6D6A1fE7a61264b03c";

export const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "recordCount",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_newOwner", "type": "address" }
    ],
    "name": "changeOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_studentId", "type": "string" },
      { "internalType": "string", "name": "_course", "type": "string" },
      { "internalType": "string", "name": "_grade", "type": "string" }
    ],
    "name": "createRecord",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_recordId", "type": "uint256" }
    ],
    "name": "getRecord",
    "outputs": [
      { "internalType": "string", "name": "studentId", "type": "string" },
      { "internalType": "string", "name": "course", "type": "string" },
      { "internalType": "string", "name": "grade", "type": "string" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "internalType": "address", "name": "issuer", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_recordId", "type": "uint256" },
      { "internalType": "string", "name": "_studentId", "type": "string" },
      { "internalType": "string", "name": "_course", "type": "string" }
    ],
    "name": "verifyRecord",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const getSigner = async () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("Please install MetaMask to use this application");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
};

let contractInstance: any = null;

const getContractInstance = () => {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
    return null;
  }

  if (!contractInstance) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    contractInstance = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  }

  return contractInstance;
};

export const contract = {
  owner: async () => {
    const instance = getContractInstance();
    if (!instance) throw new Error("MetaMask not detected");
    return instance.owner();
  },
  recordCount: async () => {
    const instance = getContractInstance();
    if (!instance) throw new Error("MetaMask not detected");
    return instance.recordCount();
  },
  createRecord: async (studentId: string, course: string, grade: string) => {
    const signer = await getSigner();
    const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    return contractWithSigner.createRecord(studentId, course, grade);
  },
  getRecord: async (recordId: number) => {
    const instance = getContractInstance();
    if (!instance) throw new Error("MetaMask not detected");
    return instance.getRecord(recordId);
  },
  verifyRecord: async (recordId: string, studentId: string, course: string) => {
    const instance = getContractInstance();
    if (!instance) throw new Error("MetaMask not detected");
    return instance.verifyRecord(recordId, studentId, course);
  },
};

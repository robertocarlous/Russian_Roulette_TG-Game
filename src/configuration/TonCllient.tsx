import { TonClient, Address, beginCell, fromNano, Contract } from '@ton/ton';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { useState, useEffect } from 'react';
import BN from 'bn.js';

// Configuration for the TON faucet client
export const TON_CONFIG = {
    CONTRACT_ADDRESS: "0:d7e864c4e6350c95955ad62eaacfc53f19eaa1ee2c197a7f9b36284c363889a8",
    DEFAULT_ACCOUNT: {
        privateKey: "0xc18a9a158cc0ccfe95798f526cfb9b4ee07ade0f0216d9434d02fb8dc3f56bb0",
        publicKey: "0x1ec0267044ca7a9a40616f660dcb3de4f9bbf3010145ff9a4898eb2239f5929f",
        accountAddress: "0:d7e864c4e6350c95955ad62eaacfc53f19eaa1ee2c197a7f9b36284c363889a8"
    }
};

// Helper function to ensure proper address format
function formatTonAddress(address: string): string {
    if (!address.startsWith('0:')) {
        return `0:${address}`;
    }
    return address;
}

// Add Contract interface
interface FaucetContract extends Contract {
    address: Address;
}

// Create Contract implementation
class FaucetContractImpl implements FaucetContract {
    public address: Address;

    constructor(address: Address) {
        this.address = address;
    }
}

// Rest of the interfaces remain the same
interface RoulettePlayer {
    address: string;
    claimedTokens: BN[];
}

interface FaucetTokenContract {
    claim_tokens(): Promise<boolean>;
    add_player(player: RoulettePlayer): Promise<void>;
    get_claimed_tokens(address: string): Promise<BN[]>;
    play_roulette(betAmount: BN): Promise<void>;
}

export class TonFaucetClient implements FaucetTokenContract {
    private client: TonClient;
    private contract: FaucetContract;
    private userAddress: string | undefined;

    private constructor(client: TonClient, contractAddress: string) {
        this.client = client;
        this.contract = new FaucetContractImpl(Address.parse(formatTonAddress(contractAddress)));
    }

    public static async create(): Promise<TonFaucetClient> {
        const endpoint = await getHttpEndpoint({
            network: 'testnet',
        });

        // Initialize TonClient without an apiKey
        const client = new TonClient({
            endpoint,
        });

        return new TonFaucetClient(client, TON_CONFIG.CONTRACT_ADDRESS);
    }

    public async connect(userAddress: string) {
        this.userAddress = formatTonAddress(userAddress);
    }

    public async claim_tokens(): Promise<boolean> {
        if (!this.userAddress) {
            throw new Error('User not connected');
        }

        try {
            const message = beginCell()
                .storeUint(0x123456, 32) // op code for claim_tokens
                .storeAddress(Address.parse(this.userAddress))
                .endCell();

            await this.client.sendExternalMessage(
                this.contract,
                message
            );

            return true;
        } catch (error) {
            console.error('Failed to claim tokens:', error);
            return false;
        }
    }

    public async add_player(player: RoulettePlayer): Promise<void> {
        if (!this.userAddress) {
            throw new Error('User not connected');
        }

        const tokensCell = beginCell();
        player.claimedTokens.forEach(token => {
            tokensCell.storeUint(token.toNumber(), 64);
        });

        const message = beginCell()
            .storeUint(0x234567, 32) // op code for add_player
            .storeAddress(Address.parse(formatTonAddress(player.address)))
            .storeRef(tokensCell.endCell())
            .endCell();

        await this.client.sendExternalMessage(
            this.contract,
            message
        );
    }

    public async play_roulette(betAmount: BN): Promise<void> {
        if (!this.userAddress) {
            throw new Error('User not connected');
        }

        const message = beginCell()
            .storeUint(0x456789, 32) // op code for play_roulette
            .storeUint(betAmount.toNumber(), 64)
            .endCell();

        await this.client.sendExternalMessage(
            this.contract,
            message
        );
    }

    public async get_claimed_tokens(address: string): Promise<BN[]> {
        const formattedAddress = formatTonAddress(address);
        const message = beginCell()
            .storeUint(0x345678, 32) // op code for get_claimed_tokens
            .storeAddress(Address.parse(formattedAddress))
            .endCell();

        const stack = await this.client.callGetMethod(
            this.contract.address,
            'get_claimed_tokens',
            [{
                type: 'slice',
                cell: message
            }]
        );

        const result: BN[] = [];
        const tupleReader = stack.stack;
        while (tupleReader.remaining > 0) {
            const value = tupleReader.readBigNumber();
            result.push(new BN(value.toString()));
        }

        return result;
    }

    public async getBalance(address: string): Promise<string> {
        const balance = await this.client.getBalance(Address.parse(formatTonAddress(address)));
        return fromNano(balance);
    }

    public static formatAddress(address: string): string {
        return address.slice(0, 6) + '...' + address.slice(-4);
    }
}

export function useFaucetToken() {
    const userAddress = useTonAddress();
    const [client, setClient] = useState<TonFaucetClient | null>(null);

    useEffect(() => {
        async function initClient() {
            if (userAddress) {
                const newClient = await TonFaucetClient.create();
                await newClient.connect(userAddress);
                setClient(newClient);
            }
        }

        initClient();
    }, [userAddress]);

    return {
        client,
        userAddress,
        isConnected: !!userAddress,
        TonConnectButton,
    };
}
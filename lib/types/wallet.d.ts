import { type SolanaSignAndSendTransactionFeature, type SolanaSignMessageFeature, type SolanaSignTransactionFeature } from '@solana/wallet-standard-features';
import type { Wallet } from '@wallet-standard/base';
import { type StandardConnectFeature, type StandardDisconnectFeature, type StandardEventsFeature } from '@wallet-standard/features';
import { SolmateWalletAccount } from './account.js';
import type { Solmate } from './window.js';
export declare const SolmateNamespace = "solmate:";
export type SolmateFeature = {
    [SolmateNamespace]: {
        solmate: Solmate;
    };
};
export declare class SolmateWallet implements Wallet {
    #private;
    get version(): "1.0.0";
    get name(): "Solmate";
    get icon(): `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
    get chains(): ("solana:mainnet" | "solana:devnet" | "solana:testnet" | "solana:localnet")[];
    get features(): StandardConnectFeature & StandardDisconnectFeature & StandardEventsFeature & SolanaSignAndSendTransactionFeature & SolanaSignTransactionFeature & SolanaSignMessageFeature & SolmateFeature;
    get accounts(): SolmateWalletAccount[];
    constructor(solmate: Solmate);
}
//# sourceMappingURL=wallet.d.ts.map
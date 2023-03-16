var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SolmateWallet_instances, _SolmateWallet_listeners, _SolmateWallet_version, _SolmateWallet_name, _SolmateWallet_icon, _SolmateWallet_account, _SolmateWallet_solmate, _SolmateWallet_on, _SolmateWallet_emit, _SolmateWallet_off, _SolmateWallet_connected, _SolmateWallet_disconnected, _SolmateWallet_reconnected, _SolmateWallet_connect, _SolmateWallet_disconnect, _SolmateWallet_signAndSendTransaction, _SolmateWallet_signTransaction, _SolmateWallet_signMessage;
import { SolanaSignAndSendTransaction, SolanaSignMessage, SolanaSignTransaction, } from '@solana/wallet-standard-features';
import { Transaction, VersionedTransaction } from '@solana/web3.js';
import { StandardConnect, StandardDisconnect, StandardEvents, } from '@wallet-standard/features';
import bs58 from 'bs58';
import { SolmateWalletAccount } from './account.js';
import { icon } from './icon.js';
import { isSolanaChain, SOLANA_CHAINS } from './solana.js';
import { bytesEqual } from './util.js';
export const SolmateNamespace = 'solmate:';
export class SolmateWallet {
    get version() {
        return __classPrivateFieldGet(this, _SolmateWallet_version, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _SolmateWallet_name, "f");
    }
    get icon() {
        return __classPrivateFieldGet(this, _SolmateWallet_icon, "f");
    }
    get chains() {
        return SOLANA_CHAINS.slice();
    }
    get features() {
        return {
            [StandardConnect]: {
                version: '1.0.0',
                connect: __classPrivateFieldGet(this, _SolmateWallet_connect, "f"),
            },
            [StandardDisconnect]: {
                version: '1.0.0',
                disconnect: __classPrivateFieldGet(this, _SolmateWallet_disconnect, "f"),
            },
            [StandardEvents]: {
                version: '1.0.0',
                on: __classPrivateFieldGet(this, _SolmateWallet_on, "f"),
            },
            [SolanaSignAndSendTransaction]: {
                version: '1.0.0',
                supportedTransactionVersions: ['legacy', 0],
                signAndSendTransaction: __classPrivateFieldGet(this, _SolmateWallet_signAndSendTransaction, "f"),
            },
            [SolanaSignTransaction]: {
                version: '1.0.0',
                supportedTransactionVersions: ['legacy', 0],
                signTransaction: __classPrivateFieldGet(this, _SolmateWallet_signTransaction, "f"),
            },
            [SolanaSignMessage]: {
                version: '1.0.0',
                signMessage: __classPrivateFieldGet(this, _SolmateWallet_signMessage, "f"),
            },
            [SolmateNamespace]: {
                solmate: __classPrivateFieldGet(this, _SolmateWallet_solmate, "f"),
            },
        };
    }
    get accounts() {
        return __classPrivateFieldGet(this, _SolmateWallet_account, "f") ? [__classPrivateFieldGet(this, _SolmateWallet_account, "f")] : [];
    }
    constructor(solmate) {
        _SolmateWallet_instances.add(this);
        _SolmateWallet_listeners.set(this, {});
        _SolmateWallet_version.set(this, '1.0.0');
        _SolmateWallet_name.set(this, 'Solmate');
        _SolmateWallet_icon.set(this, icon);
        _SolmateWallet_account.set(this, null);
        _SolmateWallet_solmate.set(this, void 0);
        _SolmateWallet_on.set(this, (event, listener) => {
            __classPrivateFieldGet(this, _SolmateWallet_listeners, "f")[event]?.push(listener) || (__classPrivateFieldGet(this, _SolmateWallet_listeners, "f")[event] = [listener]);
            return () => __classPrivateFieldGet(this, _SolmateWallet_instances, "m", _SolmateWallet_off).call(this, event, listener);
        });
        _SolmateWallet_connected.set(this, () => {
            const address = __classPrivateFieldGet(this, _SolmateWallet_solmate, "f").publicKey?.toBase58();
            if (address) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const publicKey = __classPrivateFieldGet(this, _SolmateWallet_solmate, "f").publicKey.toBytes();
                const account = __classPrivateFieldGet(this, _SolmateWallet_account, "f");
                if (!account || account.address !== address || !bytesEqual(account.publicKey, publicKey)) {
                    __classPrivateFieldSet(this, _SolmateWallet_account, new SolmateWalletAccount({ address, publicKey }), "f");
                    __classPrivateFieldGet(this, _SolmateWallet_instances, "m", _SolmateWallet_emit).call(this, 'change', { accounts: this.accounts });
                }
            }
        });
        _SolmateWallet_disconnected.set(this, () => {
            if (__classPrivateFieldGet(this, _SolmateWallet_account, "f")) {
                __classPrivateFieldSet(this, _SolmateWallet_account, null, "f");
                __classPrivateFieldGet(this, _SolmateWallet_instances, "m", _SolmateWallet_emit).call(this, 'change', { accounts: this.accounts });
            }
        });
        _SolmateWallet_reconnected.set(this, () => {
            if (__classPrivateFieldGet(this, _SolmateWallet_solmate, "f").publicKey) {
                __classPrivateFieldGet(this, _SolmateWallet_connected, "f").call(this);
            }
            else {
                __classPrivateFieldGet(this, _SolmateWallet_disconnected, "f").call(this);
            }
        });
        _SolmateWallet_connect.set(this, async ({ silent } = {}) => {
            if (!__classPrivateFieldGet(this, _SolmateWallet_account, "f")) {
                await __classPrivateFieldGet(this, _SolmateWallet_solmate, "f").connect(silent ? { onlyIfTrusted: true } : undefined);
            }
            __classPrivateFieldGet(this, _SolmateWallet_connected, "f").call(this);
            return { accounts: this.accounts };
        });
        _SolmateWallet_disconnect.set(this, async () => {
            await __classPrivateFieldGet(this, _SolmateWallet_solmate, "f").disconnect();
        });
        _SolmateWallet_signAndSendTransaction.set(this, async (...inputs) => {
            if (!__classPrivateFieldGet(this, _SolmateWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { transaction, account, chain, options } = inputs[0];
                const { minContextSlot, preflightCommitment, skipPreflight, maxRetries } = options || {};
                if (account !== __classPrivateFieldGet(this, _SolmateWallet_account, "f"))
                    throw new Error('invalid account');
                if (!isSolanaChain(chain))
                    throw new Error('invalid chain');
                const { signature } = await __classPrivateFieldGet(this, _SolmateWallet_solmate, "f").signAndSendTransaction(VersionedTransaction.deserialize(transaction), {
                    preflightCommitment,
                    minContextSlot,
                    maxRetries,
                    skipPreflight,
                });
                outputs.push({ signature: bs58.decode(signature) });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(await __classPrivateFieldGet(this, _SolmateWallet_signAndSendTransaction, "f").call(this, input)));
                }
            }
            return outputs;
        });
        _SolmateWallet_signTransaction.set(this, async (...inputs) => {
            if (!__classPrivateFieldGet(this, _SolmateWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { transaction, account, chain } = inputs[0];
                if (account !== __classPrivateFieldGet(this, _SolmateWallet_account, "f"))
                    throw new Error('invalid account');
                if (chain && !isSolanaChain(chain))
                    throw new Error('invalid chain');
                const signedTransaction = await __classPrivateFieldGet(this, _SolmateWallet_solmate, "f").signTransaction(VersionedTransaction.deserialize(transaction));
                outputs.push({ signedTransaction: signedTransaction.serialize() });
            }
            else if (inputs.length > 1) {
                let chain = undefined;
                for (const input of inputs) {
                    if (input.account !== __classPrivateFieldGet(this, _SolmateWallet_account, "f"))
                        throw new Error('invalid account');
                    if (input.chain) {
                        if (!isSolanaChain(input.chain))
                            throw new Error('invalid chain');
                        if (chain) {
                            if (input.chain !== chain)
                                throw new Error('conflicting chain');
                        }
                        else {
                            chain = input.chain;
                        }
                    }
                }
                const transactions = inputs.map(({ transaction }) => Transaction.from(transaction));
                const signedTransactions = await __classPrivateFieldGet(this, _SolmateWallet_solmate, "f").signAllTransactions(transactions);
                outputs.push(...signedTransactions.map((signedTransaction) => ({ signedTransaction: signedTransaction.serialize() })));
            }
            return outputs;
        });
        _SolmateWallet_signMessage.set(this, async (...inputs) => {
            if (!__classPrivateFieldGet(this, _SolmateWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { message, account } = inputs[0];
                if (account !== __classPrivateFieldGet(this, _SolmateWallet_account, "f"))
                    throw new Error('invalid account');
                const { signature } = await __classPrivateFieldGet(this, _SolmateWallet_solmate, "f").signMessage(message);
                outputs.push({ signedMessage: message, signature });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(await __classPrivateFieldGet(this, _SolmateWallet_signMessage, "f").call(this, input)));
                }
            }
            return outputs;
        });
        if (new.target === SolmateWallet) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _SolmateWallet_solmate, solmate, "f");
        solmate.on('connect', __classPrivateFieldGet(this, _SolmateWallet_connected, "f"), this);
        solmate.on('disconnect', __classPrivateFieldGet(this, _SolmateWallet_disconnected, "f"), this);
        solmate.on('accountChanged', __classPrivateFieldGet(this, _SolmateWallet_reconnected, "f"), this);
        __classPrivateFieldGet(this, _SolmateWallet_connected, "f").call(this);
    }
}
_SolmateWallet_listeners = new WeakMap(), _SolmateWallet_version = new WeakMap(), _SolmateWallet_name = new WeakMap(), _SolmateWallet_icon = new WeakMap(), _SolmateWallet_account = new WeakMap(), _SolmateWallet_solmate = new WeakMap(), _SolmateWallet_on = new WeakMap(), _SolmateWallet_connected = new WeakMap(), _SolmateWallet_disconnected = new WeakMap(), _SolmateWallet_reconnected = new WeakMap(), _SolmateWallet_connect = new WeakMap(), _SolmateWallet_disconnect = new WeakMap(), _SolmateWallet_signAndSendTransaction = new WeakMap(), _SolmateWallet_signTransaction = new WeakMap(), _SolmateWallet_signMessage = new WeakMap(), _SolmateWallet_instances = new WeakSet(), _SolmateWallet_emit = function _SolmateWallet_emit(event, ...args) {
    // eslint-disable-next-line prefer-spread
    __classPrivateFieldGet(this, _SolmateWallet_listeners, "f")[event]?.forEach((listener) => listener.apply(null, args));
}, _SolmateWallet_off = function _SolmateWallet_off(event, listener) {
    __classPrivateFieldGet(this, _SolmateWallet_listeners, "f")[event] = __classPrivateFieldGet(this, _SolmateWallet_listeners, "f")[event]?.filter((existingListener) => listener !== existingListener);
};
//# sourceMappingURL=wallet.js.map
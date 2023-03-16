// This is copied with modification from @wallet-standard/wallet
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
var _SolmateWalletAccount_address, _SolmateWalletAccount_publicKey, _SolmateWalletAccount_chains, _SolmateWalletAccount_features, _SolmateWalletAccount_label, _SolmateWalletAccount_icon;
import { SolanaSignAndSendTransaction, SolanaSignMessage, SolanaSignTransaction, } from '@solana/wallet-standard-features';
import { SOLANA_CHAINS } from './solana.js';
const chains = SOLANA_CHAINS;
const features = [SolanaSignAndSendTransaction, SolanaSignTransaction, SolanaSignMessage];
export class SolmateWalletAccount {
    get address() {
        return __classPrivateFieldGet(this, _SolmateWalletAccount_address, "f");
    }
    get publicKey() {
        return __classPrivateFieldGet(this, _SolmateWalletAccount_publicKey, "f").slice();
    }
    get chains() {
        return __classPrivateFieldGet(this, _SolmateWalletAccount_chains, "f").slice();
    }
    get features() {
        return __classPrivateFieldGet(this, _SolmateWalletAccount_features, "f").slice();
    }
    get label() {
        return __classPrivateFieldGet(this, _SolmateWalletAccount_label, "f");
    }
    get icon() {
        return __classPrivateFieldGet(this, _SolmateWalletAccount_icon, "f");
    }
    constructor({ address, publicKey, label, icon }) {
        _SolmateWalletAccount_address.set(this, void 0);
        _SolmateWalletAccount_publicKey.set(this, void 0);
        _SolmateWalletAccount_chains.set(this, void 0);
        _SolmateWalletAccount_features.set(this, void 0);
        _SolmateWalletAccount_label.set(this, void 0);
        _SolmateWalletAccount_icon.set(this, void 0);
        if (new.target === SolmateWalletAccount) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _SolmateWalletAccount_address, address, "f");
        __classPrivateFieldSet(this, _SolmateWalletAccount_publicKey, publicKey, "f");
        __classPrivateFieldSet(this, _SolmateWalletAccount_chains, chains, "f");
        __classPrivateFieldSet(this, _SolmateWalletAccount_features, features, "f");
        __classPrivateFieldSet(this, _SolmateWalletAccount_label, label, "f");
        __classPrivateFieldSet(this, _SolmateWalletAccount_icon, icon, "f");
    }
}
_SolmateWalletAccount_address = new WeakMap(), _SolmateWalletAccount_publicKey = new WeakMap(), _SolmateWalletAccount_chains = new WeakMap(), _SolmateWalletAccount_features = new WeakMap(), _SolmateWalletAccount_label = new WeakMap(), _SolmateWalletAccount_icon = new WeakMap();
//# sourceMappingURL=account.js.map
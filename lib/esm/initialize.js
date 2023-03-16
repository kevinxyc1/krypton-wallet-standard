import { registerWallet } from './register.js';
import { SolmateWallet } from './wallet.js';
export function initialize(solmate) {
    registerWallet(new SolmateWallet(solmate));
}
//# sourceMappingURL=initialize.js.map
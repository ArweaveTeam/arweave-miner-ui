import { ASSET } from "./Asset";

export default function WalletButton() {
    return (
        <button className="flex items-center gap-2 border border-gray-950 rounded-md px-4 py-2 font-normal outline-none text-gray-950 hover:bg-gray-100" type="button">
            <img src={ASSET.WalletSvg} />
            <span>Connect Wallet</span>
        </button>
    )
}
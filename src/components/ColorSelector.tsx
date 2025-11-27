import type { ColorTarget } from "../types/theme";

type ColorSelectorProps = {
    colorTarget: ColorTarget;
    primaryColor: string;
    secondaryColor: string;
    onPick: (colorKey: string) => void;
    onClose: () => void;
};

const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "turquoise",
    "blue",
    "purple",
    "pink",
];

export default function ColorSelector({
    colorTarget,
    primaryColor,
    secondaryColor,
    onPick,
    onClose,
}: ColorSelectorProps) {
    const currentColor = colorTarget === "primary" ? primaryColor : secondaryColor;

    return (
        <dialog
            className={`color-selector ${colorTarget ? "" : "is-closed"}`}
            aria-hidden={!colorTarget}
        >
            <button className="close-dialog-btn" onClick={onClose}>
                <i className="fa-solid fa-times"></i>
            </button>
            <h3>Seleção de Cor</h3>
            <p>
                <span style={{ fontWeight: "bold" }}>Dica</span>: utilize cores diferentes para um melhor
                contraste.
            </p>
            <div className="dialog-select">
                {colors.map((color) => (
                    <button
                        key={color}
                        className={`${color}${currentColor === color ? " active" : ""}`}
                        style={{ backgroundColor: `var(--${color})` }}
                        onClick={() => onPick(color)}
                    ></button>
                ))}
            </div>
        </dialog>
    );
}

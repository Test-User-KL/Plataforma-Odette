import type { ReactNode } from "react";

type LiquidGlassProps = {
    children: ReactNode;
    className?: string;   // classes extras para o wrapper (ex: "dock-item")
};

export function LiquidGlass({ children, className = "" }: LiquidGlassProps) {
    return (
        <div className={`liquidGlass-wrapper ${className}`}>
            {/* Camada de distorção / blur */}
            <div className="liquidGlass-effect">
                {/* Definição do filtro SVG (pode estar aqui ou em um componente global) */}
                <svg width="0" height="0">
                <filter id="glass-distortion">
                    <feTurbulence
                    type="turbulence"
                    baseFrequency="0.015"
                    numOctaves="3"
                    result="turbulence"
                    />
                    <feDisplacementMap
                    in="SourceGraphic"
                    in2="turbulence"
                    scale="8"
                    xChannelSelector="R"
                    yChannelSelector="G"
                    />
                </filter>
                </svg>
            </div>

            <div className="liquidGlass-tint" />
            <div className="liquidGlass-shine" />
            <div className="liquidGlass-text">
                {children}
            </div>
        </div>
    );
}

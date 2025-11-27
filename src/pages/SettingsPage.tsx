import type { ColorTarget, ThemeMode } from "../types/theme";
import type { TabView } from "../types/tabs";

export type SettingsProps = {
    theme: ThemeMode;
    primaryColor: string;
    secondaryColor: string;
    changeTab: (view: TabView) => void;
    openColorSelector: (target: ColorTarget) => void;
    handleThemeChange: (selectedTheme: ThemeMode) => void;
};

export default function SettingsPage({
    theme,
    primaryColor,
    secondaryColor,
    changeTab,
    openColorSelector,
    handleThemeChange,
}: SettingsProps) {
    return (
        <div id="settings" className="settings-page page">
            <header className="tab-content-title">
                <a
                    className="back-btn"
                    href="#home"
                    onClick={(e) => {
                        e.preventDefault();
                        changeTab("home");
                    }}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </a>
                <h1>Configurações</h1>
            </header>

            <section id="customization-settings" className="settings-group">
                <div className="settings">
                    <div className="setting">
                        <div className="divider">
                            <i className="bi bi-stars"></i>
                            <h6>Tema</h6>
                        </div>
                        <div className="setting-select">
                            <div>
                                <div id="light-mode-example" className="setting-example">
                                    <div className="example-screen">
                                        <div className="example-tab-header">
                                            <div className="example-tab-header-btn"></div>
                                            <div className="example-tab-header-tab"></div>
                                        </div>
                                        <div className="example-tab-header-space"></div>
                                        <div className="example-main">
                                            <div className="example-main-emphasis">
                                                <div className="example-main-emphasis-title"></div>
                                                <div className="example-main-emphasis-p"></div>
                                            </div>
                                            <div>
                                                <div className="example-main-title"></div>
                                                <div className="example-main-p"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h6>
                                    <i className="bi bi-sun-fill"></i>
                                    Tema Claro
                                </h6>
                                <p>Para o uso diurno</p>
                                <button
                                    className={`select-button ${theme === "light" ? "active" : ""}`}
                                    onClick={() => handleThemeChange("light")}
                                >
                                    <i className="fa-solid fa-check"></i>
                                </button>
                            </div>
                            <div>
                                <div id="dark-mode-example" className="setting-example">
                                    <div className="example-screen">
                                        <div className="example-tab-header">
                                            <div className="example-tab-header-btn"></div>
                                            <div className="example-tab-header-tab"></div>
                                        </div>
                                        <div className="example-tab-header-space"></div>
                                        <div className="example-main">
                                            <div className="example-main-emphasis">
                                                <div className="example-main-emphasis-title"></div>
                                                <div className="example-main-emphasis-p"></div>
                                            </div>
                                            <div>
                                                <div className="example-main-title"></div>
                                                <div className="example-main-p"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h6>
                                    <i className="bi bi-moon-stars-fill"></i>
                                    Tema Escuro
                                </h6>
                                <p>Para o uso noturno</p>
                                <button
                                    className={`select-button ${theme === "dark" ? "active" : ""}`}
                                    onClick={() => handleThemeChange("dark")}
                                >
                                    <i className="fa-solid fa-check"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="setting">
                        <div className="divider">
                            <i className="bi bi-palette"></i>
                            <h6>Cores</h6>
                        </div>
                        <div className="setting-select">
                            <div>
                                <div
                                    className="setting-example"
                                    style={{ backgroundColor: "var(--primary-emphasis)" }}
                                ></div>
                                <h6>Cor Principal</h6>
                                <p>
                                    Selecione a
                                    <span style={{ color: "var(--primary-emphasis)", fontWeight: "bold" }}>
                                        {" "}cor principal
                                    </span>{" "}
                                    no botão ao lado
                                </p>
                                <button
                                    className="select-button"
                                    onClick={() => openColorSelector("primary")}
                                    style={{ background: `var(--${primaryColor})` }}
                                ></button>
                            </div>
                            <div>
                                <div
                                    className="setting-example"
                                    style={{ backgroundColor: "var(--secondary-emphasis)" }}
                                ></div>
                                <h6>Cor Secundária</h6>
                                <p>
                                    Selecione a
                                    <span style={{ color: "var(--secondary-emphasis)", fontWeight: "bold" }}>
                                        {" "}cor secundária
                                    </span>{" "}
                                    no botão ao lado
                                </p>
                                <button
                                    className="select-button"
                                    onClick={() => openColorSelector("secondary")}
                                    style={{ background: `var(--${secondaryColor})` }}
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

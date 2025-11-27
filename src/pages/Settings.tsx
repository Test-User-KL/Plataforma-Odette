import React from "react";

export default function SettingsPage() {
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
                            <i className="fa-solid fa-paintbrush"></i>
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
                                    <i className="fa-solid fa-sun"></i>
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
                                    <i className="fa-solid fa-moon"></i>
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
                            <i className="fa-solid fa-palette"></i>
                            <h6>Cores</h6>
                        </div>
                        <div className="setting-select">
                            <div>
                                <div className="setting-example" style={{ backgroundColor: 'var(--primary-emphasis)' }}></div>
                                <h6>Cor Principal</h6>
                                <p>Selecione a <span style={{ color: 'var(--primary-emphasis)', fontWeight: 'bold' }}>cor principal</span> no botão ao lado</p>
                                <button
                                    className="select-button"
                                    onClick={() => openColorSelector("primary")}
                                    style={{ background: `var(--${primaryColor})` }}
                                >
                                </button>
                            </div>
                            <div>
                                <div className="setting-example" style={{ backgroundColor: 'var(--secondary-emphasis)' }}></div>
                                <h6>Cor Secundária</h6>
                                <p>Selecione a <span style={{ color: 'var(--secondary-emphasis)', fontWeight: 'bold' }}>cor secundária</span> no botão ao lado</p>
                                <button
                                    className="select-button"
                                    onClick={() => openColorSelector("secondary")}
                                    style={{ background: `var(--${secondaryColor})` }}
                                >
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <dialog 
                className={`color-selector ${colorTarget ? "": "is-closed"}`}
                aria-hidden={!colorTarget}
            >
                <button className="close-dialog-btn" onClick={closeColorSelector}><i className="fa-solid fa-times"></i></button>
                <h3>Seleção de Cor</h3>
                <p><span style={{fontWeight: "bold"}}>Dica</span>: utilize cores diferentes para um melhor contraste.</p>
                <div className="dialog-select">
                    <button className="red" style={{ backgroundColor: 'var(--red)' }} onClick={() => handleColorPick("red")}></button>
                    <button className="orange" style={{ backgroundColor: 'var(--orange)' }} onClick={() => handleColorPick("orange")}></button>
                    <button className="yellow" style={{ backgroundColor: 'var(--yellow)' }} onClick={() => handleColorPick("yellow")}></button>
                    <button className="green" style={{ backgroundColor: 'var(--green)' }} onClick={() => handleColorPick("green")}></button>
                    <button className="turquoise" style={{ backgroundColor: 'var(--turquoise)' }} onClick={() => handleColorPick("turquoise")}></button>
                    <button className="blue" style={{ backgroundColor: 'var(--blue)' }} onClick={() => handleColorPick("blue")}></button>
                    <button className="purple" style={{ backgroundColor: 'var(--purple)' }} onClick={() => handleColorPick("purple")}></button>
                    <button className="pink" style={{ backgroundColor: 'var(--pink)' }} onClick={() => handleColorPick("pink")}></button>
                </div>	
            </dialog>
        </div>
    )
}

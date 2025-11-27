export default function SubjectsPage() {
    return (
        <div id="account" className="account-page page">
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
                <h1>Conta</h1>
            </header>
        </div>
    )
}
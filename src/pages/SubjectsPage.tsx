import type { TabView } from "../types/tabs";

type SubjectsPageProps = {
    changeTab: (view: TabView) => void;
};

export default function SubjectsPage({ changeTab }: SubjectsPageProps) {
    return (
        <div id="subjects" className="settings-page page">
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
                <h1>Disciplinas</h1>
            </header>
        </div>
    );
}

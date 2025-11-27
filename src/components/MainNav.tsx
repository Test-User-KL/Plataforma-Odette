import type { TabView } from "../types/tabs";

interface MainNavProps {
        changeTab: (targetView: TabView) => void;
        activeView: TabView;
}

export default function MainNav({ changeTab, activeView }: MainNavProps) {
	const getClassName = (view: TabView) =>
		view === activeView ? "active" : undefined;

	return (
		<nav className="main-nav">
			<a
				href="#home"
				onClick={(e) => {
					e.preventDefault();
					changeTab("home");
				}}
				className={getClassName("home")}
			>
				<i className="fa-solid fa-home"></i>
				<span>Início</span>
			</a>

			<a
				href="#subjects"
				onClick={(e) => {
					e.preventDefault();
					changeTab("subjects");
				}}
				className={getClassName("subjects")}
			>
				<i className="fa-brands fa-microsoft"></i>
				<span>Disciplinas</span>
			</a>

			<a
				href="#settings"
				onClick={(e) => {
					e.preventDefault();
					changeTab("settings");
				}}
				className={getClassName("settings")}
			>
				<i className="fa-solid fa-gear"></i>
				<span>Configuração</span>
			</a>

			<a
				href="#account"
				onClick={(e) => {
					e.preventDefault();
					changeTab("account");
				}}
				className={getClassName("account")}
			>
				<i className="fa-solid fa-user"></i>
				<span>Conta</span>
			</a>
		</nav>
	);
}

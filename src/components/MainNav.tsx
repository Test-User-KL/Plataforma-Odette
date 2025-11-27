import type { TabView } from "../types/tabs";
import { LiquidGlass } from "./LiquidGlass.tsx";

interface MainNavProps {
	changeTab: (targetView: TabView) => void;
}

export default function MainNav({ changeTab }: MainNavProps) {
	return (
		<LiquidGlass>
			<nav className="main-nav">
				<a
					href="#home"
					onClick={(e) => {
						e.preventDefault();
						changeTab("home");
					}}
					className="active"
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
				>
					<i className="fa-solid fa-user"></i>
					<span>Conta</span>
				</a>
			</nav>
		</LiquidGlass>
	);
}

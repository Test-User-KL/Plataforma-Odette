import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./styles/Home.css";
import "./styles/Settings.css";
import TabNavigation from "./components/TabNavigation";
import ColorSelector from "./components/ColorSelector";
import HomePage from "./pages/HomePage";
import SubjectsPage from "./pages/SubjectsPage";
import SettingsPage from "./pages/Settings";
import AccountPage from "./pages/AccountPage";
import type { Tab, TabView } from "./types/tabs";
import type { ColorTarget, ThemeMode } from "./types/theme";

export default function App() {
	const [tabs, setTabs] = useState<Tab[]>([
		{
			id: 1,
			title: "Página Inicial",
			iconClass: "fa-solid fa-home",
			view: "home"
		},
	]);
	const [activeTabId, setActiveTabId] = useState<number>(1);
	const [draggedTabId, setDraggedTabId] = useState<number | null>(null);
	const [theme, setTheme] = useState<ThemeMode>("light");
	const [primaryColor, setPrimaryColor] = useState<string>("blue");
	const [secondaryColor, setSecondaryColor] = useState<string>("yellow");
	const [colorTarget, setColorTarget] = useState<ColorTarget>(null);
	const appRef = useRef<HTMLDivElement>(null);

	const [hasHydratedSettings, setHasHydratedSettings] = useState(false);

	useEffect(() => {
		const savedSettings = localStorage.getItem("settings");
		if (!savedSettings) {
			setHasHydratedSettings(true);
			return;
		}

		try {
			const parsed = JSON.parse(savedSettings) as Partial<{
				theme: ThemeMode;
				primaryColor: string;
				secondaryColor: string;
			}>;

			if (parsed.theme === "light" || parsed.theme === "dark") {
				setTheme(parsed.theme);
			}

			if (typeof parsed.primaryColor === "string") {
				setPrimaryColor(parsed.primaryColor);
			}

			if (typeof parsed.secondaryColor === "string") {
				setSecondaryColor(parsed.secondaryColor);
			}
		} catch (error) {
			console.error("Falha ao carregar configurações salvas", error);
		} finally {
			setHasHydratedSettings(true);
		}
	}, []);

	function applyThemeVariables(selectedTheme: ThemeMode) {
		const root = document.documentElement;
		const grayPrefix = selectedTheme === "light" ? "l" : "d";

		root.style.setProperty("--gray1", `var(--${grayPrefix}gray1)`);
		root.style.setProperty("--gray2", `var(--${grayPrefix}gray2)`);
		root.style.setProperty("--gray3", `var(--${grayPrefix}gray3)`);
		root.style.setProperty("--gray4", `var(--${grayPrefix}gray4)`);
		root.style.setProperty("--gray5", `var(--${grayPrefix}gray5)`);
		root.style.setProperty("--gray6", `var(--${grayPrefix}gray6)`);

		root.style.setProperty("--tgray1", `var(--t${grayPrefix}gray1)`);
		root.style.setProperty("--tgray2", `var(--t${grayPrefix}gray2)`);
		root.style.setProperty("--tgray3", `var(--t${grayPrefix}gray3)`);
		root.style.setProperty("--tgray4", `var(--t${grayPrefix}gray4)`);
		root.style.setProperty("--tgray5", `var(--t${grayPrefix}gray5)`);
		root.style.setProperty("--tgray6", `var(--t${grayPrefix}gray6)`);

		root.style.setProperty("--red", `var(--${grayPrefix}red)`);
		root.style.setProperty("--orange", `var(--${grayPrefix}orange)`);
		root.style.setProperty("--yellow", `var(--${grayPrefix}yellow)`);
		root.style.setProperty("--green", `var(--${grayPrefix}green)`);
		root.style.setProperty("--turquoise", `var(--${grayPrefix}turquoise)`);
		root.style.setProperty("--blue", `var(--${grayPrefix}blue)`);
		root.style.setProperty("--purple", `var(--${grayPrefix}purple)`);
		root.style.setProperty("--pink", `var(--${grayPrefix}pink)`);

		if (selectedTheme === "dark") {
			root.style.setProperty("--default-primary-fc", "rgb(240, 240, 245)");
			root.style.setProperty("--default-secondary-fc", "rgb(170, 170, 170)");
			root.style.setProperty("--example-bg", "var(--dgray1)");
			root.style.setProperty("--setting-option-bg", "var(--dgray2)");
		} else {
			root.style.setProperty("--default-primary-fc", "rgb(0, 0, 5)");
			root.style.setProperty("--default-secondary-fc", "rgb(90, 90, 90)");
			root.style.setProperty("--example-bg", "var(--lgray1)");
			root.style.setProperty("--setting-option-bg", "var(--lgray2)");
		}
	}

	function disableTransitionsTemporarily() {
		document.documentElement.classList.add("no-transition");
	  
		setTimeout(() => {
		  	document.documentElement.classList.remove("no-transition");
		}, 400);
	  }
	  

	function applyColorVariables(colorKey: string, target: "primary" | "secondary") {
		const root = document.documentElement;
		const colorValue = getComputedStyle(root).getPropertyValue(`--${colorKey}`).trim();

		if (!colorValue) return;
		disableTransitionsTemporarily();

		if (target === "primary") {
			root.style.setProperty("--primary-emphasis", colorValue);
			root.style.setProperty("--light-primary-emphasis", colorValue);
		} else {
			root.style.setProperty("--secondary-emphasis", colorValue);
			root.style.setProperty("--light-secondary-emphasis", colorValue);
		}
	}

	function handleThemeChange(selectedTheme: ThemeMode) {
		setTheme(selectedTheme);
		applyThemeVariables(selectedTheme);
	}

	function openColorSelector(target: ColorTarget) {
		setColorTarget(target);
	}

	function closeColorSelector() {
		setColorTarget(null);
	}

	function handleColorPick(colorKey: string) {
			if (!colorTarget) return;

			applyColorVariables(colorKey, colorTarget);

			if (colorTarget === "primary") {
					setPrimaryColor(colorKey);
			} else {
					setSecondaryColor(colorKey);
			}

			closeColorSelector();
	}

	useEffect(() => {
		if (!appRef.current) return;

		const mainElement = appRef.current?.querySelectorAll(".page");
		if (!mainElement) return;

		const elements: HTMLElement[] = [];

		mainElement.forEach((section) => {
			const children = section.querySelectorAll<HTMLElement>("*");

			children.forEach((child) => { 
				if (child.closest("footer")) return;
				elements.push(child);
			});
		});


		elements.forEach((element) => {
			element.classList.remove("animate-fade-in");
			element.style.removeProperty("--fade-order");
		});

		requestAnimationFrame(() => {
			elements.forEach((element, index) => {
				element.style.setProperty("--fade-order", `${index}`);
				element.classList.add("animate-fade-in");
			});
		});
	}, [activeTabId, tabs]);

	useEffect(() => {
		applyThemeVariables(theme);
		applyColorVariables(primaryColor, "primary");
		applyColorVariables(secondaryColor, "secondary");
    }, [theme, primaryColor, secondaryColor]);

	useEffect(() => {
		if (!hasHydratedSettings) return;
			const settings = {
				theme,
				primaryColor,
				secondaryColor,
			};

			try {
				localStorage.setItem("settings", JSON.stringify(settings));
			} catch (error) {
				console.error("Falha ao salvar configurações", error);
			}
	}, [theme, primaryColor, secondaryColor, hasHydratedSettings]);

	function handleNewTab() {
		const newTab: Tab = {
			id: Date.now(),
			title: "Página Inicial",
			iconClass: "fa-solid fa-home",
			view: "home",
		};

		setTabs((prev) => [...prev, newTab]);
		setActiveTabId(newTab.id);
	}

	function changeTab(targetView: TabView) {
		setTabs((prevTabs) =>
			prevTabs.map((tab) => {
				if (tab.id !== activeTabId) return tab;
		
				if (targetView === "home") {
					return {
						...tab,
						view: "home",
						title: "Página Inicial",
						iconClass: "fa-solid fa-home",
					};
				}

				if (targetView === "subjects") {
					return {
						...tab,
						view: "subjects",
						title: "Disciplinas",
						iconClass: "fa-brands fa-microsoft",
					};
				}
		
				if (targetView === "settings") {
					return {
						...tab,
						view: "settings",
						title: "Configurações",
						iconClass: "fa-solid fa-gear",
					};
				}
		
				return {
					...tab,
					view: "account",
					title: "Conta",
					iconClass: "fa-solid fa-user",
				};
			})
		);
	}	  

	function handleCloseTab(id: number) {
		if (tabs.length === 1) return;

		setTabs((prevTabs) => {
		const index = prevTabs.findIndex((t) => t.id === id);
		if (index === -1) return prevTabs;

		const newTabs = [...prevTabs];
		newTabs.splice(index, 1);

		if (activeTabId === id) {
			const newActive =
			newTabs[index - 1]?.id ?? newTabs[index]?.id ?? newTabs[0].id;
			setActiveTabId(newActive);
		}

		return newTabs;
		});
	}

	function handleDragStart(
		e: React.DragEvent<HTMLDivElement>,
		id: number
	) {
		setDraggedTabId(id);
		e.dataTransfer.effectAllowed = "move";
	}

	function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}

	function handleDrop(targetId: number) {
		if (draggedTabId === null || draggedTabId === targetId) return;

		setTabs((prevTabs) => {
		const newTabs = [...prevTabs];
		const fromIndex = newTabs.findIndex((t) => t.id === draggedTabId);
		const toIndex = newTabs.findIndex((t) => t.id === targetId);

		if (fromIndex === -1 || toIndex === -1) return prevTabs;

		const [moved] = newTabs.splice(fromIndex, 1);
		newTabs.splice(toIndex, 0, moved);

		return newTabs;
		});

		setDraggedTabId(null);
	}

	const activeTab = tabs.find((t) => t.id === activeTabId);

	function renderActiveTabContent(tab: Tab) {
		switch (tab.view) {
			case "home":
				return <HomePage />;
			case "subjects":
				return <SubjectsPage changeTab={changeTab} />;
			case "settings":
				return (
					<SettingsPage
							theme={theme}
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
							changeTab={changeTab}
							openColorSelector={openColorSelector}
							handleThemeChange={handleThemeChange}
					/>
				);
			case "account":
				return <AccountPage changeTab={changeTab} />;
			default:
				return null;
		}
	}

	return (
		<div ref={appRef} className="app-root">
			<header className="tab-header">
					<button
						id="new-tab"
						onClick={handleNewTab}
						className="new-tab-button special"
						title="Nova aba"
					>
						<i className="fa-solid fa-plus"></i>
					</button>

					<TabNavigation
						tabs={tabs}
						activeTabId={activeTabId}
						onSelect={setActiveTabId}
						onClose={handleCloseTab}
						onDragStart={handleDragStart}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
					/>
			</header>

			<main className="tab-content">
				{activeTab && renderActiveTabContent(activeTab)}
				<ColorSelector
					colorTarget={colorTarget}
					primaryColor={primaryColor}
					secondaryColor={secondaryColor}
					onPick={handleColorPick}
					onClose={closeColorSelector}
				/>
			</main>

			<nav className="main-nav">
					<a
						href="#home"
						onClick={(e) => {
							e.preventDefault();
							changeTab("home");
						}}
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
		</div>
	);
}

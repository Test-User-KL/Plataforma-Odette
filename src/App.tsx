import React, { useEffect, useRef, useState } from "react";
import "./App.css";

type Tab = {
	id: number;
	title: string;
	iconClass: string;
};

export default function App() {
	const [tabs, setTabs] = useState<Tab[]>([
		{ id: 1, title: "Página Inicial", iconClass: "fa-solid fa-house" },
	]);
	const [activeTabId, setActiveTabId] = useState<number>(1);
	const [draggedTabId, setDraggedTabId] = useState<number | null>(null);
	const appRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!appRef.current) return;

		const mainElement = appRef.current?.querySelectorAll("main section");
		if (!mainElement) return;

		const elements: HTMLElement[] = [];

		mainElement.forEach((section) => {
			const children = section.querySelectorAll<HTMLElement>("*");
			children.forEach((child) => elements.push(child));
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

	function handleNewTab() {
		const newTab: Tab = {
			id: Date.now(),
			title: "Página Inicial",
			iconClass: "fa-solid fa-house"
		};

		setTabs((prev) => [...prev, newTab]);
		setActiveTabId(newTab.id);
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

	function renderActiveTabContent() {
		return (
			<React.Fragment key={activeTabId}>
				<div id="home" className="home-page">
					<footer className="home-nav">
						<nav>
							<a href="#my-week">
								<i className="fa-regular fa-clock"></i>
								<span>Aulas</span>
							</a>
							<a href="#my-tasks">
								<i className="fa-solid fa-clipboard-list"></i>
								<span>Tarefas</span>
							</a>
							<a href="#my-subjects">
								<i className="fa-solid fa-graduation-cap"></i>
								<span>Disciplinas</span>
							</a>

							<span className="separator"></span>

							<a href="#settings">
								<i className="fa-solid fa-gear"></i>
								<span>Configuração</span>
							</a>
							<a href="#account">
								<i className="fa-solid fa-user"></i>
								<span>Conta</span>
							</a>
						</nav>
					</footer>

					<section id="my-week" className="my-week">
						<div className="summary">
							<h1>Aulas de Hoje</h1>
							<button className="special show-schedule">Horário das Aulas</button>
							<div className="current-previous-next-class">
								<div className="current-class">
									<div className="texts">
										<p>Atual - Disciplina:</p>
										<h2>Tema da Aula</h2>
									</div>
									<div  className="files">
										<h6>Arquivos</h6>
										<div className="files-list">
											<button>
											<i className="fa-regular fa-file"></i>
												Arquivo 1
											</button>
											<button>
												<i className="fa-regular fa-file"></i>
												Arquivo 2
											</button>
											<button>
												<i className="fa-regular fa-file"></i>
												Arquivo 3
											</button>
										</div>
									</div>
									<div className="shortcuts">
										<h6>Atalhos</h6>
										<div className="shortcuts-list">
											<button>
												<i className="fa-solid fa-graduation-cap"></i>
												Disciplina
											</button>
											<button>
												<i className="fa-solid fa-clipboard-list"></i>
												Tarefas
											</button>
											<button>
												<i className="fa-solid fa-book"></i>
												Caderno
											</button>
										</div>
									</div>
								</div>
								<div className="previous-class">
										<p>Anterior:</p>
										<h5>Disciplina</h5>
								</div>
								<div className="next-class">
										<p>Próxima:</p>
										<h5>Disciplina</h5>
								</div>
							</div>
						</div>	

						<hr/>

						<h2>Todas as Aulas</h2>
					</section>
		
					<section id="my-tasks" className="my-tasks">
						<h1>Suas Tarefas</h1>
					</section>

					<section id="my-subjects">
						<h1>Suas Disciplinas</h1>
					</section>
				</div>

				<div id="settings" className="settings-page">
					<h1>
						<i className="fa-solid fa-gear"></i>
						<span>Configuração</span>
					</h1>
					<p>Personalize suas preferências, notificações e tema.</p>
				</div>

				<div id="account" className="account-page">
					<h1>
						<i className="fa-solid fa-user"></i>
						<span>Conta</span>
					</h1>
					<p>Gerencie seus dados pessoais e opções de segurança.</p>
				</div>
			</React.Fragment>
		);
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

				<nav className="tab-nav">
					{tabs.map((tab, index) => {
						const isActive = tab.id === activeTabId;
						const nextTabIsActive = tabs[index + 1]?.id === activeTabId;
						const isLast = index === tabs.length - 1;

						const shouldShowSeparator =
						!isActive && !nextTabIsActive && !isLast;

						return (
							<React.Fragment key={tab.id}>
								<div
									className={
										"tab-button" + (isActive ? " active-tab" : "")
									}
									onClick={() => setActiveTabId(tab.id)}
									draggable
									onDragStart={(e) => handleDragStart(e, tab.id)}
									onDragOver={handleDragOver}
									onDrop={() => handleDrop(tab.id)}
								>
									<span className="tab-title">{tab.title}</span>
									<span
										className="close-tab"
										title="Fechar aba"
										onClick={(e) => {
										e.stopPropagation();
										handleCloseTab(tab.id);
										}}
									>
										<i className="fa fa-times"></i>
									</span>
								</div>

								<div
									className="tab-separator"
									style={{ opacity: shouldShowSeparator ? 1 : 0 }}
								></div>
							</React.Fragment>
						);
					})}
				</nav>
			</header>

			<main className="tab-content">
				{activeTab && renderActiveTabContent()}
			</main>
		</div>
	);
}

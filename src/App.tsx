import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";

export function Animations() {
	useEffect(() => {
		const animatedElements = document.querySelectorAll(
				".scroll-fade-up"
		);

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
					}
				});
			},
			{ threshold: 0.1 }
		);

		let delay = 0;
		animatedElements.forEach(el => {
				(el as HTMLElement).style.transitionDelay = `${delay}s`;
				delay += 0.1;
				observer.observe(el);
				});
}, []);

	return null;
}


type Tab = {
	id: number;
	title: string;
};

export default function App() {
	const [tabs, setTabs] = useState<Tab[]>([
		{ id: 1, title: "Nova Aba" },
	]);
	const [activeTabId, setActiveTabId] = useState<number>(1);
	const [draggedTabId, setDraggedTabId] = useState<number | null>(null);

	function handleNewTab() {
		const newTab: Tab = {
		id: Date.now(),
		title: "Nova Aba",
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
		<div className="new-tab-page">
			<section className="my-week">
				<h1>Sua Semana</h1>
				<div className="current-previous-next-class">
					<div className="current-class scroll-fade-up">
						<p>Aula em Andamento - Disciplina:</p>
						<h2>Tema da Aula</h2>
						<div className="files">
							<div className="file">
								<i className={'fa-regular fa-file'}></i>
								<p>Arquivo</p>
							</div>
							Esta aula não possui anexos.
						</div>
					</div>
					<div className="previous-class">
						<p>Aula Anterior:</p>
						<h5>Disciplina</h5>
					</div>
					<div className="next-class">
						<p>Próxima Aula:</p>
						<h5>Disciplina</h5>
					</div>
				</div>

				<hr />

				<h2>Todas as Aulas</h2>
			</section>

			<section className="tasks scroll-fade-up">
				<h1>Suas Tarefas</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam voluptas voluptatum dicta quae sapiente mollitia totam esse debitis modi cupiditate labore autem veniam, reprehenderit ex cum perferendis et. Iusto fugit corrupti architecto consequatur sapiente autem numquam explicabo adipisci molestias neque quasi mollitia unde, velit laborum culpa officiis quo necessitatibus doloribus nam commodi magnam. Rerum qui, consequatur perferendis, iusto omnis quo, id sit excepturi assumenda voluptatem libero facilis! Ea impedit quod aliquam ducimus in, commodi ipsam libero inventore nisi veritatis ut dicta alias, laudantium accusamus assumenda, consequatur facere tempora neque eius mollitia laborum officiis perferendis architecto magni. Corporis aliquid quis rem.</p>
			</section>
		</div>
		);
	}

	return (
		<>
			<header className="tab-header">
				<button
					id="new-tab"
					onClick={handleNewTab}
					className="new-tab-button"
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
		</>
	);
}

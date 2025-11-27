import React from "react";

export default function HomePage() {
    return (
        <div id="home" className="home-page page">
            <section id="my-week" className="my-week">
                <div className="summary">
                    <h1>Aulas de Hoje</h1>
                    <button className="special show-schedule">Horário das Aulas</button>
                    <div className="current-previous-next-class">
                        <div className="current-class">
                            <div className="texts">
                                <p>Atual (Disciplina - Professor):</p>
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
    );
}

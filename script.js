/* ==========================================
   ADS HUB
   Sistema de matérias e favoritos
========================================== */


/* ==========================================
   ELEMENTOS
========================================== */

const busca =
    document.getElementById("busca");

const materias =
    document.querySelectorAll(".materia");

const semResultado =
    document.getElementById("semResultado");

const porcentagem =
    document.getElementById("porcentagem");

const barraProgresso =
    document.getElementById("barraProgresso");

const favoritosTexto =
    document.getElementById("favoritos");

const textoProgresso =
    document.getElementById("textoProgresso");


/* ==========================================
   FAVORITOS
========================================== */

let favoritos =
    JSON.parse(
        localStorage.getItem(
            "adsHubFavoritos"
        )
    ) || [];


/* ==========================================
   ATIVAR FAVORITOS SALVOS
========================================== */

function carregarFavoritos() {

    const botoes =
        document.querySelectorAll(
            ".favorito"
        );


    botoes.forEach(
        function(botao, index) {

            if (
                favoritos.includes(index)
            ) {

                botao.classList.add(
                    "ativo"
                );

                botao.innerHTML =
                    "★ Favoritado";

            }

        }
    );


    atualizarProgresso();

}


/* ==========================================
   FAVORITAR
========================================== */

function favoritar(botao) {

    const todos =
        Array.from(
            document.querySelectorAll(
                ".favorito"
            )
        );


    const index =
        todos.indexOf(botao);


    if (
        favoritos.includes(index)
    ) {

        favoritos =
            favoritos.filter(
                function(item) {

                    return item !== index;

                }
            );


        botao.classList.remove(
            "ativo"
        );


        botao.innerHTML =
            "☆ Favoritar";

    } else {

        favoritos.push(index);


        botao.classList.add(
            "ativo"
        );


        botao.innerHTML =
            "★ Favoritado";

    }


    localStorage.setItem(
        "adsHubFavoritos",
        JSON.stringify(favoritos)
    );


    atualizarProgresso();

}


/* ==========================================
   PROGRESSO
========================================== */

function atualizarProgresso() {

    const total =
        materias.length;


    const quantidade =
        favoritos.length;


    const porcentagemAtual =
        Math.round(
            (quantidade / total) * 100
        );


    porcentagem.textContent =
        porcentagemAtual + "%";


    barraProgresso.style.width =
        porcentagemAtual + "%";


    favoritosTexto.textContent =
        quantidade;


    if (quantidade === 0) {

        textoProgresso.textContent =
            "Comece favoritando algumas matérias.";

    }

    else if (
        quantidade < 3
    ) {

        textoProgresso.textContent =
            "Você está começando sua jornada. Continue assim! 🚀";

    }

    else if (
        quantidade < 6
    ) {

        textoProgresso.textContent =
            "Muito bem! Você já está construindo sua base. 💻";

    }

    else if (
        quantidade < total
    ) {

        textoProgresso.textContent =
            "Excelente! Falta pouco para completar sua jornada. 🔥";

    }

    else {

        textoProgresso.textContent =
            "Você marcou todas as matérias. Agora é colocar o conhecimento em prática! 🚀";

    }

}


/* ==========================================
   BUSCA
========================================== */

busca.addEventListener(
    "input",
    function() {

        const texto =
            busca.value
                .toLowerCase()
                .trim();


        let encontrados = 0;


        materias.forEach(
            function(materia) {

                const nome =
                    materia.dataset.nome
                        .toLowerCase();


                const titulo =
                    materia
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();


                if (
                    nome.includes(texto)
                    ||
                    titulo.includes(texto)
                ) {

                    materia.style.display =
                        "flex";

                    encontrados++;

                } else {

                    materia.style.display =
                        "none";

                }

            }
        );


        if (
            encontrados === 0
            &&
            texto !== ""
        ) {

            semResultado.style.display =
                "block";

        } else {

            semResultado.style.display =
                "none";

        }

    }
);


/* ==========================================
   MENU MOBILE
========================================== */

function abrirMenu() {

    const nav =
        document.querySelector(
            ".topo nav"
        );


    if (
        nav.style.display === "flex"
    ) {

        nav.style.display =
            "none";

    } else {

        nav.style.display =
            "flex";

        nav.style.position =
            "absolute";

        nav.style.top =
            "78px";

        nav.style.left =
            "0";

        nav.style.right =
            "0";

        nav.style.background =
            "#0f172a";

        nav.style.padding =
            "20px 5%";

        nav.style.flexDirection =
            "column";

        nav.style.gap =
            "18px";

    }

}


/* ==========================================
   INICIAR
========================================== */

carregarFavoritos();